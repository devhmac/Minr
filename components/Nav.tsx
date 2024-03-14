import { BookmarkIcon, Search, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header>
      <nav className="nav ">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/minr_logo.png" height={25} width={25} alt="Minr Logo" />
          <p className="text-xl text-primary font-semibold">Minr</p>
        </Link>
        <div className="flex items-center justify-between gap-4 h-full  hover:bg-lowEmph hover:h-full ">
          <Link
            href={"/bookmarks"}
            title="My Bookmarks"
            className=" flex flex-row gap-2 "
          >
            <BookmarkIcon className="text-secondary  rounded-md w-5 h-5   " />
            Bookmarks
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
