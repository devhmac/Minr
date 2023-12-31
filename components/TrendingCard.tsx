import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

const TrendingCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="product-card border-2 border-lowestEmph rounded-md items-center p-2 bg-[#ffffff0d] hover:bg-primary hover:shadow hover:shadow-lowestEmph hover:bg-opacity-70"
    >
      <div className="product-card_img-container bg-white h-full w-full ">
        <Image
          src={product.image}
          alt="product image"
          width="200"
          height="200"
          className="h-full w-full bg-transparent max-h-[200px] max-w-[250px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-secondary text-l leading-5 truncate font-semibold w-[200px]">
          {product.title}
        </h3>
        <div className="flex justify-between">
          <p>Category Placeholder</p>
          <p>
            <span>{product.currency}</span>
            {product.currentPrice}
            <span>/{product.discountRate}%</span>
          </p>
        </div>

        {/* <p className="text-sm">{product.description}</p> */}
      </div>
    </Link>
  );
};

export default TrendingCard;
