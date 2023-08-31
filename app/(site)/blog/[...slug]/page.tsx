import PageTitle from "@/components/PageTitle";
import PostLayout from "@/layouts/PostLayout";
import { Metadata } from "next";
import siteMetadata from "@/components/siteMetadata";
import { getSinglePost, getSlugs } from "@/sanity/sanity-utils";
import { Pagination } from "@/types/Pagination";

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

  let prev: Pagination = {}; // Initialize prev as an empty string
  let next: Pagination = {}; // Initialize next as an empty string

  slugs.forEach((slugger, index) => {
    if (slugger.slug === slug) {
      // Check if the current element is not the first element
      if (index > 0) {
        // Assign the slug of the previous element to prev
        prev.slug = slugs[index - 1].slug;
        prev.title = slugs[index - 1].title;
      }
    }
  });

  slugs.forEach((slugger, index) => {
    if (slugger.slug === slug) {
      // Check if the current element is not the last element
      if (index < slugs.length - 1) {
        // Assign the slug of the next element to next
        next.slug = slugs[index + 1].slug;
        next.title = slugs[index + 1].title;
      }
    }
  });

  return (
    <>
      <PostLayout post={post} prev={prev} next={next} />
    </>
  );
}
