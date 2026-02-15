"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionError } from "@/components/error/SectionError";
import { Select } from "@/components/Select";
import { Skeleton } from "@/components/Skeleton";
import { CustomTooltip } from "./CustomTooltip";
import { DEFAULT_DATE_RANGE, DATE_RANGE_OPTIONS } from "../constants";
import { useWorkingCapital } from "../useDashboard";

export default function WorkingCapital() {
  const [dateRange, setDateRange] = useState<string>(DEFAULT_DATE_RANGE);
  const { chartData, isLoading, isError, error, refetch } = useWorkingCapital();
  if (isError) {
    return (
      <SectionError
        title="Working Capital chart could not be loaded"
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
        className="h-full min-h-[280px]"
      />
    );
  }

  if (isLoading) {
    return (
      <section
        className="flex h-96 w-full flex-col rounded-xl border border-gray4Background bg-white px-6 py-3.5"
        aria-label="Working capital chart"
        aria-busy="true">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
        <div className="relative h-full w-full">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex h-96 w-full flex-col rounded-xl border border-gray4Background bg-white px-6 py-3.5"
      aria-label="Working capital chart">
      <header className="mb-6 flex flex-col min-[500px]:flex-row items-center justify-between">
        <h2 className="text-xl font-bold text-text1Color">Working Capital</h2>

        <div className="flex flex-col min-[500px]:flex-row items-center gap-4">
          <ul
            className="flex items-center gap-4 text-sm font-medium list-none"
            aria-label="Chart legend">
            <li className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full bg-secondaryColor"
                aria-hidden
              />
              <span className="text-text1Color">Income</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full bg-primaryColor"
                aria-hidden
              />
              <span className="text-text1Color">Expenses</span>
            </li>
          </ul>

          <Select
            options={[...DATE_RANGE_OPTIONS]}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            aria-label="Select date range for working capital chart"
          />
        </div>
      </header>

      <div
        className="relative h-full min-h-[250px] w-full outline-none focus:outline-none **:outline-none"
        role="img"
        aria-label="Income and expense chart"
        tabIndex={-1}>
        {/* This Warning Message is not relevant to the code, but it is a warning that is displayed in the console when the chart is rendered. https://github.com/recharts/recharts/issues/727 */}
        <ResponsiveContainer
          width="100%"
          minWidth={0}
          minHeight={250}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient
                id="colorIncome"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="#29A073"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="#29A073"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#929eae", fontSize: 12 }}
              dy={10}
              padding={{ left: 20 }}
              interval="preserveStartEnd"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#929eae", fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#1b212d", strokeWidth: 2 }}
            />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#29A073"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#29A073" }}
            />

            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#c8ee44"
              strokeWidth={3}
              fill="none"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#c8ee44" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
