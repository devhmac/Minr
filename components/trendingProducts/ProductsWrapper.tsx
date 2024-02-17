"use client";
import React, { useState } from "react";

const ProductsWrapper = () => {
  const [category, setCategory] = useState<string>("All");

  const setCategoryCallback = (category: string) => {
    setCategory(category);
  };

  return <div>ProductsWrapper</div>;
};

export default ProductsWrapper;
