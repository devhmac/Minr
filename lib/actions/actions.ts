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
  extractShortUrl,
} from "../utils/extractFunctions";
import { redirect } from "next/navigation";

export async function scrapeAndSaveProduct(productUrl: string) {
  if (!productUrl) return;

  console.log("Incoming URL:", productUrl);
  console.log("shortened URL:", extractShortUrl(productUrl));

  try {
    const scrapedProduct = await scrapeUrl(extractShortUrl(productUrl));
    if (!scrapedProduct) return;

    dbConnect();
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    // ||(await Product.findOne({ title: scrapedProduct.title }));

    // if product already exists we need to create an updated version
    if (existingProduct) {
      console.log("------EXISTING PRODUCT FOUND-----");
      // console.log("------Current Price History", existingProduct.priceHistory);
      //update the price history on the prod with the new current price

      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        {
          price: scrapedProduct.currentPrice,
          // sending the new price hist object at get average including current
          average: getAveragePrice([
            ...existingProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ]),
        },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
        numScrapes: existingProduct.numScrapes + 1,
      };
    } else {
      // if no existing product create first price history
      const firstPriceHistory: any = [
        {
          price: scrapedProduct.currentPrice,
          average: scrapedProduct.currentPrice,
        },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: firstPriceHistory,
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

    // console.log("What we're attempting to update", product);
    // console.log("new product", newProduct);

    revalidatePath(`/products/${newProduct._id}`);

    return newProduct._id.toString();
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
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

export const getProductById = async (id: string) => {
  try {
    dbConnect();

    const product = await Product.findOne({ _id: id });
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    dbConnect();
    const products: ProductType[] = await Product.find({ category: category });
    return products;
  } catch (error: any) {
    throw new Error(`Failed to get products ${error.message}`);
  }
};
