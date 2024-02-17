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

  // type CategoryCounts = { [key: string]: number };
  // const categoryCounts: CategoryCounts = products.reduce(
  //   (acc: CategoryCounts, product) => {
  //     acc[product.category] = (acc[product.category] || 0) + 1;
  //     return acc;
  //   },
  //   {}
  // );
  const topCategories = useMemo(() => {
    return currentCategories.sort((a, b) => b.count - a.count).splice(0, 6);
  }, currentCategories);

  // let topCategories = Object.keys(categoryCounts)
  //   .map((cat) => ({
  //     category: cat,
  //     count: categoryCounts[cat],
  //   }))
  //   .sort((a, b) => b.count - a.count)
  //   .splice(0, 6);

  // topCategories = [{ category: "All", count: 1 }, ...topCategories];

  // const topCategories = ["Category 1", "category 2", "Category 3"];
  return (
    <div className=" gap-2 mx-auto text-center text-mediumEmph">
      {" "}
      Top Categories:
      {topCategories.map(({ category }) => {
        return (
          <button
            key={category}
            className={` hover:bg-primary  font hover:text-white py-2 px-4 mx-0.5 borderhover:border-transparent rounded ${
              category === selectedCategory ? "bg-primary text-white" : ""
            }`}
            onClick={(e) => {
              setSelectedCategory(category);
              router.push(`/?category=${category}`, { scroll: false });
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
