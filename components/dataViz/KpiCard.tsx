import { Card, Metric, Text } from "@tremor/react";

type Props = {
  value: number | string;
  currency?: string;
  title: string;
  size?: string;
};

const KpiCard = ({ title, value, currency, size }: Props) => {
  let classList =
    size && size === "small" ? "kpiCardSizeSmall flex-1" : "kpiCardSize flex-1";

  return (
    <Card className={classList} decoration="top" decorationColor="indigo">
      <Text>{title}</Text>
      <Metric>{currency ? `${currency}${value}` : value}</Metric>
    </Card>
  );
};

export default KpiCard;
