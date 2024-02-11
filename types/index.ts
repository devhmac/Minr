import { Color } from "@tremor/react";

export type PriceHistoryItem = {
  price: number;
  average: number;
  date: Date;
};

export type User = {
  email: string;
};

export type Product = {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  numScrapes: number;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
};

export type ScrapedData = {
  url: string;
  currency: string;
  title: string;
  image: string;
  numScrapes: number;
  currentPrice: number;
  originalPrice: number;
  priceHistory: [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export type ScrapeStatus = {
  color: Color;
  tooltip: string;
};
