import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./MDXComponents";

export default function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
