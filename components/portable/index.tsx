"use client";
import { PortableText } from "@portabletext/react";
import { useEffect } from "react";
import Prism from "prismjs";
import components from "./components";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-python");

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export default function PortableBody({ value }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="prose max-w-none font-sans text-[15px] pb-8 text-black dark:text-[#ffffffe7] ">
      <PortableText value={value} components={components} />
    </div>
  );
}
