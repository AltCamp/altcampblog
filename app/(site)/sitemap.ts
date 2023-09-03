import { MetadataRoute } from 'next'
import { getAllPosts } from '@/sanity/sanity-utils'
import siteMetadata from '@/components/siteMetadata'
import {Post} from '@/types/Post'

let allPosts: Post[];

const getPosts = async () => {
  const posts = await getAllPosts()

  allPosts = posts;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post._updatedAt || post.publishedAt,
  }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
