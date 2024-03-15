import { Card, Title, Tracker, Flex, Text, Color } from "@tremor/react";
import { ScrapeStatus } from "@/types";
import { CheckCircle2, XCircle } from "lucide-react";
interface Tracker {
  color: Color;
  tooltip: string;
}

const data: Tracker[] = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
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
    <Card className=" w-full mx-auto">
      <Title className="flex flex-row justify-between">
        Scrape Health
        <span className="flex flex-row justify-end gap-2">
          <CheckCircle2 className="text-emerald-400" />
          <XCircle className="text-rose-400" />
        </span>
      </Title>
      <Flex justifyContent="end" className="mt-4">
        <Text>
          Total Scrapes: {scrapeHistory.length}, Uptime: {uptime}%
        </Text>
      </Flex>
      <Tracker data={scrapeHistory} className="mt-2" />
    </Card>
  );
};
