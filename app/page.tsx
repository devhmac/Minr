import MainCarousel from "@/components/MainCarousel";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { getAllProducts } from "@/lib/actions/actions";
import Image from "next/image";
import ProductLineChart from "@/components/ProductLineChart";

const Page = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24 text-secondary">
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
            <SearchBar />
          </div>
          {/* <MainCarousel /> */}
          <ProductLineChart />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text"> Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-7-16 text-mediumEmph">
          {allProducts?.map((item) => {
            return <div>{item.title}</div>;
          })}
        </div>
      </section>
    </>
  );
};

export default Page;
