import { PriceHistoryItem, Product } from "@/types";

// immediately spread multiple elements into function
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    console.log("price text pre extract", priceText);

    // remove all non digit characters (and keep .), we just want price
    if (priceText) {
      let repeatPriceCatch = priceText.split("$");
      let price =
        repeatPriceCatch[0] === "" && repeatPriceCatch[1].length > 0
          ? repeatPriceCatch[1].replace(/[^\d.]/g, "")
          : 0;
      console.log("If Pricetxt exists", priceText.replace(/[^\d.]/g, ""));
      // return priceText.replace(/[^\d.]/g, "");
      console.log("this is the returned price", price);
      return price;
    }
  }
  return "";
}

export function extractCurr(element: any) {
  const currText = element.text().trim()[0];
  return currText ? currText : "";
}

export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}

export const extractCategory = (element: any) => {
  const category = element
    .text()
    .replace(/[\s›]+/g, " ")
    .trim();
  return category || "Category Unknown";
};

export const getLowestPrice = (priceList: PriceHistoryItem[]) => {
  let lowest = priceList[0];
  priceList.forEach((item, i) => {
    if (item.price && item.price < lowest.price) {
      lowest = priceList[i];
    }
  });
  return lowest.price;
};

export const getHighestPrice = (priceList: PriceHistoryItem[]) => {
  let highest = priceList[0];

  priceList.forEach((item, i) => {
    if (item.price && item.price > highest.price) {
      highest = priceList[i];
    }
  });
  return highest.price;
};

export const getAveragePrice = (priceList: PriceHistoryItem[]) => {
  const priceSum = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const average = priceSum / priceList.length || 0;
  return parseFloat(average.toFixed(2));
};

export const extractShortUrl = (url: string) => {
  const splitUrl = url.split("/");
  const shortenedUrlpieces = [];

  for (let i = 0; i < splitUrl.length; i++) {
    if (splitUrl[i - 1] === "dp") {
      // splitUrl[i].includes("?ref=") ? shortenedUrlpieces[ :
      return shortenedUrlpieces.join("/");
    }
    shortenedUrlpieces.push(splitUrl[i]); //
  }

  return url;
};
