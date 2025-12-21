import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import CodeBlock from "./Layout/CodeBlock";
import LinkComponent from "./ui/LinkComponent";
import Image from "./ui/Image";
import Logo from "./ui/Logo";
import { highlightCode } from "../utils/modules/shiki";
import { slugify } from "../utils";
import { JSX } from "react/jsx-runtime";

/**
 * 🔹 MDX components 类型（正确方式）
 */
type MDXComponents = ComponentProps<typeof MDXRemote>["components"];

/* =========================
   Inline Code
========================= */
export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="
        rounded
        bg-neutral-200/60
        px-1 py-0.5
        text-sm
        font-mono
        dark:bg-neutral-800
      "
      {...props}
    />
  );
}

/* =========================
   Code Block
========================= */
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

/* =========================
   Heading Factory
========================= */
const createHeading = (level: number) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return ({ children }: { children: React.ReactNode }) => {
    const text = String(children);
    const id = slugify(text);

    return (
      <Tag id={id} className="scroll-mt-24">
        {children}
      </Tag>
    );
  };
};

/* =========================
   MDX Components
========================= */
export const mdxComponents: MDXComponents = {
  pre: Pre,
  code: InlineCode,

  a: LinkComponent,
  img: Image,
  Logo,

  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};
