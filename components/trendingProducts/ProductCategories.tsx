"use client";
import { Product } from "@/types";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  products: string;
  categories: string;
};

const ProductCategories = ({ products: data, categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  const products: Product[] = JSON.parse(data);
  const currentCategories: { category: string; count: number }[] =
    JSON.parse(categories);
  if (!products || products.length === 0) return <p></p>;

  let topCategories = currentCategories.splice(0, 6);

  topCategories = [{ category: "All", count: 1 }, ...topCategories];

  return (
    <div className=" gap-2 mx-auto text-center text-mediumEmph">
      {" "}
      Popular Categories:
      {topCategories.map(({ category }) => {
        return (
          <button
            key={category}
            className={` hover:bg-primary  font hover:text-white py-2 px-4 mx-0.5 borderhover:border-transparent rounded ${
              category === selectedCategory ? "bg-primary text-white" : ""
            }`}
            onClick={(e) => {
              setSelectedCategory(category);
              // router.push(`/?category=${category}`, { scroll: false });
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
