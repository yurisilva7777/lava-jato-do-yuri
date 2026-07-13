"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface RevenueData {
  dia: string;
  faturamento: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  const total = data.reduce(
    (acc, item) => acc + item.faturamento,
    0
  );

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            📈 Faturamento
          </h2>

          <p className="text-gray-400">
            Receita dos últimos dias
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-sm">
            Total
          </p>

          <h3 className="text-3xl font-bold text-yellow-400">
            R$ {total.toFixed(2)}
          </h3>
        </div>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#3f3f46"
            />

            <XAxis
              dataKey="dia"
              stroke="#a1a1aa"
            />

            <YAxis
              stroke="#a1a1aa"
            />

            <Tooltip
             formatter={(value) => [
             `R$ ${Number(value).toFixed(2)}`,
          "Faturamento",
             ]}
/>

            <Line
              type="monotone"
              dataKey="faturamento"
              stroke="#facc15"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
