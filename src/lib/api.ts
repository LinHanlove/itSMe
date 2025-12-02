// 与本地 Markdown 博客文章相关的工具函数
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// `_posts` 目录存放所有 Markdown 文章文件
const postsDirectory = join(process.cwd(), "_posts");

// 获取 `_posts` 目录下所有文件名（slug 加 .md 的形式）
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// 根据 slug 读取单篇文章的元数据和正文内容
export function getPostBySlug(slug: string) {
  // 移除可能带上的 `.md` 后缀，得到真实 slug
  const realSlug = slug.replace(/\.md$/, "");
  // 拼接出完整文件路径
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  // 读取 Markdown 文件内容
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // 使用 gray-matter 解析出 front-matter（data）和正文（content）
  const { data, content } = matter(fileContents);

  // 组合为 `Post` 类型对象，供页面组件使用
  return { ...data, slug: realSlug, content } as Post;
}

// 获取所有文章，并按日期倒序排序
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    // 根据文件名逐个解析为 `Post`
    .map((slug) => getPostBySlug(slug))
    // 按日期从新到旧排序（descending）
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
