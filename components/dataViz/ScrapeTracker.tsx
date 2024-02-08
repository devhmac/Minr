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
  scrapeHealth: ScrapeStatus[];
};

export const ScrapeTracker = (props: Props) => {
  const { scrapeHealth } = props;
  return (
    <Card className="max-w-sm mx-auto">
      <Title>Scrape Health</Title>
      <Text>Lena&apos;s Webshop &bull; May 2022</Text>
      <Flex justifyContent="end" className="mt-4">
        <Text>Uptime 92%</Text>
      </Flex>
      <Tracker data={scrapeHealth} className="mt-2" />
    </Card>
  );
};
