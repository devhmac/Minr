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
        <div className="flex flex-col w-auto max-w-[500px] mx-auto lg:max-w-3xl lg:max-h-[400px] bg-red-300">
          <Image
            src={product.image}
            alt="Picture of Product"
            height={400}
            width={400}
            className="Object-conatin rounded-md bg-white"
          />
          <div className="flex flex-row justify-between">
            <p>stat 1</p>
            <p>stat 2</p>
            <p>stat 3</p>
          </div>
        </div>
        {/* <p> bro:{JSON.stringify(product)}</p> */}

        <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border-2 border-lowestEmph rounded-[30px] mx-auto max-w-[250px] h-[150px] sm:max-w-xl sm:h-[200px] lg:max-w-3xl lg:h-[400px]">
          <ProductLineChart data={data} />
        </div>
      </div>
      <Link className="searchbar-btn " href={product.url}>
        To Amazon Product
      </Link>
    </section>
  );
};

export default ProductDetails;
