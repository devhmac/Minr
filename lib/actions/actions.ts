"use server";

import { PriceHistoryItem, Product as ProductType } from "@/types";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { dbConnect } from "../mongoose";
import { scrapeUrl } from "../scraper";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
} from "../utils/extractFunctions";

export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeUrl(productUrl);
    if (!scrapedProduct) return;
    console.log(scrapedProduct);

    dbConnect();
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    // if product already exists we need to create an updated version
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
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.url,
      },
      product,
      //update or if none, add new
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}

export const getProductFromDB = async (productId: string) => {
  try {
    dbConnect();
    const product = await Product.findOne({ _id: productId });

    !product ? null : product;
  } catch (error) {
    throw new Error(`Failed to get product ${error}`);
  }
};

export const getAllProducts = async () => {
  try {
    dbConnect();
    const products: ProductType[] = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Failed to get products ${error}`);
  }
};
