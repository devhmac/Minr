"use client";
import { getProductsByIdList } from "@/lib/actions/actions";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import ProductList from "./trendingProducts/ProductList";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean } | null>(
    null
  );
  const [products, setProducts] = useState([]);
  const { setItem, getItem } = useLocalStorage("bookmarks");

  const fetchBookmarkedProducts = async (ids: string[]) => {
    try {
      const bookmarkedProducts = (await getProductsByIdList(
        ids,
        "client"
      )) as string;
      setProducts(JSON.parse(bookmarkedProducts));
    } catch (error: any) {
      console.error("Error fetching bookmarked products:", error.message);
    }
  };
  useEffect(() => {
    const localStoreBookmarks = getItem();
    if (localStoreBookmarks) {
      fetchBookmarkedProducts(Object.keys(localStoreBookmarks));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center"
    >
      <ProductList products={products} />
    </motion.div>
  );
};

export default Dashboard;
