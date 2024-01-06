import ProductLineChart from "@/components/ProductLineChart";
import ComparisonKpiCard from "@/components/dataViz/ComparisonKpiCard";
import ExampleModule from "@/components/dataViz/ExampleModule";
import KpiCard from "@/components/dataViz/KpiCard";
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
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        <div className="justify-center items-center sm:px-auto sm:pt-5 pb-5  w-1/3 sm:max-w-xl lg:h-[400px]">
          {/* <div className="flex flex-col w-auto max-w-[500px] mx-auto lg:max-w-3xl lg:max-h-[400px] bg-red-300 items-center bg-white rounded-md mx-5"> */}
          {/* <div className="flex  items-center justify-center"> */}
          <div className="justify-center items-center product-card_img-container bg-white h-full max-w-auto ">
            <Image
              src={product.image}
              alt="Picture of Product"
              height={200}
              width={200}
              className="h-auto w-full bg-transparent max-h-[400px] max-w-[300px] object-contain rounded-md"
            />
          </div>
          {/* </div> */}
        </div>

        {/* <p> bro:{JSON.stringify(product)}</p> */}

        <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border-2 border-lowestEmph rounded-[30px] mx-auto h-[150px] sm:max-w-xl sm:h-[200px] lg:max-w-3xl lg:h-[400px]">
          <ProductLineChart data={data} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
        {/* flex flex-row justify-around items-center mt-5 gap-2 flex-wrap  */}
        <ComparisonKpiCard
          title={"Current Price"}
          price={product.currentPrice}
          comparisonPrice={product.averagePrice}
          comparisonText={"vs Average"}
          currency={product.currency}
        />
        {/* <KpiCard
          title={"Current Price"}
          price={product.currentPrice}
          currency={product.currency}
        /> */}
        <KpiCard
          title={"Highest Price"}
          price={product.highestPrice}
          currency={product.currency}
        />
        <KpiCard
          title={"Lowest Price"}
          price={product.lowestPrice}
          currency={product.currency}
        />
      </div>
      <div className="w-xl h-xl"></div>
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
