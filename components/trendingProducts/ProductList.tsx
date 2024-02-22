"use client";
import { Product } from "@/types";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";
import CardSkeleton from "./CardSkeleton";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
type Props = {
  products: string;
  categories: string;
};

const ProductList = ({
  products: productsJson,
  categories: categoriesJson,
}: Props) => {
  console.count("Product List counter");
  const products: Product[] = JSON.parse(productsJson);
  const categories: { category: string; count: number }[] =
    JSON.parse(categoriesJson);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

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
      <ProductCategories categories={JSON.stringify(categories)} />
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
          {products?.map((item, i) => {
            return <ProductCard key={i} product={item || null} />;
          })}
        </motion.div>
      )}
    </>
  );
};

export default ProductList;
// Array.from({ length: 5 }, (_, index) => <CardSkeleton />)
