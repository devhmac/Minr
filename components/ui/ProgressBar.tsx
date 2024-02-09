import { Card, Flex, ProgressBar, Text } from "@tremor/react";

type props = {
  progress: number;
};
export default ({ progress }: props) => (
  // <Card className="max-w-sm mx-auto">

  <ProgressBar
    value={progress}
    color="emerald"
    className=" flex-1 min-w-[200px] p-3"
  />
  // </Card>
);
