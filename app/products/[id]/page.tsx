import { getProductById } from "@/lib/actions/actions";
import { Product } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  return (
    <div>
      <div>{product.title}</div>
      <Image
        src={product.image}
        alt="Picture of Product"
        height={400}
        width={400}
      />
    </div>
  );
};

export default ProductDetails;
