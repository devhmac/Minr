import { Product } from "@/types";
import React from "react";
import TrendingCard from "./TrendingCard";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";

type Props = {
  products: Product[];
};

const ProductList = async ({ products }: Props) => {
  const categorySelection = async (category: string) => {
    "use server";
    // console.log(category);
    const manyprods = getProductsByCategory(category);
    // console.log(manyprods);
    return category;
  };

  const selectedCat = categorySelection;

  const categories = await getCategories();
  console.log(categories);
  // console.log("testing me category: ", category);
  return (
    <>
      <ProductCategories
        products={JSON.stringify(products)}
        categories={JSON.stringify(categories)}
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
