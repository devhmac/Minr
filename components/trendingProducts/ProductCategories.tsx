"use client";
import { Product } from "@/types";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: string[];
  searchMode: boolean;
};

const ProductCategories = ({ categories }: Props) => {
  console.count("Product categories counter");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );
  const searchActive = searchParams.get("search") ? true : false;

  if (!categories || categories.length === 0) return <></>;

  useEffect(() => {
    if (searchParams.get("search")) {
      setSelectedCategory(null);
    }
  }, [searchActive]);

  return (
    <div className=" gap-2 mx-auto text-center text-mediumEmph">
      <p className="mb-4">Popular Categories</p>
      {categories.map((category) => {
        return (
          <button
            key={category}
            className={` hover:bg-primary  font hover:text-white py-2 px-4 m-0.5 borderhover:border-transparent rounded ${
              category === selectedCategory ? "bg-primary text-white" : ""
            }`}
            onClick={(e) => {
              setSelectedCategory(category);
              router.push(`/?category=${encodeURIComponent(category)}`, {
                scroll: false,
              });
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
  // <div>ProductFilter</div>
};

export default ProductCategories;
