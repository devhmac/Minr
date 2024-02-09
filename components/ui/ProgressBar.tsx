import { Card, Flex, ProgressBar, Text } from "@tremor/react";

type props = {
  progress: number;
};
export default ({ progress }: props) => (
  <Card className="max-w-sm mx-auto">
    <Flex>
      <Text>$ 9,012 &bull; 45%</Text>
      <Text>$ 20,000</Text>
    </Flex>
    <ProgressBar value={progress} color="teal" className="mt-3" />
  </Card>
);
