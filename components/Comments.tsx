"use client";

import { Comments as CommentsComponent } from "@/node_modules/pliny/comments";
import { useState } from "react";
import siteMetadata from "@/components/siteMetadata";

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);
  return (
    <>
      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
      {siteMetadata.comments && loadComments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </>
  );
}
