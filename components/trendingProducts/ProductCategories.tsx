import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductCategories = ({ products }: Props) => {
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

  topCategories.push({ category: "All", count: 1 });

  return (
    <div className="flex flex-row gap-2 justify-center">
      {topCategories.map(({ category }) => {
        return (
          <button
            key={category}
            className="text-center bg-transparent hover:bg-primary text-mediumEmph font-semibold hover:text-white py-2 px-4 borderhover:border-transparent rounded "
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
