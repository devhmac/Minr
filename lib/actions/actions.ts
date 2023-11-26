"use server";

export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonUrl(productUrl);
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}
