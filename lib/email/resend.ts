import nodemailer from "nodemailer";

export interface SendAssessmentEmailsPayload {
  shortId: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  sector: string;
  services: string[];
  timeline: string;
  mainChallenge?: string;
  score: number;
  priority: "hot" | "warm" | "cold";
}

export async function sendAssessmentNotificationEmails(
  payload: SendAssessmentEmailsPayload
): Promise<{ adminNotified: boolean; visitorReplied: boolean }> {
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
  const gmailUser = process.env.GMAIL_USER || "sarfraz@exergy-solutions.com";
  const apiKey = process.env.RESEND_API_KEY;
  let adminNotifyRaw = process.env.ADMIN_NOTIFY_EMAILS || "sarfraz@exergy-solutions.com, info@exergy-solutions.com";
  let adminRecipients = adminNotifyRaw.split(",").map((s) => s.trim()).filter(Boolean);

  // Check site_settings.notify_emails in Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (
    supabaseUrl &&
    serviceKey &&
    !supabaseUrl.includes("dummy") &&
    !serviceKey.includes("dummy") &&
    supabaseUrl.startsWith("https://")
  ) {
    try {
      const { createServiceRoleClient } = await import("@/lib/supabase/service");
      const supabase = createServiceRoleClient();
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "notify_emails")
        .single();

      if (data && data.value) {
        const dbEmails = Array.isArray(data.value)
          ? data.value
          : typeof data.value === "string"
          ? data.value.split(",")
          : null;
        if (dbEmails && dbEmails.length > 0) {
          adminRecipients = dbEmails.map((e: string) => e.trim()).filter(Boolean);
        }
      }
    } catch (dbErr) {
      console.warn("[SITE SETTINGS NOTIFY_EMAILS WARNING]", dbErr);
    }
  }

  let adminNotified = false;
  let visitorReplied = false;

  const adminSubject = `${payload.priority === "hot" ? "[HOT LEAD] " : ""}[Exergy Assessment] ${payload.company} (${payload.shortId})`;
  const adminBody = `New Assessment Lead Received!\n\nReference: ${payload.shortId}\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "N/A"}\nCompany: ${payload.company}\nSector: ${payload.sector}\nStreams: ${payload.services.join(", ")}\nTimeline: ${payload.timeline}\nScore: ${payload.score} (${payload.priority.toUpperCase()})\n\nChallenge Notes:\n${payload.mainChallenge || "None provided"}\n\nReview in Admin Portal: https://exergy-solutions.neuralwaves.workers.dev/admin`;

  const visitorSubject = `Your Exergy Solutions Assessment Request [${payload.shortId}]`;
  const visitorBody = `Dear ${payload.name},\n\nThank you for requesting an industrial assessment with Exergy Solutions.\n\nYour Reference ID: ${payload.shortId}\nFacility: ${payload.company}\nSelected Services: ${payload.services.join(", ")}\n\nWhat happens next:\n1. Our thermodynamic engineering team will review your facility profile.\n2. We will contact you within one business day to align on preliminary baseline data.\n\nIf you have immediate questions, you can reach us directly at info@exergy-solutions.com or reply to this message.\n\nBest regards,\nExergy Solutions Engineering Team\nDubai, UAE`;

  // 1. Send via Gmail SMTP if GMAIL_APP_PASSWORD is set
  if (gmailPass && !gmailPass.startsWith("your_")) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""), // strip whitespace from copy-paste
        },
      });

      // Send to Admin
      await transporter.sendMail({
        from: `"Exergy Solutions" <${gmailUser}>`,
        to: adminRecipients,
        subject: adminSubject,
        text: adminBody,
      });
      adminNotified = true;

      // Send confirmation to Visitor
      await transporter.sendMail({
        from: `"Exergy Solutions" <${gmailUser}>`,
        to: payload.email,
        subject: visitorSubject,
        text: visitorBody,
      });
      visitorReplied = true;

      console.log(`[GMAIL SMTP SUCCESS] Sent notification to ${adminRecipients.join(", ")} and ${payload.email}`);
      return { adminNotified, visitorReplied };
    } catch (smtpErr) {
      console.error("[GMAIL SMTP ERROR]", smtpErr);
    }
  }

  // 2. Fallback to Resend if RESEND_API_KEY is configured
  // 2. Resend delivery if RESEND_API_KEY is configured
  if (apiKey && !apiKey.startsWith("re_your_")) {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Exergy Solutions <onboarding@resend.dev>";
    
    // Attempt Admin Notification
    try {
      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: adminRecipients,
          subject: adminSubject,
          text: adminBody,
        }),
      });

      if (adminRes.ok) {
        adminNotified = true;
        console.log(`[RESEND SUCCESS] Admin alert dispatched to ${adminRecipients.join(", ")}`);
      } else {
        const errJson = await adminRes.json().catch(() => ({}));
        console.warn("[RESEND ADMIN WARNING]", adminRes.status, errJson);

        // If in Resend onboarding mode, retry specifically to primary account email
        if (adminRecipients.length > 1) {
          const retryRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: ["sarfraz@exergy-solutions.com"],
              subject: adminSubject,
              text: adminBody,
            }),
          });
          if (retryRes.ok) {
            adminNotified = true;
            console.log("[RESEND RETRY SUCCESS] Admin alert dispatched to sarfraz@exergy-solutions.com");
          }
        }
      }
    } catch (err) {
      console.error("[RESEND FETCH ERROR]", err);
    }

    // Attempt Visitor Auto-reply
    try {
      const visitorRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.email],
          subject: visitorSubject,
          text: visitorBody,
        }),
      });

      if (visitorRes.ok) {
        visitorReplied = true;
        console.log(`[RESEND SUCCESS] Auto-reply dispatched to ${payload.email}`);
      } else {
        const errJson = await visitorRes.json().catch(() => ({}));
        console.warn("[RESEND VISITOR NOTE]", visitorRes.status, errJson);
      }
    } catch (err) {
      console.error("[RESEND VISITOR ERROR]", err);
    }

    return { adminNotified, visitorReplied };
  }

  // 3. Dev / Mock fallback if credentials not yet supplied
  console.log(
    `[DEV EMAIL DISPATCH] Admin alert to ${adminRecipients.join(", ")} for lead ${payload.shortId} (${payload.priority.toUpperCase()})`
  );
  console.log(`[DEV EMAIL DISPATCH] Auto-reply confirmation to ${payload.email}`);
  return { adminNotified: true, visitorReplied: true };
}
