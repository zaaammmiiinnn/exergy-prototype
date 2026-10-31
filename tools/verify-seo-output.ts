import robots from "../app/robots";
import sitemap from "../app/sitemap";

async function verify() {
  console.log("=== VERIFYING ROBOTS.TXT ===");
  const robotRules = robots();
  console.log(JSON.stringify(robotRules, null, 2));

  console.log("\n=== VERIFYING SITEMAP.XML ===");
  const siteMapEntries = await sitemap();
  console.log(`Total URLs in Sitemap: ${siteMapEntries.length}`);
  siteMapEntries.forEach((entry, idx) => {
    console.log(`${idx + 1}. [${entry.priority}] ${entry.url} (frequency: ${entry.changeFrequency})`);
  });

  // Verify that no private routes are in the sitemap
  const forbidden = ["admin", "portal", "account", "track", "assessment/thank-you", "api"];
  const violations = siteMapEntries.filter((entry) =>
    forbidden.some((f) => entry.url.includes(`/${f}`))
  );

  if (violations.length > 0) {
    console.error("VIOLATION: Private URLs found in sitemap!", violations);
    process.exit(1);
  } else {
    console.log("\nSUCCESS: All sitemap URLs are public and canonical!");
  }
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
