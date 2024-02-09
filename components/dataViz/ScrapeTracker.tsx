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
      <span className="flex flex-row justify-end gap-2">
        <CheckCircle2 className="text-emerald-400" />
        <XCircle className="text-rose-400" />
      </span>
      <Flex justifyContent="end" className="mt-4">
        <Text>Uptime {`${uptime}`}%</Text>
      </Flex>
      <Tracker data={scrapeHistory} className="mt-2" />
    </Card>
  );
};
