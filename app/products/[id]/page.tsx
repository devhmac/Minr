import ProductLineChart from "@/components/ProductLineChart";
import ComparisonKpiCard from "@/components/dataViz/ComparisonKpiCard";
import ExampleModule from "@/components/dataViz/ExampleModule";
import KpiCard from "@/components/dataViz/KpiCard";
import { ScrapeTracker } from "@/components/dataViz/ScrapeTracker";
import Bookmark from "@/components/trendingProducts/Bookmark";
import PocBanner from "@/components/ui/PocBanner";
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
      {product.numScrapes <= 1 ? (
        <PocBanner>
          <strong>You are this products first scrape</strong> - Check back to
          see your price trends.
        </PocBanner>
      ) : null}
      <h3 className="md:mx-9 flex-1 text-secondary text-semibold mt-5">
        {product.title}
      </h3>
      <div className="flex flex-row justify-between items-end mt-2 md:mx-9 border-b border-lowEmph pb-5 mt-5 ">
        <p className="text-mediumEmph">Category: {product.category}</p>
        <Link href={product.url} title="To product url" target="_blank">
          <button className="searchbar-btn ">To Product</button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center md:gap-6 mt-6 mx-auto">
        <div className="justify-center items-center sm:px-auto sm:pt-5 pb-5 sm:max-w-xl lg:h-[400px] lg:w-1/3">
          <div className="justify-center items-center product-card_img-container bg-white h-full w-full lg:max-h-[300px] max-w-auto min-w-[300px] min-h-auto overflow-hidden mb-2 px-2">
            <Image
              src={product.image}
              alt="Picture of Product"
              height={200}
              width={200}
              className="h-full w-auto bg-transparent max-h-[400px] max-w-[300px] object-contain rounded-md"
            />
            <div className="absolute bottom-[2%] right-[2%] ">
              <Bookmark productId={product._id!.toString()} />
            </div>
          </div>

          <div className="flex flex-row justify-between gap-4">
            <Bookmark productId={product._id!.toString()} />
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

        <KpiCard
          title={"Average Price"}
          value={product.averagePrice}
          currency={product.currency}
        />
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
      <div className="xl:mx-7 mt-[2rem]">
        <ScrapeTracker scrapeHealth={scrapeHealth} />
      </div>
    </section>
  );
};

export default ProductDetails;
