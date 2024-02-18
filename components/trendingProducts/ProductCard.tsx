// "use client";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  // const [product, setProduct] = useState(data);

  return !product ? (
    <p>Loading...</p>
  ) : (
    <Link
      href={`/products/${product._id}`}
      title={product.title}
      className="product-card border-2 border-bentoBackground bg-lower rounded-md items-center p-2 bg-bentoBackground hover:bg-primary hover:shadow hover:shadow-lowestEmph hover:bg-opacity-70"
    >
      <div className="product-card_img-container bg-white h-full w-full ">
        {product.discountRate > 0 ? (
          <p className="absolute bg-primary text-secondary justify-center py-1 px-1.5 rounded-md left-1/2 -translate-x-1/2 border-gray-200 border">
            {product.discountRate}% Off
          </p>
        ) : null}
        <Image
          src={product.image}
          alt="product image"
          width="200"
          height="200"
          className="h-full w-auto bg-transparent max-h-[200px] max-w-auto object-contain rounded-md "
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-secondary text-l leading-5 truncate font-semibold w-[200px]">
          {product.title}
        </h3>
        <div className="flex justify-between">
          <p>{product.category}</p>
          <p className="text-secondary">
            <span>{product.currency}</span>
            {product.currentPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
