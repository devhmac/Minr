import axios from "axios";

export async function scrapeAmazonUrl(url: string) {
  if (!url) return;

  const username = process.env.BRIGHT_DATA_USERNAME;
  const password = process.env.BRIGHT_DATA_PASSWORD;

  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_fbdf08d9-zone-minr:kc3szvyropmu -k https://lumtest.com/myip.json
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
    const response = await axios.get(url);
  } catch (error: any) {
    throw new Error(`Failed to scrape on Error: ${error.message}`);
  }
}
