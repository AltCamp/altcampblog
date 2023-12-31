import { PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  projectImage: string | null;
  tags: {
    _id: string;
    title: string;
  }[];
  summary: string;
  body?: PortableTextBlock[];
  author?: {
    _id: string;
    name: string;
    image: string;
    twitter: string;
  }[];
  publishedAt: string;
  _updatedAt?: string;
  _createdAt?: string;
};
