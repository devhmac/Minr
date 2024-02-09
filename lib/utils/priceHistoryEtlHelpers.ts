import { PriceHistoryItem, ScrapeStatus } from "@/types";
import { type } from "os";

export const priceHistoryChartEtl = (priceHistory: PriceHistoryItem[]) => {
  let chartData = priceHistory.map((val) => ({
    price: val.price,
    average: val.average,
    // date: val.date.toISOString().split("T")[0],
    date: val.date.toDateString(),
  }));

  return chartData;
};

export const scrapeHealthEtl = (priceHistory: PriceHistoryItem[]) => {
  const scrapeHistory: ScrapeStatus[] = [];
  let success: number = 0;
  let fail: number = 0;

  // switch to a backwards c-style loop and take first 30 or something

  priceHistory.forEach((val) => {
    let scrapeSucceeded: boolean = val.price > 0 ? true : false;
    scrapeSucceeded ? success++ : fail++;
    scrapeHistory.push({
      color: scrapeSucceeded ? "emerald" : "rose",
      tooltip: val.date.toDateString(),
    });
  });

  let uptime =
    fail === 0 ? 100 : Math.round((success / (success + fail)) * 100);

  return { uptime, scrapeHistory };
};
