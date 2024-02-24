"use client";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const Bookmark = ({ productId }: { productId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { setItem, getItem } = useLocalStorage("bookmarks");

  useEffect(() => {
    const localStoreBookmarks = getItem();
    if (localStoreBookmarks && localStoreBookmarks[productId]) {
      setIsBookmarked(true);
    }
  }, []);

  const clickhandler = (e: any) => {
    console.log(productId, " clicked");
    e.preventDefault();
    e.stopPropagation();

    const newBookmarks = { ...getItem() };

    if (!isBookmarked) {
      newBookmarks[productId] = true;
    } else {
      delete newBookmarks[productId];
    }
    setItem(newBookmarks);
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div title="Bookmark Product" onClick={clickhandler}>
      {isBookmarked ? (
        <BookmarkCheck className="text-zinc-700 bg-white fill-[#B1ABE6] rounded-md h-8 w-8 p-1 " />
      ) : (
        <BookmarkIcon className="text-zinc-600 bg-white  rounded-md h-8 w-8 p-1 hover:fill-zinc-400   " />
      )}
    </div>
  );
};

export default Bookmark;
