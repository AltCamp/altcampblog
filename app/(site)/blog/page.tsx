import ListLayout from "@/layouts/ListLayoutWithTags";
import { genPageMetadata } from "./../seo";
import { getLatestPosts, getTags, getAllPostsCount } from "@/sanity/sanity-utils";

// const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: "Blog" });

export default async function BlogPage() {
  const posts = await getLatestPosts();
  const tags = await getTags();
  const count = await getAllPostsCount()

  return <ListLayout posts={posts} tags={tags} count={count} title="All Posts" />;
}
