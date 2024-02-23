import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import React from "react";

const Bookmark = ({ productId }: { productId: string }) => {
  const clickhandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("bookmarked");
  };

  return (
    <div title="Bookmark Product" onClick={clickhandler}>
      {/* Bookmark */}
      {/* <BookmarkCheck /> */}
      <BookmarkIcon className="text-zinc-600 bg-white hover:bg-primary rounded-md h-7 w-7 p-1 hover:text-mediumEmph " />
    </div>
  );
};

export default Bookmark;

// fill-primary
// strokeWidth={0}
