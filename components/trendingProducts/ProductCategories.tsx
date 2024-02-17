"use client";
import { Product } from "@/types";
import { useState } from "react";

type Props = {
  products: string;
  categorySelection: any;
};

const ProductCategories = ({ products: data, categorySelection }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  console.log(selectedCategory);

  const products: Product[] = JSON.parse(data);

  if (!products || products.length === 0) return <p></p>;

  type CategoryCounts = { [key: string]: number };
  const categoryCounts: CategoryCounts = products.reduce(
    (acc: CategoryCounts, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  );

  let topCategories = Object.keys(categoryCounts)
    .map((cat) => ({
      category: cat,
      count: categoryCounts[cat],
    }))
    .sort((a, b) => b.count - a.count)
    .splice(0, 6);

  topCategories = [{ category: "All", count: 1 }, ...topCategories];

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
              categorySelection(category);
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
