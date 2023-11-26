"use server";

import { scrapeUrl } from "../scraper";

export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeUrl(productUrl);
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}
