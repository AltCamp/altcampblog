import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/components/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post._updatedAt || post.publishedAt,
  }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
