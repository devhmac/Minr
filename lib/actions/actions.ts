"use server";

import { PriceHistoryItem } from "@/types";
import Product from "../models/product.model";
import { dbConnect } from "../mongoose";
import { scrapeUrl } from "../scraper";
import { getHighestPrice, getLowestPrice } from "../utils/extractFunctions";

export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeUrl(productUrl);
    if (!scrapedProduct) return;
    console.log(scrapedProduct);

    dbConnect();
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    // if product already exists we need to update it
    if (existingProduct) {
      //update the price history on the prod with the new current price
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(),
      };
    }
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}
