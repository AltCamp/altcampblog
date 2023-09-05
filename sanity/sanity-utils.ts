import { createClient, groq } from "next-sanity";
import config from "./config/client-config";
import { Post } from "@/types/Post";
import { Tag } from "@/types/Tag";
import { Slug } from "@/types/Slug";

export async function getLatestPosts(): Promise<Post[]> {
  const query = groq`*[_type in ["post", "project"]] | order(_createdAt desc) [0...5] {
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    summary,
    publishedAt,
    _createdAt
}`;
  return createClient(config).fetch(query);
}

export async function getAllPostsCount(): Promise<number> {
  const query = groq`count(*[_type in ["post", "project"] && !(_id in path("drafts.**"))])`;
  return createClient(config).fetch(query);
}

export async function getAllPostsWithPagination(lastCreatedAt: string): Promise<Post[]> {
  const query = groq`*[_type in ["post", "project"] && ((_createdAt > $lastCreatedAt && $lastCreatedAt == '') || 
  (_createdAt < $lastCreatedAt && $lastCreatedAt != ''))]
| order(_createdAt desc)[0..5] {
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    summary,
    publishedAt,
    _createdAt
}`;
  return createClient(config).fetch(query, { lastCreatedAt });
}

export async function getAllPosts(): Promise<Post[]> {
  const query = groq`*[_type in ["post", "project"]]
| order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    summary,
    publishedAt,
    _createdAt
}`;
  return createClient(config).fetch(query);
}

export async function getPostsByTag(slug: string): Promise<Post[]> {
  const query = groq`*[_type in ["post", "project"] && $slug in tags[]->slug.current] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    summary,
    publishedAt,
}
  `;
  return createClient(config).fetch(query, { slug });
}


export async function getSlugs(): Promise<Slug[]> {
  const query = groq`*[_type in ["post", "project"]] | order(_createdAt desc) {
    title,
    "slug": slug.current,
}`;
  return createClient(config).fetch(query);
}

export async function getSinglePost(slug: string): Promise<Post> {
  const query = groq`*[_type in ["post", "project"] && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    tags[]->{
      _id,
      title,
      "slug": slug.current
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

export async function getProjects(): Promise<Post[]> {
  const query = groq`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "projectImage": projectImage.asset->url,
    summary,
}`;
  return createClient(config).fetch(query);
}

export async function getTags(): Promise<Tag[]> {
  const query = groq`*[_type == "tag"]{
    _id,
    title,
    "slug": slug.current,
    "postCount": count(*[_type in ["post", "project"] && references(^._id)])
  }`;
  return createClient(config).fetch(query);
}
