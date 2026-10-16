"use server";

import { z } from "zod";
import { calculateLeadScore } from "@/lib/leads/scoring";
import { sendAssessmentNotificationEmails } from "@/lib/email/resend";
import { createServiceRoleClient } from "@/lib/supabase/service";

export const assessmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid work email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().optional(),
  sector: z.string().min(2, "Sector is required"),
  country: z.string().default("United Arab Emirates"),
  facilityType: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  mainChallenge: z.string().optional(),
  timeline: z.string().default("this_quarter"),
  consent: z.boolean().refine((val) => val === true, "Privacy consent is required"),
  turnstileToken: z.string().optional(),
});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;

export async function submitAssessment(values: AssessmentFormValues) {
  // 1. Validate with Zod
  const validated = assessmentSchema.safeParse(values);
  if (!validated.success) {
    return {
      success: false,
      error: "Validation failed. Please verify all required fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // 2. Compute Score & Priority
  const { score, priority, breakdown } = calculateLeadScore({
    email: data.email,
    phone: data.phone,
    sector: data.sector,
    services: data.services,
    timeline: data.timeline,
    mainChallenge: data.mainChallenge,
    source: "assessment",
  });

  // 3. Generate short tracking ID (EX-YYYY-NNNN)
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const shortId = `EX-${currentYear}-${randomSuffix}`;

  // 4. Send Emails via Resend (Promise.allSettled: never blocks lead storage)
  const emailResult = await sendAssessmentNotificationEmails({
    shortId,
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    sector: data.sector,
    services: data.services,
    timeline: data.timeline,
    mainChallenge: data.mainChallenge,
    score,
    priority,
  });

  // 5. Insert into Supabase leads table via Service Role
  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("leads").insert({
      short_id: shortId,
      source: "assessment",
      status: "new",
      full_name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company,
      job_title: data.jobTitle || null,
      country: data.country,
      sector: data.sector,
      service_interest: data.services,
      facility_type: data.facilityType || null,
      main_challenge: data.mainChallenge || null,
      timeline: data.timeline,
      score,
      priority,
      consent_at: new Date().toISOString(),
      email_status: {
        admin_notified: emailResult.adminNotified,
        visitor_replied: emailResult.visitorReplied,
      },
    });

    if (error) {
      console.warn("[SUPABASE INSERT WARNING]", error.message);
    }
  } catch (err) {
    console.warn("[SUPABASE CLIENT SKIPPED IN DEV]", err);
  }

  return {
    success: true,
    shortId,
    score,
    priority,
    notified: "neuralwaves.official@gmail.com",
  };
}
