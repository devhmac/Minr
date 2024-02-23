"use client";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import React, { useState } from "react";

const Bookmark = ({ productId }: { productId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const clickhandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked((prev) => {
      // if !prev is true, send bookmark increment to database, if false remove bookmark increment
      return !prev;
    });
  };

  return (
    <div title="Bookmark Product" onClick={clickhandler}>
      {isBookmarked ? (
        <BookmarkCheck className="text-zinc-700 bg-white fill-primary  rounded-md h-7 w-7 p-1   " />
      ) : (
        // <BookmarkIcon className="text-zinc-600 bg-white hover:bg-primary rounded-md h-7 w-7 p-1 hover:fill-white   " />
        <BookmarkIcon className="text-zinc-600 bg-white  rounded-md h-7 w-7 p-1 hover:fill-zinc-400   " />
      )}
    </div>
  );
};

export default Bookmark;

// fill-primary
// strokeWidth={0}
