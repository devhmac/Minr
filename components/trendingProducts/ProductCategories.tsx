import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductCategories = ({ products }: Props) => {
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  // categories.unshift("All");

  return (
    <div className="flex flex-row gap-2">
      {categories.map((category: string) => {
        return <p className="text-center border-2">{category}</p>;
      })}
    </div>
  );
  // <div>ProductFilter</div>
};

export default ProductCategories;
