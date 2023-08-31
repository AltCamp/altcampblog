import siteMetadata from '@/components/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from '../../seo'
import { Metadata } from 'next'
import { getPostsByTag } from '@/sanity/sanity-utils'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = params.tag
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}


export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const posts = await getPostsByTag(tag);
  // console.log(posts)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  
  return <ListLayout posts={posts} title={title} />
}
