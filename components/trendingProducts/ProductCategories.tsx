"use client";
import { Product } from "@/types";

type Props = {
  products: string;
  categorySelection: any;
};

const ProductCategories = ({ products: data, categorySelection }: Props) => {
  const products: Product[] = JSON.parse(data);

  type CategoryCounts = { [key: string]: number };

  if (!products || products.length === 0) return <p></p>;

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
    <div className=" flex-row gap-2 justify-center mx-auto text-center">
      {topCategories.map(({ category }) => {
        return (
          <button
            key={category}
            className="  bg-transparent hover:bg-primary text-mediumEmph font-semibold hover:text-white py-2 px-4 borderhover:border-transparent rounded "
            onClick={(e) => {
              e.target;
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
