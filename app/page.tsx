import React from "react";

const Page = () => {
  return (
    <>
      <section className="px-6 border-2 md:px-20 py-24 border-red-500 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">Smart Shopping</p>
            <h1 className="head-text text-center">
              Track your product pricing analytics all in one Place with{" "}
              <span className="text-primary">Minr</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
