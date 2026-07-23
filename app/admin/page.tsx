"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ServicesChart from "./components/ServicesChart";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  FaCheck,
  FaCheckDouble,
  FaTrash,
  FaWhatsapp,
  FaBell,
  FaTimes,
} from "react-icons/fa";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FaCheckCircle, FaCar, FaMoneyBillWave } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { db, auth } from "../../firebase/firebase";

import DashboardCards from "./components/DashboardCards";
import RevenueChart from "./components/RevenueChart";

interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  veiculo: string;
  servico: string;
  valor?: number;
  formaPagamento?: string;
  gorjeta?: number;
  data: string;
  horario: string;
  status: string;
}

export default function Admin() {

  const router = useRouter();

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
const [carregando, setCarregando] = useState(true);

const [pesquisa, setPesquisa] = useState("");
const [filtroStatus, setFiltroStatus] = useState("Todos");
useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    console.log("Usuário Firebase:", user);

    if (!user) {

      router.push("/login");
      setCarregando(false);
      return;

    }

    try {

      await buscarAgendamentos();

    } catch(error) {

      console.log("Erro Firebase:", error);

    } finally {

      setCarregando(false);

    }

  });


  return () => unsubscribe();

}, [router]);

  async function buscarAgendamentos() {

    const snapshot = await getDocs(collection(db, "agendamentos"));

   const lista = snapshot.docs.map((documento) => {
  const data = documento.data();

 return {
  id: documento.id,
  nome: data.nome || "",
  telefone: data.telefone || "",
  veiculo: data.veiculo || "",
  servico: data.servico || "",
  valor: Number(data.valor || 0),
   formaPagamento: data.formaPagamento || "",
  gorjeta: Number(data.gorjeta || 0),
  data: data.data || "",
  horario: data.horario || "",
  status: data.status || "",
};
});

console.log(lista);

    setAgendamentos(lista);

  }

  async function atualizarStatus(id: string, status: string) {

    await updateDoc(doc(db, "agendamentos", id), {
      status,
    });

    buscarAgendamentos();

  }

  async function excluirAgendamento(id: string) {

    if (!confirm("Deseja excluir este agendamento?")) return;

    await deleteDoc(doc(db, "agendamentos", id));

    buscarAgendamentos();

  }
function enviarWhatsApp(agendamento: Agendamento) {
  const telefone = agendamento.telefone.replace(/\D/g, "");

  const total =
Number(agendamento.valor || 0) +
Number(agendamento.gorjeta || 0);
  const mensagem = `Olá ${agendamento.nome}! 👋

Seu veículo *${agendamento.veiculo}* já está pronto! 🚗✨

🧽 Serviço:
${agendamento.servico}

💰 Valor: R$ ${total.toFixed(2)}

Obrigado pela preferência!

Lava Jato do Yuri 🚗`;

  const url =
    `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
function enviarLembrete(agendamento: Agendamento) {
  const telefone = agendamento.telefone.replace(/\D/g, "");

  const mensagem = `🚗 Olá, ${agendamento.nome}!

Seu agendamento na Lava Jato do Yuri está se aproximando.

📅 Data: ${agendamento.data}
🕒 Horário: ${agendamento.horario}
🧽 Serviço: ${agendamento.servico}

📍 Assim que chegar ao lava jato, envie uma mensagem avisando sua chegada para organizarmos seu atendimento.

Obrigado pela preferência! 😊`;

  const url =
    `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
  async function sair() {

    await signOut(auth);

    router.push("/login");

  }

 const faturamentoHoje = useMemo(() => {

  const hoje = new Date().toISOString().split("T")[0];

  return agendamentos
    .filter(
      a =>
        a.status === "Concluído" &&
        a.data === hoje
    )
    .reduce(
      (total, item) =>
        total +
        (item.valor || 0) +
        (item.gorjeta || 0),
      0
    );

}, [agendamentos]);
const faturamentoTotal = agendamentos
  .filter(a => a.status === "Concluído")
  .reduce(
    (total, item) =>
      total +
      (item.valor || 0) +
      (item.gorjeta || 0),
    0
  );

const pendentes = agendamentos.filter(
  a => a.status === "Agendado"
).length;

const confirmados = agendamentos.filter(
  a => a.status === "Confirmado"
).length;

const gorjetas = useMemo(() => {
  return agendamentos
    .filter((a) => a.status === "Concluído")
    .reduce(
      (total, item) => total + (item.gorjeta || 0),
      0
    );
}, [agendamentos]);

  const concluidos = useMemo(() => {

    return agendamentos.filter(
      (a) => a.status === "Concluído"
    ).length;

  }, [agendamentos]);
const agendamentosFiltrados = agendamentos.filter((agendamento) => {

  const encontrou =
    agendamento.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase()) ||

    agendamento.telefone.includes(pesquisa);

  const statusOk =
    filtroStatus === "Todos" ||
    agendamento.status === filtroStatus;

  return encontrou && statusOk;

});
const dadosGrafico = useMemo(() => {

  const dias = [
    { dia: "Dom", faturamento: 0 },
    { dia: "Seg", faturamento: 0 },
    { dia: "Ter", faturamento: 0 },
    { dia: "Qua", faturamento: 0 },
    { dia: "Qui", faturamento: 0 },
    { dia: "Sex", faturamento: 0 },
    { dia: "Sáb", faturamento: 0 },
  ];

  agendamentos
    .filter((a) => a.status === "Concluído")
    .forEach((agendamento) => {

      const data = new Date(agendamento.data);

      if (isNaN(data.getTime())) return;

      const indice = data.getDay();

      dias[indice].faturamento +=
        (agendamento.valor || 0) +
        (agendamento.gorjeta || 0);

    });

  return [
    dias[1],
    dias[2],
    dias[3],
    dias[4],
    dias[5],
    dias[6],
    dias[0],
  ];

}, [agendamentos]);
console.log(agendamentos);
  if (carregando) {
const enviarLembrete = (agendamento: Agendamento) => {
  const telefone = agendamento.telefone.replace(/\D/g, "");

  const mensagem = `🚗 Olá, ${agendamento.nome}!

Seu agendamento está se aproximando.

📅 Data: ${agendamento.data}
🕒 Horário: ${agendamento.horario}
🚙 Serviço: ${agendamento.servico}

Quando chegar ao lava jato, envie uma mensagem avisando sua chegada para iniciarmos seu atendimento rapidamente.

Agradecemos a preferência! 😊`;

  window.open(
    `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
};
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando...
      </main>
    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-yellow-400">
          Painel Administrativo
        </h1>

        <button
          onClick={sair}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Sair
        </button>

      </div>
<DashboardCards
  faturamentoHoje={faturamentoHoje}
  faturamentoTotal={faturamentoTotal}
  gorjetas={gorjetas}
  agendamentos={agendamentos.length}
  concluidos={concluidos}
  confirmados={confirmados}
  pendentes={pendentes}
/>

      <RevenueChart data={dadosGrafico} />

<div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">

  <input
    type="text"
    placeholder="🔍 Pesquisar cliente..."
    value={pesquisa}
    onChange={(e)=>setPesquisa(e.target.value)}
    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3"
  />

  <select
    value={filtroStatus}
    onChange={(e)=>setFiltroStatus(e.target.value)}
    className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
  >
    <option>Todos</option>
    <option>Agendado</option>
    <option>Confirmado</option>
    <option>Concluído</option>
    <option>Cancelado</option>
  </select>

</div>

<div className="mt-10 overflow-x-auto rounded-xl border border-zinc-800">
<table className="w-full text-sm">
          <thead className="bg-zinc-900 text-white sticky top-0">
  <tr>
  <th className="p-4 text-left">Cliente</th>
<th className="p-4 text-center">Telefone</th>
<th className="p-4 text-center">Veículo</th>
<th className="p-4 text-left">Serviço</th>
<th className="p-4 text-right">Valor</th>
<th className="p-4 text-center">Gorjeta</th>
<th className="p-4 text-center">Forma de Pagamento</th>
<th className="p-4 text-center">Data</th>
<th className="p-4 text-center">Horário</th>
<th className="p-4 text-center">Status</th>
<th className="p-4 text-center">Ações</th>
  </tr>
</thead>

          <tbody>

            {agendamentosFiltrados.length === 0 ? (

              <tr>

                <td
                 colSpan={11}
                  className="text-center p-10 text-zinc-400"
                >
                  Nenhum agendamento encontrado.
                </td>

              </tr>
              
            ) : (

              agendamentosFiltrados.map((agendamento) => (

                <tr
                  key={agendamento.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                >
                  <td className="p-4">
  {agendamento.nome}
</td>

<td className="p-4">
  {agendamento.telefone}
</td>

<td className="p-4">
  {agendamento.veiculo}
</td>

<td className="p-4">
  {agendamento.servico}
</td>

<td className="p-4 text-green-400 font-bold">
  R$ {Number(agendamento.valor || 0).toFixed(2)}
</td>

<td className="p-4 text-center text-yellow-400 font-bold">
  R$ {Number(agendamento.gorjeta || 0).toFixed(2)}
</td>

<td className="p-4 text-center">
  <span className="px-3 py-1 rounded-full bg-gray-700 text-white text-sm">
    {agendamento.formaPagamento || "Não informado"}
  </span>
</td>

<td className="p-4 text-center">
  {agendamento.data}
</td>

<td className="p-4 text-center">
  {agendamento.horario}
</td>

<td className="p-4 text-center">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold
      ${
        agendamento.status === "Agendado"
          ? "bg-yellow-500 text-black"
          : agendamento.status === "Confirmado"
          ? "bg-green-600 text-white"
          : agendamento.status === "Concluído"
          ? "bg-blue-600 text-white"
          : "bg-red-600 text-white"
      }
    `}
  >
    {agendamento.status}
  </span>
</td>



                  <td className="p-4">

<div className="flex items-center gap-2">

  {/* Confirmar */}
  <button
    onClick={() => atualizarStatus(agendamento.id, "Confirmado")}
    className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition flex items-center justify-center"
    title="Confirmar Agendamento"
  >
    <FaCheck className="text-white" />
  </button>

  {/* Concluir */}
  <button
    onClick={() => atualizarStatus(agendamento.id, "Concluído")}
    className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
    title="Concluir Serviço"
  >
    <FaCheckDouble className="text-white" />
  </button>

  {/* Cancelar */}
  <button
    onClick={() => atualizarStatus(agendamento.id, "Cancelado")}
    className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center"
    title="Cancelar Agendamento"
  >
    <FaTimes className="text-white" />
  </button>

  {/* Excluir */}
  <button
    onClick={() => excluirAgendamento(agendamento.id)}
    className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 transition flex items-center justify-center"
    title="Excluir Agendamento"
  >
    <FaTrash className="text-white" />
  </button>

  {/* Veículo pronto */}
  <button
    onClick={() => enviarWhatsApp(agendamento)}
    className="w-10 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 transition flex items-center justify-center"
    title="Avisar que o veículo está pronto"
  >
    <FaWhatsapp className="text-white" />
  </button>

  {/* Lembrete */}
  <button
    onClick={() => enviarLembrete(agendamento)}
    className="w-10 h-10 rounded-xl bg-green-600 hover:bg-green-700 transition flex items-center justify-center"
    title="Enviar lembrete do agendamento"
  >
    <FaBell className="text-white" />
  </button>

</div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>

  );
}