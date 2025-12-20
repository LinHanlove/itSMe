import type { MDXComponents } from "mdx/types";
import CodeBlock from "./Layout/CodeBlock";
import LinkComponent from "./ui/LinkComponent";
import Image from "./ui/Image";
import Logo from "./ui/Logo";
import { highlightCode } from "../utils/modules/shiki";

// 行内 code
const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800"
    {...props}
  />
);

// 块级 code
const Pre = async (props: any) => {
  const child = props.children;

  if (child?.props?.children) {
    const code = child.props.children.trim();
    const lang = child.props.className?.replace("language-", "");

    const html = await highlightCode(code, lang);

    return <CodeBlock html={html} language={lang} />;
  }

  return <pre {...props} />;
};

// 避免 <div> 被 <p> 包裹，解决 hydration 错误
const P = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

export const mdxComponents: MDXComponents = {
  // p: P,
  pre: Pre,
  code: InlineCode,
  LinkComponent,
  Image,
  Logo,
};
