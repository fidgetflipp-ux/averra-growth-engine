import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  url: z.string().url().max(500),
});

export const gradeWebsite = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const url = normalizeUrl(data.url);
    const started = Date.now();

    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "AverraGrader/1.0 (+https://averra.studio)" },
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      throw new Error("We couldn't reach that URL. Check it and try again.");
    }
    const ms = Date.now() - started;
    const html = await res.text();
    const headers = res.headers;

    const notes: string[] = [];

    // ---------- Performance ----------
    let performance = 100;
    const sizeKb = html.length / 1024;
    if (sizeKb > 500) { performance -= 25; notes.push(`HTML weight is ${Math.round(sizeKb)} KB — heavier than a healthy 200 KB.`); }
    else if (sizeKb > 250) { performance -= 12; }
    if (ms > 1500) { performance -= 20; notes.push(`Server responded in ${ms}ms — aim for under 800ms.`); }
    else if (ms > 800) performance -= 10;
    const scriptCount = (html.match(/<script\b/gi) || []).length;
    if (scriptCount > 25) { performance -= 15; notes.push(`${scriptCount} script tags detected — consider bundling and deferring.`); }
    else if (scriptCount > 12) performance -= 8;
    const imgCount = (html.match(/<img\b/gi) || []).length;
    if (imgCount > 30) { performance -= 10; notes.push(`${imgCount} images on this page — lazy-load and use modern formats.`); }
    if (!headers.get("content-encoding")?.match(/gzip|br|deflate/)) { performance -= 8; notes.push("No gzip/brotli compression header was returned."); }

    // ---------- Trust ----------
    let trust = 100;
    if (!url.startsWith("https://")) { trust -= 30; notes.push("Site isn't served over HTTPS."); }
    if (!/<meta\s+name=["']description["']/i.test(html)) { trust -= 15; notes.push("Missing meta description — costs you click-through from search."); }
    if (!/<meta\s+property=["']og:title["']/i.test(html)) { trust -= 10; notes.push("Missing OpenGraph tags — links look bare when shared."); }
    if (!/<link[^>]+rel=["'][^"']*icon/i.test(html)) { trust -= 5; }
    if (!/<title>[^<]+<\/title>/i.test(html)) { trust -= 15; notes.push("No <title> tag detected."); }
    if (!/(privacy|terms|contact)/i.test(html)) { trust -= 8; notes.push("No visible privacy/terms/contact link — trust signal missing."); }

    // ---------- Design ----------
    let design = 100;
    if (!/<meta\s+name=["']viewport["']/i.test(html)) { design -= 25; notes.push("No responsive viewport meta — mobile users will struggle."); }
    const fontLinks = (html.match(/fonts\.(googleapis|gstatic)\.com/gi) || []).length;
    if (fontLinks > 6) { design -= 10; notes.push("More than four font weights loaded — slows render and dilutes hierarchy."); }
    const inlineStyles = (html.match(/style=["']/gi) || []).length;
    if (inlineStyles > 60) { design -= 12; notes.push(`${inlineStyles} inline styles — usually a sign of a templated, non-systemized design.`); }
    const semantic = ["<header", "<nav", "<main", "<section", "<footer"].filter((t) => html.toLowerCase().includes(t)).length;
    if (semantic < 3) { design -= 12; notes.push("Few semantic HTML5 landmarks — hurts accessibility and crawlability."); }
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    if (h1Count === 0) { design -= 15; notes.push("No H1 detected — every page should have a single, clear headline."); }
    else if (h1Count > 1) design -= 6;

    // ---------- Conversion ----------
    let conversion = 100;
    const buttonCount = (html.match(/<button\b|class=["'][^"']*btn[^"']*["']/gi) || []).length;
    const ctaCopy = /(get started|book|start|free|try|sign up|contact|schedule|demo|quote|buy)/i.test(html);
    if (buttonCount < 2) { conversion -= 20; notes.push("Very few buttons detected — visitors need clear next steps."); }
    if (!ctaCopy) { conversion -= 15; notes.push("No action-oriented CTA copy detected above the fold."); }
    if (!/<form\b/i.test(html)) { conversion -= 12; notes.push("No form on the page — capture leads, not just visits."); }
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length < 400) { conversion -= 15; notes.push("Page text is sparse — visitors don't have enough to evaluate you."); }
    if (text.length > 12000) { conversion -= 8; }

    const clamp = (n: number) => Math.max(15, Math.min(100, Math.round(n)));
    const scores = {
      design: clamp(design),
      trust: clamp(trust),
      performance: clamp(performance),
      conversion: clamp(conversion),
    };
    const overall = Math.round((scores.design + scores.trust + scores.performance + scores.conversion) / 4);

    return { url, overall, scores, notes };
  });

function normalizeUrl(input: string): string {
  try {
    const u = new URL(input);
    return u.toString();
  } catch {
    return input.startsWith("http") ? input : `https://${input}`;
  }
}
