import { Card, Metric, Text } from "@tremor/react";

type Props = {
  price: number;
  currency?: string;
  title: string;
  size?: string;
};

const KpiCard = ({ title, price, currency, size }: Props) => {
  let classList =
    size && size === "small" ? "kpiCardSizeSmall flex-1" : "kpiCardSize flex-1";

  return (
    <Card className={classList} decoration="top" decorationColor="indigo">
      <Text>{title}</Text>
      <Metric>{currency ? `${currency} ${price}` : price}</Metric>
    </Card>
  );
};

export default KpiCard;
