// "use client";
import React, { useState } from "react";
import ProductCategories from "./ProductCategories";
import ProductList from "./ProductList";
import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductsWrapper = ({ products }: Props) => {
  // const [category, setCategory] = useState<string>("All");
  // const [productList, setProductList] = useState<Product[] | []>([]);

  // setProductList(products);

  const setCategoryCallback = (category: string) => {
    // setCategory(category);
  };

  return (
    <>
      <h2 className="section-text text-center"> Trending Products</h2>
      <ProductCategories products={products} />
      <ProductList products={products} />
    </>
  );
};

export default ProductsWrapper;
