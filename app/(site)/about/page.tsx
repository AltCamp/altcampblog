import AuthorLayout from "@/layouts/AuthorLayout";
import { genPageMetadata } from "./../seo";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
  return (
    <>
      <AuthorLayout />
    </>
  );
}
