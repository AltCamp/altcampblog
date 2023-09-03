import "@/css/prism.css";

import PostLayout from "@/layouts/PostLayout";
import { Metadata } from "next";
import siteMetadata from "@/components/siteMetadata";
import { getSinglePost, getSlugs } from "@/sanity/sanity-utils";
import { Pagination } from "@/types/Pagination";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const slug = params.slug;
  const post = await getSinglePost(slug);
  if (!post) {
    return
  }

  const publishedAt = new Date(post.publishedAt).toISOString()
  const modifiedAt = new Date(post._updatedAt || post.publishedAt).toISOString()
  const authors = post?.author?.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

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
