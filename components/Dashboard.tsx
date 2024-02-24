"use client";
import { getProductsByIdList } from "@/lib/actions/actions";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import ProductList from "./trendingProducts/ProductList";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean } | {}>(
    {}
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const localStoreBookmarks: { [key: string]: boolean } = JSON.parse(
      localStorage.getItem("bookmarks") || "{}"
    );

    const ids = Object.keys(localStoreBookmarks);
    console.log(ids);
    const fetchBookmarkedProducts = async (ids: string[]) => {
      const bookmarkedProducts = (await getProductsByIdList(
        ids,
        "client"
      )) as string;
      console.log(bookmarkedProducts);
      setProducts(JSON.parse(bookmarkedProducts));
      // setProducts(bookmarkedProducts);
    };
    if (ids.length > 0) {
      fetchBookmarkedProducts(ids);
      // setProducts(JSON.parse(bookmarkedProducts));
    }
    // setBookmarks(localStoreBookmarks);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center"
    >
      <ProductList products={products} />
    </motion.div>
  );
};

export default Dashboard;
