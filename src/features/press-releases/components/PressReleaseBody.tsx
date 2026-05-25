import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

import { cn } from "@/lib/utils";

import { normalizePressReleaseMarkdown, safeMarkdownHref } from "../press-releases.markdown";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight first:mt-0 text-foreground">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-semibold tracking-tight first:mt-0 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const safe = safeMarkdownHref(href);
    if (!safe) return <span>{children}</span>;
    return (
      <a
        href={safe}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4 hover:opacity-90"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-border pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-6 border-border/60" />,
};

type PressReleaseBodyProps = {
  body: string;
  className?: string;
};

export function PressReleaseBody({ body, className }: PressReleaseBodyProps) {
  const markdown = normalizePressReleaseMarkdown(body);

  return (
    <div className={cn("press-release-prose space-y-4 [&>*:first-child]:mt-0", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
