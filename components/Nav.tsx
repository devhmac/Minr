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
          <div>icon</div>
          <p className="text-xl">Minr</p>
        </Link>
        <div className="flex items-center justify-between gap-4">
          <Search className="w-5 h-5" />
          <Star className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
