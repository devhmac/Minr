"use client";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const Bookmark = ({ productId }: { productId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: Boolean } | null>(
    null
  );
  const { setItem, getItem } = useLocalStorage("bookmarks");

  useEffect(() => {
    const localStoreBookmarks = getItem();
    setBookmarks(localStoreBookmarks);
    if (localStoreBookmarks && localStoreBookmarks[productId]) {
      setIsBookmarked(true);
    }
  }, []);

  const clickhandler = (e: any) => {
    console.log(productId, " clicked");
    e.preventDefault();
    e.stopPropagation();

    const currentBookmarks = getItem();
    const newBookmarks = { ...currentBookmarks };

    if (!isBookmarked) {
      newBookmarks[productId] = true;
    } else {
      delete newBookmarks[productId];
    }
    setItem(newBookmarks);
    setBookmarks(newBookmarks);
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div title="Bookmark Product" onClick={clickhandler}>
      {isBookmarked ? (
        <BookmarkCheck className="text-zinc-700 bg-white fill-primary rounded-md h-8 w-8 p-1 " />
      ) : (
        <BookmarkIcon className="text-zinc-600 bg-white  rounded-md h-8 w-8 p-1 hover:fill-zinc-400   " />
      )}
    </div>
  );
};

export default Bookmark;

// fill-primary
// strokeWidth={0}
