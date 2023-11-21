import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header>
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          {/* <Image /> */}
          <div>icon</div>
          <p className="text-xl">Minr</p>
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
