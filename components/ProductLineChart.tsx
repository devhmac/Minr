"use client";
import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
];

// max-w-3xl h-[500px]

const ProductLineChart = () => {
  return (
    <div className="relative sm:px-10 py-5 sm:pt-20 pb-5  w-full border border-lowestEmph rounded-[30px] mx-auto max-w-[250px] h-[250px] sm:max-w-xl sm:h-[200px] xl:max-w-3xl xl:h-[500px]">
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
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
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
                          Today
                        </span>
                        <span className="font-bold">{`$${payload[1].value}`}</span>
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
            dataKey="today"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductLineChart;
