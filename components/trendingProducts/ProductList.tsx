"use client";
import { Product } from "@/types";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";
import { getCategories, getProductsByCategory } from "@/lib/actions/actions";
import CardSkeleton from "./CardSkeleton";
import { Ghost } from "lucide-react";

type Props = {
  products: string;
  categories: string;
};

const ProductList = ({
  products: productsJson,
  categories: categoriesJson,
}: Props) => {
  const [productTranstion, setProductTranstion] = useState(false);

  const products: Product[] = JSON.parse(productsJson);
  const categories: { category: string; count: number }[] =
    JSON.parse(categoriesJson);

  return (
    <>
      <h2 className="section-text text-center"> Trending Products</h2>

      <ProductCategories
        products={JSON.stringify(products)}
        categories={JSON.stringify(categories)}
      />
      {/* Actually want to change this, if none then do a none found, if loading do this */}
      {!products || products.length === 0 ? (
        <div className="text-center">
          <Ghost className="h-8 w-8 align-middle inline-block mb-4" />
          <p className="font-semibold text-xl ">No Products Found...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center ">
          {products?.map((item, i) => {
            return <ProductCard key={i} product={item || null} />;
          })}
        </div>
      )}
    </>
  );
};

export default ProductList;
// Array.from({ length: 5 }, (_, index) => <CardSkeleton />)
