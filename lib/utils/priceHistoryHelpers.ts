import { PriceHistoryItem, ScrapeStatus } from "@/types";
import { type } from "os";

export const priceHistoryChartEtl = (priceHistory: PriceHistoryItem[]) => {
  let chartData = priceHistory.map((val) => ({
    price: val.price,
    average: val.average,
    date: val.date.toISOString().split("T")[0],
  }));

  return chartData;
};

export const scrapeHealthEtl = (priceHistory: PriceHistoryItem[]) => {
  const scrapeHealth: ScrapeStatus[] = [];
  let success: number = 0;
  let fail: number = 0;

  // switch to a backwards loop actually and take first 30 or something

  priceHistory.forEach((val) => {
    let scrapeSucceeded: boolean = val.price > 0 ? true : false;
    scrapeSucceeded ? success++ : fail++;
    scrapeHealth.push({
      color: scrapeSucceeded ? "emerald" : "rose",
      tooltip: scrapeSucceeded ? "Success" : "Scrape Failed",
    });
  });
  return scrapeHealth;
};
