import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductCategories = ({ products }: Props) => {
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  type CategoryMap = { [key: string]: number };

  let distinctCats: CategoryMap = {};
  const newCategories = products.forEach((product) => {
    if (distinctCats[product.category]) return distinctCats[product.category]++;
    return (distinctCats[product.category] = 1);
  });
  console.log(distinctCats);
  // categories.unshift("All");

  // for (let i = 0; i < products.length; i++) {
  //   if (distinctCats[products[i].category])
  // }

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
