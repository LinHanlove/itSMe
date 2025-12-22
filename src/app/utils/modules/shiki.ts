import { createHighlighter, type Highlighter } from "shiki";

declare global {
  // 缓存 Promise
  var __shikiHighlighterPromise: Promise<Highlighter> | undefined;
}

const SUPPORTED_LANGS = [
  "javascript",
  "typescript",
  "css",
  "html",
  "jsx",
  "tsx",
  "json",
  "bash",
  "md",
  "markdown",
  "vue",
  "ts",
  "sh",
];

const THEMES = ["vitesse-dark", "vitesse-light"];

export function getShikiHighlighter(): Promise<Highlighter> {
  if (!globalThis.__shikiHighlighterPromise) {
    globalThis.__shikiHighlighterPromise = createHighlighter({
      langs: SUPPORTED_LANGS,
      themes: THEMES,
    });
  }

  return globalThis.__shikiHighlighterPromise;
}

export async function highlightCode(
  code: string,
  language?: string,
  theme: "vitesse-dark" | "vitesse-light" = "vitesse-dark"
) {
  const highlighter = await getShikiHighlighter();

  const lang = SUPPORTED_LANGS.includes(language ?? "")
    ? (language as string)
    : "text";

  try {
    return highlighter.codeToHtml(code, {
      lang,
      theme,
    });
  } catch (err) {
    console.error("[Shiki] highlight failed, fallback to plain text", err);
    return `<pre><code>${code}</code></pre>`;
  }
}
