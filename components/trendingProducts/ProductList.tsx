// "use client";
import { Product } from "@/types";
import React from "react";
import TrendingCard from "./TrendingCard";
import ProductCategories from "./ProductCategories";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  const categorySelection = (category: string) => {
    return category;
  };
  // const category = categorySelection("test");
  // console.log("testing me category: ", category);
  return (
    <>
      {/* <ProductCategories
        products={products}
        categorySelection={categorySelection}
      /> */}

      <div className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center ">
        {products?.map((item, i) => {
          return <TrendingCard key={i} product={item || null} />;
        })}
      </div>
    </>
  );
};

export default ProductList;
