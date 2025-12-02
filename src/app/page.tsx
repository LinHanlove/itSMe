// 博客首页：展示最新一篇文章和「更多文章」列表
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  // 读取所有文章（已按日期倒序排好）
  const allPosts = getAllPosts();

  // 最新的一篇作为首页大卡片
  const heroPost = allPosts[0];

  // 其余文章展示在「More Stories」列表中
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        {/* 顶部标题与说明区域 */}
        <Intro />
        {/* 首页主打文章卡片 */}
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {/* 如果还有其它文章，则渲染「More Stories」列表 */}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
