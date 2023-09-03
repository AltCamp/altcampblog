import Link from "next/link";
import { toUrl } from "../toUrl";
import { PortableTextComponents } from "@portabletext/react";
import CodeBlock from "./code";
import KatexBlock from "./katex";
import NextImage from "./image";
import BlockQuote from "./blockquote";
import { InlineMath } from "react-katex";
import { LinkIcon } from "@heroicons/react/20/solid";
import { Embed } from "./Embeded";
import { TableBlock } from "./table";

const components: PortableTextComponents = {
  marks: {
    latex: (props: any) => {
      return (
        <span className="mx-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
          <InlineMath>{props.text}</InlineMath>
        </span>
      );
    },
    em: ({ children }) => (
      <em className="italic text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline ">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-sans">
        {children}
      </strong>
    ),
    code: ({ children }) => (
      <code className=" p-2 text-[12px] rounded-md">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          className="inline hover:underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {children} <LinkIcon className="inline w-4 h-4 ml-1" />
        </Link>
      );
    },
  },
  types: {
    code: CodeBlock,
    image: NextImage,
    latex: KatexBlock,
    youtube: Embed,
    table: TableBlock,
  },
  block: {
    h1: ({ children }) => (
      <h1
        className="mt-10 text-4xl font-bold "
        id={toUrl(children)}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-10 mb-4 text-3xl font-bold "
        id={toUrl(children)}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-2xl font-bold ">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-10 mb-4 text-xl font-bold ">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-loose ">{children}</p>
    ),
    blockquote: BlockQuote,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-12 space-y-2 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-12 space-y-2 list-decimal">{children}</ol>
    ),
  },
};
export default components;
