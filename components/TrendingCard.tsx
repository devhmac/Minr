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
      className="border border-lowestEmph rounded-[15px] w-[300px]"
    >
      <div className="product-card_img-container flex items-center bg-white ">
        <Image
          src={product.image}
          alt="product image"
          width="200"
          height="200"
          className="h-full w-full bg-transparent max-h-[250px]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-l leading-5 truncate font-semibold">
          {product.title}
        </p>

        {/* <p className="text-sm">{product.description}</p> */}
      </div>
    </Link>
  );
};

export default TrendingCard;
