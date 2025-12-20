import type { MDXComponents } from "mdx/types";
import CodeBlock from "./Layout/CodeBlock";
import LinkComponent from "./ui/LinkComponent";
import Image from "./ui/Image";
import Logo from "./ui/Logo";

// 行内 code
const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800"
    {...props}
  />
);

// 块级 code
const Pre = (props: any) => {
  const child = props.children;
  if (child && typeof child === "object" && "props" in child) {
    return (
      <CodeBlock className={child.props.className}>
        {child.props.children}
      </CodeBlock>
    );
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
