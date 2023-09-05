import { MetadataRoute } from "next";
import { getAllPosts } from "@/sanity/sanity-utils";
import siteMetadata from "@/components/siteMetadata";

export default async function sitemap() {
  const posts = await getAllPosts();
  const siteUrl = siteMetadata.siteUrl;
  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post._updatedAt || post.publishedAt,
  }));

  const routes = ["", "blog", "projects", "tags"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
