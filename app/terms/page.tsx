import React from "react";
import { siteSettingsSeed } from "@/content/seed/settings";

export const metadata = {
  title: "Terms of Service | Exergy Solutions",
  description: "Terms and conditions governing the use of the Exergy Solutions website and assessment platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 text-slate-800 py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
            Commercial & Legal Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Jurisdiction: Dubai International Financial Centre (DIFC) / Dubai Courts, UAE
          </p>
        </div>

        <div className="prose max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Nature of Information & Assessment Requests</h2>
            <p>
              The content provided on this website is for informational and diagnostic preliminary planning purposes only. Formal thermodynamic guarantees and turnkey implementation commitments are governed exclusively by executed bilateral engineering contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Intellectual Property</h2>
            <p>
              All thermodynamic diagrams, proprietary second-law diagnostic methodologies, trademarks, text blocks, and branding remain the exclusive intellectual property of Exergy Solutions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Emirate of Dubai and the applicable federal laws of the United Arab Emirates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Contact & Inquiries</h2>
            <p>
              For legal inquiries regarding these terms, reach our corporate administration at{" "}
              <a href="mailto:neuralwaves.official@gmail.com" className="text-teal-700 underline font-medium">
                neuralwaves.official@gmail.com
              </a>{" "}
              or {siteSettingsSeed.address}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
