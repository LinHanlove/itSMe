import { createHighlighter, type Highlighter } from "shiki";

declare global {
  var __shikiHighlighter: Highlighter | undefined;
}

// 支持的语言
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

// 内置可用主题
const THEMES = ["vitesse-dark", "vitesse-light"];

export async function getShikiHighlighter(): Promise<Highlighter> {
  if (!globalThis.__shikiHighlighter) {
    globalThis.__shikiHighlighter = await createHighlighter({
      langs: SUPPORTED_LANGS,
      themes: THEMES,
    });
  }
  return globalThis.__shikiHighlighter;
}

export async function highlightCode(
  code: string,
  language?: string,
  theme: string = "vitesse-dark"
) {
  const highlighter = await getShikiHighlighter();
  const lang = SUPPORTED_LANGS.includes(language ?? "") ? language! : "text";

  try {
    return highlighter.codeToHtml(code, { lang, theme });
  } catch (err) {
    console.error("[Shiki] 高亮失败，回退为纯文本：", err);
    // fallback
    return `<pre><code>${code}</code></pre>`;
  }
}
