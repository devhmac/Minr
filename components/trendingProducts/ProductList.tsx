import { Product } from "@/types";
import React from "react";
import TrendingCard from "./TrendingCard";
import ProductCategories from "./ProductCategories";

type Props = {
  products: Product[];
};

const ProductList = async ({ products }: Props) => {
  const categorySelection = async (category: string) => {
    "use server";
    return category;
  };
  const category = await categorySelection("test");
  console.log("testing me category: ", category);
  return (
    <>
      <ProductCategories
        products={JSON.stringify(products)}
        categorySelection={categorySelection}
      />

      <div className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center ">
        {products?.map((item, i) => {
          return <TrendingCard key={i} product={item || null} />;
        })}
      </div>
    </>
  );
};

export default ProductList;
