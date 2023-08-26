import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import { ReactNode } from "react";
import Header from "./Header";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import { useRouter } from "next/router";

const space = Space_Grotesk({ subsets: ["latin"] });

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div
        className={`${space.className} flex h-screen flex-col justify-between font-sans`}
      >
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
