import { Product } from "@/types";

type Props = {
  products: Product[];
};

const ProductCategories = ({ products }: Props) => {
  // const categories = [
  //   "All",
  //   ...new Set(products.map((product) => product.category)),
  // ];

  type CategoryMap = { [key: string]: number };

  let categoryHash: CategoryMap = {};
  products.forEach((product) => {
    categoryHash[product.category] =
      0 + categoryHash[product.category] + 1 || 1;

    // if (distinctCats[product.category]) return distinctCats[product.category]++;
    // return (distinctCats[product.category] = 1);
  });
  console.log(categoryHash);
  // categories.unshift("All");

  let topCategories = Object.keys(categoryHash)
    .map((cat) => ({
      category: cat,
      count: categoryHash[cat],
    }))
    .sort((a, b) => b.count - a.count)
    .splice(0, 6);

  topCategories.push({ category: "All", count: 1 });

  console.log(topCategories);
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
