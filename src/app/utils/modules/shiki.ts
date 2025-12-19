import { createHighlighter } from "shiki";

// 缓存高亮器实例，避免重复创建
let highlighter: any;

export async function getShikiHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      // 选择你喜欢的主题
      // 完整列表：https://shiki.matsu.io/themes
      themes: ["one-dark-pro"], // 或 'github-dark', 'nord', 'min-light' 等

      // 按需加载语言，减少打包体积
      langs: [
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
      ],
    });
  }
  return highlighter;
}

// 核心高亮函数
export async function highlightCode(code: string, language = "text") {
  const highlighter = await getShikiHighlighter();

  // Shiki 返回的是已经包含内联样式的 HTML 字符串
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: "one-dark-pro",
  });

  return html;
}
