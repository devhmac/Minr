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
      className="product-card border border-lowestEmph rounded-[15px]  items-center pt-3"
    >
      <div className="product-card_img-container bg-white max-h-[250px] max-w-[250px] ">
        <Image
          src={product.image}
          alt="product image"
          width="200"
          height="200"
          className="h-full w-full bg-transparent max-h-[250px] max-w-[250px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-l leading-5 truncate font-semibold w-[280px]">
          {product.title}
        </h3>
        <p>{product.currentPrice}</p>

        {/* <p className="text-sm">{product.description}</p> */}
      </div>
    </Link>
  );
};

export default TrendingCard;
