import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="top-0 left-0 w-full fixed z-50 bg-[#0d253f]">
      <div className="container px-2 py-4 mx-auto lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="text-2xl font-black text-white lg:text-3xl">
                LOGO
              </div>
            </Link>
            <nav className="ml-6 text-white">
              <ul className="flex items-center gap-4 lg:gap-8">
                {LINKS.map((item, key) => (
                  <li key={key}>
                    <Link
                      href={item.link}
                      passHref
                      className="text-sm font-bold lg:text-md"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className=""></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const LINKS = [
  {
    title: "Upcoming",
    link: "/upcoming",
  },
  {
    title: "Popular",
    link: "/popular",
  },
  {
    title: "Top Rated",
    link: "/top-rated",
  },
];
