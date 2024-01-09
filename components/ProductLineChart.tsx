"use client";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// will have to change this later once I decide on actually data titles
// type Props = {
//   data: {
//     average: number;
//     today: number;
//   }[];
// };

type Props = {
  data: {
    price: number;
    date: string;
  }[];
};

const ProductLineChart = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <Tooltip
          formatter={(value, name, props) => [`${value}`, props.payload.date]}
          labelFormatter={(value) => `Date: ${value}`}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border  p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Average
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {`$${payload[0].value}`}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Date
                      </span>
                      <span className="font-bold">{`${payload[0].payload.date}`}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        {/* <Line
          type="monotone"
          strokeWidth={2}
          stroke="#8884d8"
          dataKey="average"
          activeDot={{
            r: 6,
          }}
          style={
            {
              opacity: 0.25,
            } as React.CSSProperties
          }
        /> */}

        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{
            r: 8,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductLineChart;
