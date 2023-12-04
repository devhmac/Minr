import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurr,
  extractDescription,
  extractPrice,
} from "../utils/extractFunctions";

export async function scrapeUrl(url: string) {
  if (!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // fetching product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    //grab product info

    const title = $(`#productTitle`).text().trim();

    const currPrice = extractPrice(
      // $(".priceToPay span.a-price-whole"),
      // $(".a.size.base.a-color-price"),
      // $(".a-button-selected .a-color-base"),
      // $("span .a-price")
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "current unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurr($(".a-price-symbol"));

    const discount = $(".savingsPercentage ").text().replace(/[-%]/g, "");

    const description = extractDescription($);

    // ALSO WANT - stars, # reviews and category
    console.log("dont forget to delete these test values");
    const scrapedData = {
      url,
      currency: currency || "$",
      title,
      image: imageUrls[0],
      currentPrice: 10,
      originalPrice: 10,
      // currentPrice: Number(currPrice) || Number(originalPrice),
      // originalPrice: Number(originalPrice) || Number(currPrice),
      priceHistory: [],
      discountRate: Number(discount),
      reviewsCount: 50,
      stars: 4,
      category: "default",
      outOfStock,
      description,
      lowerPrice: 10,
      highestPrice: 10,
      averagePrice: 10,
      // lowerPrice: Number(currPrice) || Number(originalPrice),
      // highestPrice: Number(originalPrice) || Number(currPrice),
      // averagePrice: Number(currPrice) || Number(originalPrice),
    };
    // console.log(scrapedData);
    return scrapedData;
  } catch (error: any) {
    throw new Error(`Failed to scrape on Error: ${error.message}`);
  }
}
