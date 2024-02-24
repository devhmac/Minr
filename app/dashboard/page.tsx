import Dashboard from "@/components/Dashboard";
import React, { useEffect, useState } from "react";

const page = () => {
  return (
    <main className="mx-auto mw-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl">Bookmarked Products</h1>
      </div>
      <Dashboard />
    </main>
  );
};

export default page;
