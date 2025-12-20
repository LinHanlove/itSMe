import { getPostBySlug } from "@/app/utils/modules/generateRoutes";
import { PostBody } from "@/app/components/Layout/PostBody";

export default function Index() {
  const homePost = getPostBySlug("index");
  const content = homePost.content || "";

  return (
    <main className="py-12 prose">
      <PostBody content={content} />
    </main>
  );
}
