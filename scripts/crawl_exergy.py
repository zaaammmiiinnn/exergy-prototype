"""
Crawl the live Exergy Solutions site (a client-rendered React app) and dump
every page's copy, headings, CTAs and image references to JSON + screenshots.

Setup:
    pip install playwright
    playwright install chromium
Run:
    python scripts/crawl_exergy.py
Output:
    content/crawl/exergy_crawl.json
    content/crawl/shot_<route>.png
"""
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

BASE = "https://exergy-solutions.com"
OUT = Path("content/crawl")
OUT.mkdir(parents=True, exist_ok=True)

EXTRACT_JS = """() => ({
  title: document.title,
  meta: document.querySelector('meta[name=description]')?.content || null,
  headings: [...document.querySelectorAll('h1,h2,h3,h4')]
      .map(h => [h.tagName, h.innerText.trim()]).filter(x => x[1]),
  text_blocks: [...document.querySelectorAll('p,li,blockquote')]
      .map(e => e.innerText.trim()).filter(Boolean),
  ctas: [...document.querySelectorAll('a,button')]
      .map(e => [e.innerText.trim(), e.getAttribute('href')]).filter(x => x[0]),
  images: [...document.querySelectorAll('img')]
      .map(i => [i.currentSrc || i.src, i.alt || '']),
  bg_images: [...document.querySelectorAll('*')]
      .map(e => getComputedStyle(e).backgroundImage).filter(x => x.startsWith('url')),
  links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
  nav_labels: [...document.querySelectorAll('nav a')].map(a => a.innerText.trim())
})"""


def slug(path: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", path.lower()).strip("_") or "home"


def main() -> None:
    seen: set[str] = set()
    queue: list[str] = ["/"]
    pages: list[dict] = []
    host = urlparse(BASE).netloc

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        while queue:
            path = queue.pop(0)
            if path in seen:
                continue
            seen.add(path)

            page.goto(urljoin(BASE, path), wait_until="networkidle")
            page.wait_for_timeout(1500)
            for _ in range(10):  # trigger lazy content and scroll animations
                page.mouse.wheel(0, 1200)
                page.wait_for_timeout(300)

            data = page.evaluate(EXTRACT_JS)
            data["path"] = path
            pages.append(data)
            page.screenshot(path=str(OUT / f"shot_{slug(path)}.png"), full_page=True)
            print(f"captured {path}  ({len(data['text_blocks'])} text blocks)")

            for href in data["links"]:
                url = urlparse(urljoin(BASE, href))
                if url.netloc != host:
                    continue
                if url.path.lower().endswith((".pdf", ".jpg", ".jpeg", ".png", ".webp", ".svg")):
                    continue
                target = url.path or "/"
                if target not in seen:
                    queue.append(target)

        browser.close()

    (OUT / "exergy_crawl.json").write_text(json.dumps(pages, indent=2, ensure_ascii=False))
    print(f"\nDone: {len(pages)} pages -> {OUT / 'exergy_crawl.json'}")
    if len(pages) == 1:
        print("Only one page found. The site may use in-page sections or hash routing; "
              "treat each nav section as a page when building the content map.")


if __name__ == "__main__":
    main()
