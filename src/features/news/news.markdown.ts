/** Remove leading `# Title` — page header already shows `article.title`. */
export function stripLeadingMarkdownHeading(body: string): string {
  return body.replace(/^\s{0,3}#{1,6}\s+[^\n]+(?:\n\s*)?/, "").trimStart();
}

/**
 * Normalizes API markdown quirks before render.
 * e.g. `Sources * [a](u1) * [b](u2)` → GFM list under ## Sources
 */
export function normalizeNewsMarkdown(body: string): string {
  let text = body.trim();
  if (!text) return text;

  text = stripLeadingMarkdownHeading(text);

  text = text.replace(/^(Sources)\s+\*\s+\[/gim, "## $1\n\n* [");
  text = text.replace(/\)\s+\*\s+\[/g, ")\n* [");

  return text;
}

function isSafeHref(href: string | undefined): href is string {
  if (!href?.trim()) return false;
  try {
    const u = new URL(href, "https://example.com");
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function safeMarkdownHref(href: string | undefined): string | undefined {
  return isSafeHref(href) ? href : undefined;
}
