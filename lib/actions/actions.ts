"use server";

import { dbConnect } from "../mongoose";
import { scrapeUrl } from "../scraper";

export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeUrl(productUrl);
    if (!scrapedProduct) return;
    console.log(scrapedProduct);

    dbConnect();

    const existingProduct = await Product;
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}
