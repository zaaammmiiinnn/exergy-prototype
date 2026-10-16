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
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "contact@exergy-solutions.com";
  const adminNotify = process.env.ADMIN_NOTIFY_EMAILS || "neuralwaves.official@gmail.com";

  let adminNotified = false;
  let visitorReplied = false;

  // Fallback / dev mock if Resend API key is not configured locally
  if (!apiKey || apiKey.startsWith("re_your_")) {
    console.log(
      `[DEV EMAIL DISPATCH] Admin alert to ${adminNotify} for lead ${payload.shortId} (${payload.priority.toUpperCase()})`
    );
    console.log(`[DEV EMAIL DISPATCH] Auto-reply confirmation to ${payload.email}`);
    return { adminNotified: true, visitorReplied: true };
  }

  const results = await Promise.allSettled([
    // 1. Admin Alert
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminNotify],
        subject: `${payload.priority === "hot" ? "[HOT LEAD] " : ""}[Exergy Assessment] ${payload.company} (${payload.shortId})`,
        text: `New Assessment Lead Received!\n\nReference: ${payload.shortId}\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "N/A"}\nCompany: ${payload.company}\nSector: ${payload.sector}\nStreams: ${payload.services.join(", ")}\nTimeline: ${payload.timeline}\nScore: ${payload.score} (${payload.priority.toUpperCase()})\n\nChallenge Notes:\n${payload.mainChallenge || "None provided"}\n\nReview in Admin Portal: https://exergy-solutions.com/admin`,
      }),
    }),

    // 2. Visitor Auto-reply
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [payload.email],
        subject: `Your Exergy Solutions Assessment Request [${payload.shortId}]`,
        text: `Dear ${payload.name},\n\nThank you for requesting an industrial assessment with Exergy Solutions.\n\nYour Reference ID: ${payload.shortId}\nFacility: ${payload.company}\nSelected Services: ${payload.services.join(", ")}\n\nWhat happens next:\n1. Our thermodynamic engineering team will review your facility profile.\n2. We will contact you within one business day to align on preliminary baseline data.\n\nIf you have immediate questions, you can reach us directly at sarfraz@exergy-solutions.com or reply to this message.\n\nBest regards,\nExergy Solutions Engineering Team\nDubai, UAE`,
      }),
    }),
  ]);

  if (results[0].status === "fulfilled" && results[0].value.ok) {
    adminNotified = true;
  }
  if (results[1].status === "fulfilled" && results[1].value.ok) {
    visitorReplied = true;
  }

  return { adminNotified, visitorReplied };
}
