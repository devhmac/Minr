// immediately spread multiple elements into function
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    // remove all non digit characters (and keep .), we just want price
    if (priceText) return priceText.replace(/[^0-9.]/g, "");
  }
  return "";
}
