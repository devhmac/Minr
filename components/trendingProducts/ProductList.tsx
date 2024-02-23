import React from "react";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types";

type props = {
  products: Product[];
};

const ProductList = ({ products }: props) => {
  return products?.map((item) => {
    return <ProductListItem key={item._id} product={item || null} />;
  });
};

export default ProductList;
