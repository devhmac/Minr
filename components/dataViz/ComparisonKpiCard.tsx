import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  DeltaType,
  Grid,
} from "@tremor/react";

const categories = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
  },
];

const item = {
  title: "Customers",
  metric: "1,072",
  metricPrev: "856",
  delta: "25.3%",
  deltaType: "moderateIncrease",
};

type Props = {
  price: number;
  comparisonPrice: number;
  comparisonText: string;
  currency: string;
  title: string;
};

const ComparisonKpiCard = ({
  price,
  comparisonPrice,
  comparisonText,
  currency,
  title,
}: Props) => {
  let delta = ((comparisonPrice - price) / comparisonPrice) * 100;
  let deltaType = delta >= 0 ? "moderateIncrease" : "moderateDecrease";
  return (
    <Card>
      <Flex alignItems="start">
        <Text>{title}</Text>
        <BadgeDelta deltaType={deltaType}>{delta}</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="truncate space-x-3"
      >
        <Metric>
          {currency}
          {price}
        </Metric>
        <Text className="truncate">
          {comparisonText} {currency}
          {comparisonPrice}
        </Text>
      </Flex>
    </Card>
  );
};

export default ComparisonKpiCard;
