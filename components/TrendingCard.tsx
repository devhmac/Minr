import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

const TrendingCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div>
        <Image src={product.image} alt="product imag" />
      </div>
    </Link>
  );
};

export default TrendingCard;
