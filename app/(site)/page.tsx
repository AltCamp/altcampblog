import Main from "./Main";
import { getLatestPosts } from "@/sanity/sanity-utils";

export default async function Page() {
  const posts = await getLatestPosts();
  // console.log(posts[posts.length - 1].slug)
  return (
    <>
      <Main posts={posts} />
    </>
  );
}
