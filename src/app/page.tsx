import { getPostBySlug } from "@/app/utils/modules/generateRoutes";
import { PostBody } from "@/app/components/Layout/PostBody";

export default function Index() {
  const homePost = getPostBySlug("index");

  return (
    <main className="py-12 prose">
      <PostBody post={homePost} />
    </main>
  );
}
