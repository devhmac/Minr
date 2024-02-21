"use client";
import { Product } from "@/types";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";
import CardSkeleton from "./CardSkeleton";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";
type Props = {
  products: string;
  categories: string;
};

const ProductList = ({
  products: productsJson,
  categories: categoriesJson,
}: Props) => {
  const products: Product[] = JSON.parse(productsJson);
  const categories: { category: string; count: number }[] =
    JSON.parse(categoriesJson);

  const [productTransition, setProductTransition] = useState({
    y: 0,
    opacity: 1,
  });

  const productTransitionHandler = () => {
    setProductTransition({ y: 100, opacity: 0 });
    setTimeout(() => {
      setProductTransition({ y: 0, opacity: 1 });
      // No interativity on current filter
    }, 400);
  };

  return (
    <>
      <h2 className="section-text text-center"> Trending Products</h2>

      <ProductCategories
        categories={JSON.stringify(categories)}
        productTransitionHandler={productTransitionHandler}
      />
      {/* Actually want to change this, if none then do a none found, if loading do this */}
      {!products || products.length === 0 ? (
        <div className="text-center">
          <Ghost className="h-8 w-8 align-middle inline-block mb-4" />
          <p className="font-semibold text-xl ">No Products Found...</p>
        </div>
      ) : (
        <motion.div
          animate={productTransition}
          transition={{ duration: 0.2, delayChildren: 0.4 }}
          className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center "
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
