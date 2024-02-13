import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductCategories = ({ products }: Props) => {
  type CategoryCounts = { [key: string]: number };

  const categoryCounts: CategoryCounts = products.reduce(
    (acc: CategoryCounts, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  );

  console.log(categoryCounts);
  // categories.unshift("All");

  let topCategories = Object.keys(categoryCounts)
    .map((cat) => ({
      category: cat,
      count: categoryCounts[cat],
    }))
    .sort((a, b) => b.count - a.count)
    .splice(0, 6);

  topCategories.push({ category: "All", count: 1 });

  // let test = Array.from(distinctCats, ([name, value]) => ({{name, value}}))

  return (
    <div className="flex flex-row gap-2">
      {topCategories.map(({ category }) => {
        return <p className="text-center border-2">{category}</p>;
      })}
    </div>
  );
  // <div>ProductFilter</div>
};

export default ProductCategories;
