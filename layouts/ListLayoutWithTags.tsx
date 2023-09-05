/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { usePathname } from "next/navigation";
import { formatDate } from "@/node_modules/pliny/utils/formatDate";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/components/siteMetadata";
import { Post } from "@/types/Post";
import { Tag as TagType } from "@/types/Tag";
import { useState, useRef, useEffect } from "react";
import { getAllPostsWithPagination } from "@/sanity/sanity-utils";

type ListLayoutProps = {
  posts: Post[];
  tags?: TagType[];
  count?: number;
  title: string;
};

export default function ListLayoutWithTags({
  posts,
  tags,
  count,
  title,
}: ListLayoutProps) {
  const [allPosts, setAllPosts] = useState(posts);

  const [lastCreatedAt, setLastCreated] = useState(
    posts[posts?.length - 1]?._createdAt,
  );
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fetchNextPost = async (lastCreatedAt: string) => {
            const data = await getAllPostsWithPagination(lastCreatedAt);
            setLoading(false);
            setAllPosts([...allPosts, ...data]);
          };
          if (lastCreatedAt) {
            fetchNextPost(lastCreatedAt);
          }
        }
      });
    });

    const element: Element | null = document.querySelector(".scrollerFooter");

    if (element) {
      observer.observe(element);
    }
  }, [allPosts, lastCreatedAt]);

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="sm:hidden text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
            <div className="py-4 px-6">
              {pathname.startsWith("/blog") ? (
                <h3 className="text-primary-500 font-bold uppercase">
                  All Posts
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {tags?.map((t) => {
                  return (
                    <li key={t._id} className="my-3">
                      {pathname.split("/tags/")[1] === t.slug ? (
                        <h3 className="inline py-2 px-3 uppercase text-sm font-bold text-primary-500">
                          {`${t.title} (${t.postCount})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${t.slug}`}
                          className="py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t.title} (${t.postCount})`}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {allPosts.map((post) => {
                const { _id, slug, publishedAt, title, summary, tags } = post;
                return (
                  <li key={_id} className="py-5">
                    <article className="space-y-2 flex flex-col xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={publishedAt}>
                            {formatDate(publishedAt, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag._id} tag={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
            {count && loading && count != allPosts.length ? (
              <div
                role="status"
                className="scrollerFooter max-w-sm animate-pulse"
              >
                <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>

                <div className="flex gap-3 mb-3">
                  <div className="h-2.5 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  <div className="h-2.5 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>

                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="flex mb-3 mt-5 underline decoration-wavy ">
                Nothing more to see here. Browse other sections
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
