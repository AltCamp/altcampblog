import siteMetadata from "./siteMetadata";
import Image from "next/image";
import logo from "@/public/logonotext.svg";
import headerNavLinks from "@/components/headerNavLinks";
import Link from "./Link";
import MobileNav from './MobileNav'
import ThemeSwitch from "./ThemeSwitch";
import SearchButton from './SearchButton';

const Header = () => {
  return (
    <header className=" flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={logo} alt="Logo" width={40} height={40} />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;