import ProductLineChart from "@/components/ProductLineChart";
import ComparisonKpiCard from "@/components/dataViz/ComparisonKpiCard";
import ExampleModule from "@/components/dataViz/ExampleModule";
import KpiCard from "@/components/dataViz/KpiCard";
import { ScrapeTracker } from "@/components/dataViz/ScrapeTracker";
import { getProductById } from "@/lib/actions/actions";
import data from "@/lib/static/exampleData";
import {
  priceHistoryChartEtl,
  scrapeHealthEtl,
} from "@/lib/utils/priceHistoryEtlHelpers";
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
  const { priceHistory } = product;

  const chartData = priceHistoryChartEtl(priceHistory);
  const scrapeHealth = scrapeHealthEtl(priceHistory);

  return (
    <section className="px-6 md:px-20 py-16">
      <h3 className="md:mx-9 flex-1 text-secondary text-semibold">
        {product.title}
      </h3>
      <div className="flex flex-row justify-between items-end mt-2 md:mx-9">
        <p className="text-mediumEmph">Category: {product.category}</p>
        <Link
          className=" text-mediumEmph cursor-pointer searchbar-btn"
          href={product.url}
          title="To product url"
          target="_blank"
        >
          <button>To Product</button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center md:gap-6 mt-6 mx-auto">
        <div className="justify-center items-center sm:px-auto sm:pt-5 pb-5 sm:max-w-xl lg:h-[400px] lg:w-1/3">
          {/* <div className="flex flex-col w-auto max-w-[500px] mx-auto lg:max-w-3xl lg:max-h-[400px] bg-red-300 items-center bg-white rounded-md mx-5"> */}
          {/* <div className="flex  items-center justify-center"> */}
          <div className="justify-center items-center product-card_img-container bg-white h-full w-full lg:max-h-[300px] max-w-auto min-w-[300px] min-h-auto overflow-hidden mb-2 px-2">
            <Image
              src={product.image}
              alt="Picture of Product"
              height={200}
              width={200}
              className="h-full w-auto bg-transparent max-h-[400px] max-w-[300px] object-contain rounded-md"
            />
          </div>
          <div className="flex flex-row justify-end gap-4">
            <h3 className="flex-1 text-secondary text-semibold">
              {product.category}
            </h3>
            <Link
              className=" text-mediumEmph cursor-pointer searchbar-btn"
              href={product.url}
              title="To product url"
              target="_blank"
            >
              <button>To Product</button>
            </Link>
          </div>
          {/* </div> */}
        </div>

        {/* <p> bro:{JSON.stringify(product)}</p> */}

        <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border-2 border-lowestEmph rounded-[30px] h-[200px] sm:max-w-xl sm:h-[250px] lg:max-w-3xl lg:h-[400px]">
          <ProductLineChart data={chartData} />
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
          value={product.highestPrice}
          currency={product.currency}
        />
        <KpiCard
          title={"Lowest Price"}
          value={product.lowestPrice}
          currency={product.currency}
        />
      </div>
      <div className="w-xl h-xl mt-[2rem]">
        <ScrapeTracker scrapeHealth={scrapeHealth} />
      </div>
    </section>
  );
};

export default ProductDetails;
