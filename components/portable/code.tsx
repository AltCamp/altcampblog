import { useEffect, useState } from "react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ClipboardIcon,
} from "@heroicons/react/20/solid";
import clipboard from "clipboard";

import cx from "classnames";

function count_line_numbers(value: string) {
  return value.split("\n").length;
}

function CodeBlock(props: {
  value: {
    language: string;
    code: string;
    filename: string;
  };
}) {
  const { value } = props;
  const [collapse, setCollapse] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lines = count_line_numbers(value.code);
    if (lines > 15) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, [value.code]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const copyToClipboard = (text: string | Element) => {
    clipboard.copy(text);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);

  return (
    <div
      className={cx(
        "block my-6 transition-all duration-300 border relative border-transparent rounded-md bg-black dark:bg-[#e46cc405] shadow-md overflow-hidden",
        {
          "max-h-[200px] overflow-y-hidden": collapse,
        },
      )}
    >
      <div className="flex justify-between items-center text-gray-700 h-10 w-full bg-white p-2">
        <div className="">{value?.filename}</div>
        <div className="w-fit h-fit flex items-center gap-1">
          <button>{copied ? "Copied" : "Copy"}</button>
          <ClipboardIcon
            onClick={() => copyToClipboard(value.code)}
            className="w-5 h-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-red-500"
          />
        </div>
      </div>
      <pre className={`command-line bg-transparent language-${value.language}`}>
        <code className={`text-sm line-number language-${value.language}`}>
          {value.code}
        </code>
      </pre>
      <button
        onClick={handleCollapse}
        className={cx(
          "bottom-0 right-0 w-full p-2 glass-box grid place-items-center",
          { absolute: collapse },
        )}
      >
        {!collapse ? (
          <ArrowsPointingInIcon className="w-5 h-5 text-gray-500 " />
        ) : (
          <ArrowsPointingOutIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}
export default CodeBlock;
