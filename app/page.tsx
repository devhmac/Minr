import MainCarousel from "@/components/MainCarousel";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { ToastContainer } from "react-toastify";

const Page = () => {
  return (
    <>
      <section className="px-6 border-2-[] md:px-20 py-24 text-secondary">
        <ToastContainer />
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            {/* <p className="small-text">Smart Shopping</p> */}
            <h1 className="head-text text-center">
              Product growth and pricing analytics all in one place with{" "}
              <span className="text-primary">Minr</span>
            </h1>
            <p className="mt-6 text-mediumEmph text-center">
              Empower your growth with A self-serve platform for your online
              marketplace pricing and performance data.
            </p>
            <SearchBar />
          </div>
          <MainCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text"> Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-7-16 text-mediumEmph">
          {["Iphone", "Headphones", "Computer"].map((item) => {
            return <div>{item}</div>;
          })}
        </div>
      </section>
    </>
  );
};

export default Page;
