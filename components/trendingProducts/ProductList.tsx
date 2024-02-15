import { Product } from "@/types";
import React from "react";
import TrendingCard from "./TrendingCard";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-5 text-mediumEmph  justify-center ">
      {products?.map((item, i) => {
        return <TrendingCard key={i} product={item} />;
      })}
    </div>
  );
};

export default ProductList;
