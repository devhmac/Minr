import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

type props = {
  products: Product[];
};

const ProductList = ({ products }: props) => {
  return products?.map((item) => {
    return <ProductCard key={item._id} product={item || null} />;
  });
};

export default ProductList;
