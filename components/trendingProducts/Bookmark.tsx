import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import React from "react";

const Bookmark = ({ productId }: { productId: string }) => {
  return (
    <div title="Bookmark Product">
      {/* Bookmark */}
      {/* <BookmarkCheck /> */}
      <BookmarkIcon />
    </div>
  );
};

export default Bookmark;
