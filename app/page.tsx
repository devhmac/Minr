import MainCarousel from "@/components/MainCarousel";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
  getProductsCount,
  getScrapeCount,
  searchProducts,
} from "@/lib/actions/actions";
import Image from "next/image";
import ProductLineChart from "@/components/ProductLineChart";
import data from "@/lib/static/exampleData";
import PocBanner from "@/components/ui/PocBanner";
import TrendingProductsContainer from "@/components/trendingProducts/TrendingProductsContainer";
import KpiCard from "@/components/dataViz/KpiCard";
import ProductsFadeIn from "@/components/animations/ProductsFadeIn";
import { SearchIntentProvider } from "@/context/SearchIntentContext";

const Page = async ({ searchParams }: any) => {
  console.log(searchParams);
  let products = [];
  if (
    Object.keys(searchParams).length === 0 ||
    searchParams["category"] === "All"
  ) {
    products = await getAllProducts();
  } else if (searchParams["search"]) {
    products = await searchProducts(searchParams["search"]);
  } else if (searchParams["category"]) {
    products = await getProductsByCategory(searchParams["category"]);
  }

  const categories: { category: string; count: number } = await getCategories();

  // const allProducts = await getAllProducts();
  const productCount = await getProductsCount();
  const scrapeCount = await getScrapeCount();

  return (
    <>
      <PocBanner>
        <strong className="font-semibold">Web scraping is fickle. </strong>
        As a project POC we are currently only reliably scraping from{" "}
        <strong className="font-semibold"> Amazon.com & .ca</strong>
      </PocBanner>
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
            <div className="flex flex-row gap-5 justify-center mt-12">
              <KpiCard
                title={"Products Tracked:"}
                value={productCount}
                size="small"
              />
              <KpiCard
                title={"Total Scrapes:"}
                value={scrapeCount}
                size="small"
              />
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
      <SearchIntentProvider>
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
      </SearchIntentProvider>
    </>
  );
};

export default Page;
