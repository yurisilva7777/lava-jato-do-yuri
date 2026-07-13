"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    nome: string;
    quantidade: number;
  }[];
}

const cores = [
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
];

export default function ServicesChart({
  data,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        🏆 Serviços Mais Vendidos
      </h2>

      <div className="h-96">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="quantidade"
              nameKey="nome"
              outerRadius={130}
              label
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={cores[index % cores.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}