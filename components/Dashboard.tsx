"use client";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean } | {}>(
    {}
  );

  useEffect(() => {
    const localStoreBookmarks: { [key: string]: boolean } = JSON.parse(
      localStorage.getItem("bookmarks") || "{}"
    );
    setBookmarks(localStoreBookmarks);
  }, []);
  return <div>{JSON.stringify(bookmarks)}</div>;
};

export default Dashboard;
