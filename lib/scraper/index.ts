import axios from "axios";
import * as cheerio from "cheerio";

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

    const title = $(`#productTitle`).text();
    const currPrice = $(".a-price").text();
    console.log({ title, currPrice });
  } catch (error: any) {
    throw new Error(`Failed to scrape on Error: ${error.message}`);
  }
}
