"use client";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../mdx-components";
import { TableOfContents } from "./TableOfContents";
import { parseMarkdownToc } from "@/app/utils";
import { Post } from "@/app/types";
import { usePathname } from "next/navigation";
import MoveTop from "../ui/MoveTop";

export function PostBody({ post }: { post: Post }) {
  const toc = parseMarkdownToc(post.content);
  const pathname = usePathname();

  return (
    <main className="max-w-2xl markdown mx-auto">
      {pathname !== "/" ? (
        <>
          <h1>{post.title}</h1>
          <p>
            <span>{post.date}</span>
            <span> • </span>
            <span>{post.duration}</span>
          </p>
        </>
      ) : null}
      <MDXRemote source={post.content} components={mdxComponents} />
      {toc.length ? <TableOfContents toc={toc} /> : null}
      <MoveTop />
    </main>
  );
}
