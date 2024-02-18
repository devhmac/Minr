import { Product } from "@/types";
import React from "react";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";
import CardSkeleton from "./CardSkeleton";

type Props = {
  products: Product[];
};

const ProductList = async ({ products }: Props) => {
  const categorySelection = async (category: string) => {
    "use server";
    // console.log(category);
    const clientSelectedProducts = getProductsByCategory(category);
    // console.log(manyprods);
    return clientSelectedProducts;
  };
  // products = [];
  const categories = await getCategories();
  return (
    <>
      <ProductCategories
        products={JSON.stringify(products)}
        categories={JSON.stringify(categories)}
      />
      <div className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center ">
        {!products || products.length === 0
          ? Array.from({ length: 5 }, (_, index) => <CardSkeleton />)
          : products?.map((item, i) => {
              return <ProductCard key={i} product={item || null} />;
            })}
      </div>
    </>
  );
};

export default ProductList;
