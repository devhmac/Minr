import MainCarousel from "@/components/MainCarousel";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
  getProductsCount,
  getScrapeCount,
} from "@/lib/actions/actions";
import Image from "next/image";
import ProductLineChart from "@/components/ProductLineChart";
import data from "@/lib/static/exampleData";
import PocBanner from "@/components/ui/PocBanner";
import TrendingProductsContainer from "@/components/trendingProducts/TrendingProductsContainer";
import KpiCard from "@/components/dataViz/KpiCard";
import ProductsFadeIn from "@/components/animations/ProductsFadeIn";

const Page = async ({ searchParams }: any) => {
  const products =
    !searchParams["category"] || searchParams["category"] === "All"
      ? await getAllProducts()
      : await getProductsByCategory(searchParams["category"]);

  const categories: { category: string; count: number } = await getCategories();

  // const allProducts = await getAllProducts();
  const productCount = await getProductsCount();
  // const scrapeCount = await getScrapeCount();

  return (
    <>
      <PocBanner />
      <section className="px-6 md:px-20 py-10 text-secondary">
        <ToastContainer />
        <div className="flex max-xl:flex-col-reverse xl:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="head-text text-center">
              Product growth and pricing analytics all in one place with{" "}
              <span className="text-primary ">
                Minr{" "}
                <Image
                  className="inline pb-3"
                  src="/minr_logo.png"
                  height={50}
                  width={50}
                  alt="Minr Logo"
                />
              </span>
            </h1>
            <p className="mt-6 text-mediumEmph text-center">
              Empower your growth with A self-serve platform for your online
              marketplace pricing and performance data.
            </p>
            {/* <SearchBar /> */}
            <div className="flex flex-row gap-5 justify-center mt-12">
              <KpiCard
                title={"Products Tracked:"}
                value={productCount}
                size="small"
              />
              <KpiCard title={"Total Scrapes:"} value={5} size="small" />
              <KpiCard
                title={"Scraper Status:"}
                value={"Online"}
                size="small"
              />
            </div>
          </div>
          {/* <MainCarousel /> */}
          <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border-2 border-lowestEmph rounded-[30px] mx-auto max-w-[250px] h-[150px] sm:max-w-xl sm:h-[200px] xl:max-w-3xl xl:h-[500px] ">
            <ProductLineChart data={data} />
          </div>
        </div>
      </section>
      <div className=" mx-auto md:w-3/4">
        <h2 className="section-text text-center">
          Search for a product, or enter a new link to get started...
        </h2>

        <SearchBar />
      </div>
      <ProductsFadeIn>
        <section className="trending-section min-h-screen">
          {/* <ProductsWrapper products={allProducts} /> */}
          {/* <ProductCategories products={JSON.stringify(allProducts)} /> */}
          <TrendingProductsContainer
            products={JSON.stringify(products)}
            categories={JSON.stringify(categories)}
          />
        </section>
      </ProductsFadeIn>
    </>
  );
};

export default Page;
