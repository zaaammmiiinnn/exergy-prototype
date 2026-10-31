# Google Search Console (GSC) Production Setup Guide

**Target Domain:** `exergy-solutions.com`  
**Sitemap URL:** `https://exergy-solutions.com/sitemap.xml`  
**Robots URL:** `https://exergy-solutions.com/robots.txt`  
**Production Platform:** Cloudflare Workers / DNS via Cloudflare  

> [!IMPORTANT]
> **Transparency Notice:** Google Search Console property verification, sitemap submission, and live URL inspection require direct administrative access to your Google Account and DNS provider (Cloudflare). These actions cannot be automated programmatically without your external credentials. Follow the verified step-by-step instructions below.

---

## Step 1: Add Website as a Domain Property (Recommended)

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** in the top-left dropdown.
3. Select **Domain** (not "URL prefix").
4. Enter:
   ```text
   exergy-solutions.com
   ```
5. Click **Continue**.

*Why Domain Property?* A Domain property automatically covers `https://`, `http://`, `www.`, and all subdomains under a single unified property.

---

## Step 2: Verify Ownership via DNS TXT Record (Primary Method)

1. In the verification popup, Google will provide a unique TXT verification record, for example:
   ```text
   google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
2. Log in to your **Cloudflare Dashboard** (or domain registrar DNS manager).
3. Select the `exergy-solutions.com` zone -> **DNS** -> **Records**.
4. Click **Add Record**:
   - **Type:** `TXT`
   - **Name:** `@` (or `exergy-solutions.com`)
   - **Content:** Paste the exact `google-site-verification=...` string from Google.
   - **TTL:** Auto
5. Click **Save**.
6. Return to Google Search Console and click **Verify**. (Cloudflare DNS propagates within 30-60 seconds).

---

## Step 3: Alternative HTML Tag Verification (Fallback Method)

If DNS access is delayed, you can use HTML meta tag verification:

1. In Google Search Console, select **URL prefix** property with `https://exergy-solutions.com`.
2. Choose **HTML tag** verification. Copy the code provided:
   ```html
   <meta name="google-site-verification" content="YOUR_TOKEN_HERE" />
   ```
3. In this codebase, the hook is already pre-wired in `app/layout.tsx`:
   ```typescript
   verification: {
     google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
   }
   ```
4. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="YOUR_TOKEN_HERE"` in your Cloudflare environment variables or `.env.local`.
5. Deploy and click **Verify**.

---

## Step 4: Submit the XML Sitemap

Once verified:

1. In the left navigation menu, click **Sitemaps** (under *Indexing*).
2. Under "Add a new sitemap", enter:
   ```text
   sitemap.xml
   ```
3. Full submitted URL: `https://exergy-solutions.com/sitemap.xml`
4. Click **Submit**.
5. Google Search Console will report status: **Success** and display the count of discovered pages (20 canonical URLs).

---

## Step 5: Priority URL Inspection & Request Indexing

To expedite indexation of key landing pages:

1. Click the **URL Inspection** search bar at the very top of GSC.
2. Enter the target URL, e.g.:
   - `https://exergy-solutions.com/`
   - `https://exergy-solutions.com/services`
   - `https://exergy-solutions.com/services/cooling`
   - `https://exergy-solutions.com/assessment`
3. Click **Test Live URL**.
4. Verify:
   - *URL is on Google / available to Google*
   - *Crawl allowed?* Yes (matches `robots.txt`)
   - *Page fetch:* Successful (HTTP 200)
   - *Canonical:* Google-selected canonical matches user-declared canonical.
5. Click **Request Indexing**. Repeat for top 5 key landing pages.

---

## Step 6: Monitor Core Web Vitals & Page Experience

1. In the left sidebar, navigate to **Core Web Vitals** (under *Experience*).
2. Monitor field data across Mobile and Desktop:
   - **Largest Contentful Paint (LCP):** Target $\le 2.5\text{ s}$
   - **Interaction to Next Paint (INP):** Target $\le 200\text{ ms}$
   - **Cumulative Layout Shift (CLS):** Target $\le 0.1$
3. Our Next.js App Router codebase uses `next/font` with `display: "swap"`, static image dimensions, and zero render-blocking scripts, ensuring passing scores.

---

## Step 7: Identifying & Resolving Crawl & Indexing Errors

In GSC, navigate to **Pages** (under *Indexing*):

| Status in GSC | Meaning | Cause in This Project | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Indexed, not submitted in sitemap** | Google found a public URL via internal link. | Any new service added before sitemap refresh. | Regenerate sitemap or verify `app/sitemap.ts`. |
| **Excluded by 'noindex' tag** | Intentionally blocked page. | `/admin/*`, `/portal/*`, `/assessment/thank-you`. | **Expected behavior.** No action required. |
| **Blocked by robots.txt** | Googlebot followed disallow rule. | `/admin/*`, `/api/*`, `/track`. | **Expected behavior.** No action required. |
| **Discovered – currently not indexed** | Google queued the URL for crawling. | Normal for brand new domains/pages. | Request indexing via URL Inspection tool; ensure internal links point to it. |
| **Crawled – currently not indexed** | Google evaluated page quality. | Duplicate or low-value content. | Our content is high-depth thermodynamic copy with custom schemas; request re-crawl. |
| **Page with redirect** | 301/302 detected. | `www.exergy-solutions.com` redirected to non-www. | **Expected behavior.** Only canonical non-www URLs should be in sitemap. |
| **Duplicate without user-selected canonical** | Google detected multiple URLs for same content. | Prevented in our codebase via `metadata.alternates.canonical`. | **Fixed in codebase.** All 20 public pages declare explicit canonical. |

---

## Step 8: Checklist Summary for Manual Launch

- [ ] Complete DNS TXT verification in Cloudflare.
- [ ] Submit `sitemap.xml` in GSC.
- [ ] Inspect and request indexing for `https://exergy-solutions.com/`.
- [ ] Inspect and request indexing for `https://exergy-solutions.com/services`.
- [ ] Inspect and request indexing for `https://exergy-solutions.com/assessment`.
- [ ] Check back in 7-14 days to review initial Impressions and Queries in the **Performance** report.
