import { PriceHistoryItem, Product } from "@/types";

// immediately spread multiple elements into function
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    // remove all non digit characters (and keep .), we just want price
    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }
  return "";
}

export function extractCurr(element: any) {
  const currText = element.text().trim()[0];
  return currText ? currText : "";
}
