import { Card, Metric, Text } from "@tremor/react";

type Props = {
  price: number;
  currency: string;
  title: string;
};

export default ({ title, price, currency }: Props) => (
  <Card
    className="max-w-[240px] min-w-[127px] tremor-background-white "
    decoration="top"
    decorationColor="indigo"
  >
    <Text>{title}</Text>
    <Metric>{`${currency} ${price}`}</Metric>
  </Card>
);
