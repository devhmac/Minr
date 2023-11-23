import { Search, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header>
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          {/* <Image /> */}
          <div className="text-white-200">icon</div>
          <p className="text-xl text-secondary">Minr</p>
        </Link>
        <div className="flex items-center justify-between gap-4 ">
          <Search className="w-5 h-5 text-secondary" />
          <Star className="w-5 h-5 text-secondary" />
          <User className="w-5 h-5 text-secondary" />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
