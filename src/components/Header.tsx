import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="top-0 left-0 w-full fixed z-50 bg-[#0d253f]">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="text-3xl font-black text-white">LOGO</div>
            </Link>
            <nav className="ml-6 text-white">
              <ul className="flex items-center gap-8">
                {LINKS.map((item, key) => (
                  <li key={key}>
                    <Link
                      href={item.link}
                      passHref
                      className="font-bold"
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
    link: "/?movie=upcoming",
  },
  {
    title: "Popular",
    link: "/?movie=popular",
  },
  {
    title: "Top Rated",
    link: "/?movie=top-rated",
  },
];
