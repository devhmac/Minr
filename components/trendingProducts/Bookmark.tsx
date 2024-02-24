"use client";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";

const Bookmark = ({ productId }: { productId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: Boolean } | {}>(
    {}
  );

  useEffect(() => {
    const localStoreBookmarks: { [key: string]: boolean } = JSON.parse(
      localStorage.getItem("bookmarks") || "{}"
    );
    setBookmarks(localStoreBookmarks);
    if (localStoreBookmarks[productId]) {
      setIsBookmarked(true);
    }
  }, []);

  const clickhandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked((prev) => {
      const newBookmarks = { ...bookmarks };
      if (!prev) {
        newBookmarks[productId] = true;
      } else {
        delete newBookmarks[productId];
      }
      setBookmarks(newBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      return !prev;
    });
  };

  return (
    <div title="Bookmark Product" onClick={clickhandler}>
      {isBookmarked ? (
        <BookmarkCheck className="text-zinc-700 bg-white fill-primary  rounded-md h-7 w-7 p-1   " />
      ) : (
        <BookmarkIcon className="text-zinc-600 bg-white  rounded-md h-7 w-7 p-1 hover:fill-zinc-400   " />
      )}
    </div>
  );
};

export default Bookmark;

// fill-primary
// strokeWidth={0}