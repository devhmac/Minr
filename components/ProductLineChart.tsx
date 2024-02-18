"use client";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";

type Props = {
  data: {
    price: number;
    average: number;
    date: string | null;
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
        {/* {data[0].date && data[data.length - 1].date ? (
          <XAxis
            dataKey="date"
            ticks={[data[0].date, data[data.length - 1].date]}
          />
        ) : null} */}
        <Tooltip
          formatter={(value, name, props) => [`${value}`, props.payload.date]}
          labelFormatter={(value) => `Date: ${value}`}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border  p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      {payload[0].payload.date ? (
                        <span className="text-[0.9rem] uppercase text-muted-foreground underline underline-offset-2 mb-2">
                          {payload[0].payload.date}
                        </span>
                      ) : null}
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Price
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[1] && payload[1].value
                              ? `$${payload[1].value}`
                              : "Scrape Err"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Average
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0] && payload[0].value
                              ? `$${payload[0].value}`
                              : "Scrape Err"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Line
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
        />

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
