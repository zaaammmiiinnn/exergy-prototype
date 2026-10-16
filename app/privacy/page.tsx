import React from "react";
import Link from "next/link";
import { siteSettingsSeed } from "@/content/seed/settings";

export const metadata = {
  title: "Privacy Policy | Exergy Solutions",
  description: "UAE PDPL-compliant privacy disclosures detailing data collection, processors, and protection rights.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 text-slate-800 py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
            Legal Compliance (UAE Federal Decree-Law No. 45/2021)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Last Updated: October 2026 | Effective for Exergy Solutions (Dubai, UAE)
          </p>
        </div>

        <div className="prose max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Scope and Data Controller</h2>
            <p>
              Exergy Solutions (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), located at {siteSettingsSeed.address}, operates this website and is the data controller for personal data processed under this policy in compliance with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021 on Personal Data Protection).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Data We Collect</h2>
            <p>We process only data required to perform industrial engineering consulting and lead assessments:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Contact Information:</strong> Name, professional work email, telephone number, job title, and company affiliation.</li>
              <li><strong>Facility Specifications:</strong> Industry sector, geographic location, operational challenges, and utility streams selected for assessment.</li>
              <li><strong>Technical Logs:</strong> Anonymized or salted hashed IP addresses, browser user agent, and timestamp metadata for spam prevention and rate-limiting.</li>
              <li><strong>Conversational Sessions:</strong> Ephemeral session tokens stored in browser local storage to maintain chatbot or form state.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Third-Party Data Processors</h2>
            <p>All processing partners are bound by confidentiality and robust data protection standards:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Supabase:</strong> Encrypted database and authentication backend services.</li>
              <li><strong>Resend:</strong> Secure transactional email delivery for lead notifications and auto-replies.</li>
              <li><strong>Cloudflare:</strong> Global DNS, Web Application Firewall (WAF), edge runtime worker execution, and Turnstile bot protection.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Data Retention and Rights</h2>
            <p>
              Lead and assessment data is retained for the duration of the commercial relationship or until deletion is formally requested. In accordance with UAE PDPL, you have the right to access, rectify, or request the deletion of your personal data at any time.
            </p>
            <p>
              To exercise these rights, contact our Data Protection Administrator at{" "}
              <a href="mailto:neuralwaves.official@gmail.com" className="text-teal-700 underline font-medium">
                neuralwaves.official@gmail.com
              </a>{" "}
              or{" "}
              <a href={`mailto:${siteSettingsSeed.email}`} className="text-teal-700 underline font-medium">
                {siteSettingsSeed.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
