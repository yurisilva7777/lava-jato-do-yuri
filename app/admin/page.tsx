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
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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
  gorjeta?: number;
  formaPagamento?: string;
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

    const lista = snapshot.docs.map((documento)=>{

const data = documento.data();

return {
id: documento.id,
nome:data.nome || "",
telefone:data.telefone || "",
veiculo:data.veiculo || "",
servico:data.servico || "",
valor:Number(data.valor || 0),
gorjeta:Number(data.gorjeta || 0),
formaPagamento:data.formaPagamento || "",
data:data.data || "",
horario:data.horario || "",
status:data.status || "Agendado"
}

});

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

  const gorjetasHoje = useMemo(() => {

    const hoje = new Date().toISOString().split("T")[0];

    return agendamentos
      .filter(
        (a) =>
          a.data === hoje &&
          a.status === "Concluído"
      )
      .reduce(
        (acc, item) =>
          acc + (item.gorjeta || 0),
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

  if (carregando) {

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
  gorjetas={gorjetasHoje}
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

<div className="mt-10 overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4">Cliente</th>

              <th className="p-4">Telefone</th>

              <th className="p-4">Veículo</th>

              <th className="p-4">Serviço</th>

              <th className="p-4">Valor</th>

              <th className="p-4">Data</th>

              <th className="p-4">Horário</th>

              <th className="p-4">Status</th>

              <th className="p-4">Ações</th>

            </tr>

          </thead>

          <tbody>

            {agendamentosFiltrados.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
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

                  <td className="p-4">
                    {agendamento.data}
                  </td>

                  <td className="p-4">
                    {agendamento.horario}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold

                      ${
                        agendamento.status === "Agendado"
                          ? "bg-yellow-500 text-black"
                          : agendamento.status === "Confirmado"
                          ? "bg-green-600"
                          : agendamento.status === "Concluído"
                          ? "bg-blue-600"
                          : "bg-red-600"
                      }

                      `}
                    >

                      {agendamento.status}

                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          atualizarStatus(
                            agendamento.id,
                            "Confirmado"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
                      >
                        ✅
                      </button>

                      <button
                        onClick={() =>
                          atualizarStatus(
                            agendamento.id,
                            "Concluído"
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
                      >
                        ✔️
                      </button>
                                            <button
                        onClick={() =>
                          atualizarStatus(
                            agendamento.id,
                            "Cancelado"
                          )
                        }
                        className="bg-orange-600 hover:bg-orange-700" px-3 py-2 
                      >
                        ❌
                      </button>

                      <button
                        onClick={() =>
                          excluirAgendamento(
                            agendamento.id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                      >
                        🗑️
                      </button>
                      <button
  onClick={() => enviarWhatsApp(agendamento)}
  className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
  title="Enviar WhatsApp"
>
  📱
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