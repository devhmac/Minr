import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurr, extractPrice } from "../utils/extractPrice";

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
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $("span .a-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability-span").text().trim().toLowerCase() ===
      "current unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurr($(".a-price-symbol"));

    const discount = $(".savingsPercentage ").text().replace(/[-%]/g, "");

    // ALSO WANT - stars, # reviews and category

    const scrapedData = {
      url,
      currency: currency || "$",
      title,
      image: imageUrls[0],
      currentPrice: Number(currPrice),
      originalPrice: Number(originalPrice),
      priceHistory: [],
      discountRate: Number(discount),
      reviewsCount: 50,
      stars: 4,
      category: "default",
      outOfStock,
    };
    console.log(scrapedData);
  } catch (error: any) {
    throw new Error(`Failed to scrape on Error: ${error.message}`);
  }
}
