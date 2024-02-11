import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
} from "./extractFunctions";

import { PriceHistoryItem, Product, ScrapedData } from "@/types";

const updateExistingProduct = (
  scrapedProduct: ScrapedData,
  existingProduct: Product
) => {
  console.log("------EXISTING PRODUCT FOUND-----");
  // console.log("------Current Price History", existingProduct.priceHistory);
  //update the price history on the prod with the new current price

  let product = scrapedProduct;

  const updatedPriceHistory: any = [
    ...existingProduct.priceHistory,
    {
      price: scrapedProduct.currentPrice,
      // sending the new price hist object at get average including current
      average: getAveragePrice([
        ...existingProduct.priceHistory,
        { price: product.currentPrice },
      ]),
    },
  ];

  return (product = {
    ...scrapedProduct,
    priceHistory: updatedPriceHistory,
    lowestPrice: getLowestPrice(updatedPriceHistory),
    highestPrice: getHighestPrice(updatedPriceHistory),
    averagePrice: getAveragePrice(updatedPriceHistory),
  });
};
