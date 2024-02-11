import { getAllProducts } from "@/lib/actions/actions";
import { dbConnect } from "@/lib/mongoose";
import { scrapeUrl } from "@/lib/scraper";

export async function GET() {
  const products = await getAllProducts();

  if (!products || products.length === 0) throw new Error("No Products found");

  const cronUpdatedProducts = await Promise.all(
    products.map(async (product) => {
      scrapeUrl(product.url);
    })
  );
}
