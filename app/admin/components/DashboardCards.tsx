"use client";

import {
  FaMoneyBillWave,
  FaCalendarCheck,
  FaCar,
  FaGift,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

interface Props {
  faturamentoHoje: number;
  faturamentoTotal: number;
  gorjetas: number;
  agendamentos: number;
  concluidos: number;
  confirmados: number;
  pendentes: number;
}

function Card({
  titulo,
  valor,
  cor,
  icon,
}: {
  titulo: string;
  valor: string;
  cor: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`
      rounded-3xl
      p-6
      shadow-2xl
      border
      border-zinc-800
      bg-gradient-to-br
      ${cor}
      hover:scale-105
      transition-all
      duration-300
    `}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-300">
            {titulo}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {valor}
          </h2>

        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default function DashboardCards({
  faturamentoHoje,
  faturamentoTotal,
  gorjetas,
  agendamentos,
  concluidos,
  confirmados,
  pendentes,
}: Props) {

  return (

    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

      <Card
        titulo="Hoje"
        valor={`R$ ${faturamentoHoje.toFixed(2)}`}
        cor="from-green-700 to-green-500"
        icon={<FaMoneyBillWave />}
      />

      <Card
        titulo="Total"
        valor={`R$ ${faturamentoTotal.toFixed(2)}`}
        cor="from-blue-700 to-blue-500"
        icon={<FaMoneyBillWave />}
      />

      <Card
        titulo="Gorjetas"
        valor={`R$ ${gorjetas.toFixed(2)}`}
        cor="from-yellow-600 to-orange-500"
        icon={<FaGift />}
      />

      <Card
        titulo="Agendamentos"
        valor={String(agendamentos)}
        cor="from-purple-700 to-purple-500"
        icon={<FaCalendarCheck />}
      />

      <Card
        titulo="Concluídos"
        valor={String(concluidos)}
        cor="from-cyan-700 to-cyan-500"
        icon={<FaCar />}
      />

      <Card
        titulo="Confirmados"
        valor={String(confirmados)}
        cor="from-emerald-700 to-emerald-500"
        icon={<FaCheckCircle />}
      />

      <Card
        titulo="Pendentes"
        valor={String(pendentes)}
        cor="from-red-700 to-red-500"
        icon={<FaClock />}
      />

    </div>

  );

}