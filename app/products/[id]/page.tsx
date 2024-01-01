import { getProductById } from "@/lib/actions/actions";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");
  // console.log(product);
  return (
    <div>
      <div>{product.title}</div>
      <Image
        src={product.image}
        alt="Picture of Product"
        height={400}
        width={400}
      />
      {/* <p> bro:{JSON.stringify(product)}</p> */}
      <Link className="searchbar-btn" href={product.url}>
        To Amazon Product
      </Link>
    </div>
  );
};

export default ProductDetails;
