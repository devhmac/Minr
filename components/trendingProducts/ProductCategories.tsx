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
    // distinctCats[product.category] = 0 + distinctCats[product.category] || 1;

    if (distinctCats[product.category]) return distinctCats[product.category]++;
    return (distinctCats[product.category] = 1);
  });
  console.log(distinctCats);
  // categories.unshift("All");

  let categoriesWithCount = Object.keys(distinctCats).map((cat) => ({
    category: cat,
    count: distinctCats[cat],
  }));

  console.log(categoriesWithCount);
  // let test = Array.from(distinctCats, ([name, value]) => ({{name, value}}))

  let myMap = new Map().set("a", 1).set("b", 2);
  console.log(myMap);

  const result = Array.from(myMap).map(([name, value]) => ({ name, value }));

  console.log(result);

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
