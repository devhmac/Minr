import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  DeltaType,
  Grid,
} from "@tremor/react";

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
  let delta = Math.round(((comparisonPrice - price) / comparisonPrice) * -100);

  // let delta = (price / comparisonPrice) * 100;
  let deltaType =
    delta > 0 ? "increase" : delta === 0 ? "unchanged" : "moderateDecrease";
  return (
    <Card
      className="max-w-[240px] min-w-[127px] "
      decoration="top"
      decorationColor="indigo"
    >
      <Flex alignItems="start">
        <Text>{title}</Text>
        <BadgeDelta deltaType={deltaType}>{delta}%</BadgeDelta>
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
