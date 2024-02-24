"use client";
import { Product } from "@/types";
import React, { useState } from "react";
import ProductCard from "./ProductListItem";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";
import CardSkeleton from "./CardSkeleton";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ProductList from "./ProductList";
type Props = {
  products: string;
  categories: string;
};

const TrendingProductsContainer = ({
  products: productsJson,
  categories: categoriesJson,
}: Props) => {
  console.count("Product List counter");
  const products: Product[] = JSON.parse(productsJson);
  const categories: { category: string; count: number }[] =
    JSON.parse(categoriesJson);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // move this to the server
  let topCategories = categories.splice(0, 6);
  topCategories = [{ category: "All", count: 1 }, ...topCategories];
  const trendingCategories = topCategories.map((category) => category.category);

  return (
    <>
      {(selectedCategory === "All" || !selectedCategory) && (
        <h2 className="section-text text-center">Trending Products</h2>
      )}
      {selectedCategory && selectedCategory !== "All" && (
        <h2 className="section-text text-center">
          Trending Products: {selectedCategory}
        </h2>
      )}
      <ProductCategories categories={trendingCategories} />
      {/* Actually want to change this, if none then do a none found, if loading do this */}
      {!products || products.length === 0 ? (
        <div className="text-center">
          <Ghost className="h-8 w-8 align-middle inline-block mb-4" />
          <p className="font-semibold text-xl ">No Products Found...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center "
          key={searchParams.toString()}
        >
          <ProductList products={products} />
        </motion.div>
      )}
    </>
  );
};

export default TrendingProductsContainer;
