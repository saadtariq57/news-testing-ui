/** Remove a leading `# Title` since the page header already shows the headline. */
export function stripLeadingMarkdownHeading(body: string): string {
  return body.replace(/^\s{0,3}#{1,6}\s+[^\n]+(?:\n\s*)?/, "").trimStart();
}

export function normalizePressReleaseMarkdown(body: string): string {
  const text = body.trim();
  if (!text) return text;
  return stripLeadingMarkdownHeading(text);
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
