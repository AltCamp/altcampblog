import { createClient, groq } from "next-sanity";
import config from "./config/client-config";
import { Post } from "@/types/Post";
import { Tag } from "@/types/Tag";

export async function getPosts(): Promise<Post[]> {
  const query = groq`*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    tags[]->{
      _id,
      title
    },
    summary,
    publishedAt,
}`;
  return createClient(config).fetch(query);
}

export async function getSlugs(): Promise<string[]> {
  const query = groq`*[_type == "post"]{
    "slug": slug.current,
}`;
  return createClient(config).fetch(query);
}

export async function getSinglePost(slug: string): Promise<Post> {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    tags[]->{
      _id,
      title
    },
    body[]{
      ..., 
      asset->{
        metadata,
        "_type":"reference",
        "_ref": _id
      }
    },
    author[]->{
      _id,
      name,
      "image": image.asset->url,
      twitter
    },
    summary,
    publishedAt,
}
  `;
  return createClient(config).fetch(query, { slug });
}

export async function getTags(): Promise<Tag[]> {
  const query = groq`*[_type == "tag"]{
    _id,
    title
  }`;
  return createClient(config).fetch(query);
}
