import { getAllProducts } from "@/lib/actions/actions";
import { dbConnect } from "@/lib/mongoose";
import { scrapeUrl } from "@/lib/scraper";
import { Product } from "@/types";

export async function GET() {
  const products = await getAllProducts();

  if (!products || products.length === 0) throw new Error("No Products found");

  const allUpdatedProducts = await Promise.all(
    products.map(async (product: Product) => {
      const newScrape = await scrapeUrl(product.url);

      if (!newScrape) throw new Error("Automated Recurring Scrape Failed");
    })
  );
}
