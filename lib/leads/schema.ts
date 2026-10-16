import { z } from "zod";

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
