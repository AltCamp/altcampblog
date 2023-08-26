import { PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  title: string;
  slug: string;
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
  _updatedAt: string;
};
