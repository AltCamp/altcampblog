import PageTitle from "@/components/PageTitle";
import PostLayout from "@/layouts/PostLayout";
import { Metadata } from "next";
import siteMetadata from "@/components/siteMetadata";
import { getSinglePost, getSlugs } from "@/sanity/sanity-utils";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] }
// }): Promise<Metadata | undefined> {
// const slug = decodeURI(params.slug.join('/'))
// const post = allBlogs.find((p) => p.slug === slug)
// const authorList = post?.authors || ['default']
// const authorDetails = authorList.map((author) => {
//   const authorResults = allAuthors.find((p) => p.slug === author)
//   return coreContent(authorResults as Authors)
// })
// if (!post) {
//   return
// }

// const publishedAt = new Date(post.date).toISOString()
// const modifiedAt = new Date(post.lastmod || post.date).toISOString()
// const authors = authorDetails.map((author) => author.name)
// let imageList = [siteMetadata.socialBanner]
// if (post.images) {
//   imageList = typeof post.images === 'string' ? [post.images] : post.images
// }
// const ogImages = imageList.map((img) => {
//   return {
//     url: img.includes('http') ? img : siteMetadata.siteUrl + img,
//   }
// })

// return {
//   title: post.title,
//   description: post.summary,
//   openGraph: {
//     title: post.title,
//     description: post.summary,
//     siteName: siteMetadata.title,
//     locale: 'en_US',
//     type: 'article',
//     publishedTime: publishedAt,
//     modifiedTime: modifiedAt,
//     url: './',
//     images: ogImages,
//     authors: authors.length > 0 ? authors : [siteMetadata.author],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: post.title,
//     description: post.summary,
//     images: imageList,
//   },
// }
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug[0];
  const post = await getSinglePost(slug);
  const slugs = await getSlugs();
  // console.log(slugs)

  // const prev = coreContent(sortedPosts[postIndex + 1])
  // const next = coreContent(sortedPosts[postIndex - 1])

  // map through post to get the next and previous slug on the list 
  const prev = slugs.map((slugger, index) => {
    if(slugger == slug) {
      return slugger
    }
  })
  
  return (
    <>
      <PostLayout post={post} />
    </>
  )
  ;
}
