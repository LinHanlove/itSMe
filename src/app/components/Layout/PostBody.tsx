import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../mdx-components";

export function PostBody({ content }: { content: string }) {
  return (
    <div className="max-w-2xl markdown mx-auto">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
