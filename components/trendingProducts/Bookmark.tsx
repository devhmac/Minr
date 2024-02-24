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

  // useEffect(() => {
  //   const newBookmarks = { ...bookmarks };
  //   if (isBookmarked) {
  //     newBookmarks[productId] = true;
  //   } else {
  //     delete newBookmarks[productId];
  //   }
  //   localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  //   setBookmarks(newBookmarks);
  // }, [isBookmarked]);
  // console.log("state", bookmarks);
  // console.log("localStore", localStorage.getItem("bookmarks"));

  const clickhandler = (e: any) => {
    console.log(productId, " clicked");
    e.preventDefault();
    e.stopPropagation();

    const currentBookmarks: { [key: string]: boolean } = JSON.parse(
      localStorage.getItem("bookmarks") || "{}"
    );
    const newBookmarks = { ...currentBookmarks };

    if (!isBookmarked) {
      newBookmarks[productId] = true;
    } else {
      delete newBookmarks[productId];
    }
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
    setIsBookmarked((prev) => !prev);
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
