import ProductLineChart from "@/components/ProductLineChart";
import { getProductById } from "@/lib/actions/actions";
import data from "@/lib/static/exampleData";
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
    <section className="px-6 md:px-20 py-24">
      <h3 className="text-secondary text-semibold">{product.title}</h3>

      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="justify-center items-center sm:px-auto py-5 sm:pt-5 pb-5  w-1/2 border-2 border-lowestEmph rounded-[30px] mx-auto sm:max-w-xl  lg:max-w-md lg:h-[400px]">
          <div className="flex flex-col w-auto max-w-[500px] mx-auto lg:max-w-3xl lg:max-h-[400px] bg-red-300 items-center bg-white rounded-md mx-5">
            {/* <div className=" flex relative justify-center items-center product-card_img-container bg-white max-h-[300px] max-w-[300px] mx-auto"> */}
            <Image
              src={product.image}
              alt="Picture of Product"
              height={200}
              width={200}
              className="h-full w-full bg-transparent max-h-[300px] max-w-[300px] object-contain rounded-md"
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>stat 1</p>
            <p>stat 2</p>
            <p>stat 3</p>
          </div>
        </div>
        {/* <p> bro:{JSON.stringify(product)}</p> */}

        <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border-2 border-lowestEmph rounded-[30px] mx-auto h-[150px] sm:max-w-xl sm:h-[200px] lg:max-w-3xl lg:h-[400px]">
          <ProductLineChart data={data} />
        </div>
      </div>
      <div className="flex justify-end">
        <Link className="mx-2" href={product.url}>
          Amazon
        </Link>
        <Link className="" href="/">
          Back
        </Link>
      </div>
    </section>
  );
};

export default ProductDetails;
