import { Card, Title, Tracker, Flex, Text, Color } from "@tremor/react";
import { ScrapeStatus } from "@/types";

interface Tracker {
  color: Color;
  tooltip: string;
}

const data: Tracker[] = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Downtime" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "gray", tooltip: "Maintenance" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "yellow", tooltip: "Degraded" },
  { color: "emerald", tooltip: "Operational" },
];

type Props = {
  scrapeHealth: {
    uptime: number;
    scrapeHistory: ScrapeStatus[];
  };
};

export const ScrapeTracker = (props: Props) => {
  const { uptime, scrapeHistory } = props.scrapeHealth;
  return (
    <Card className="max-w-sm mx-auto">
      <Title>Scrape Health</Title>
      <Text>Lena&apos;s Webshop &bull; May 2022</Text>
      <Flex justifyContent="end" className="mt-4">
        <Text>Uptime {`${uptime}`}%</Text>
      </Flex>
      <Tracker data={scrapeHistory} className="mt-2" />
    </Card>
  );
};
