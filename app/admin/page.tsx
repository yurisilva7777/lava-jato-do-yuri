"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  veiculo: string;
  servico: string;
  data: string;
  horario: string;
  status: string;
}

export default function Admin() {
  const router = useRouter();

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        buscarAgendamentos();
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function buscarAgendamentos() {
    try {
      const snapshot = await getDocs(collection(db, "agendamentos"));

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Agendamento, "id">),
      }));

      setAgendamentos(lista);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar os agendamentos.");
    }
  }

  async function atualizarStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, "agendamentos", id), {
        status,
      });

      buscarAgendamentos();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o status.");
    }
  }

  async function excluirAgendamento(id: string) {
    const confirmar = confirm(
      "Deseja realmente excluir este agendamento?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "agendamentos", id));

      alert("Agendamento excluído com sucesso!");

      buscarAgendamentos();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o agendamento.");
    }
  }

  async function sair() {
    await signOut(auth);
    router.push("/login");
  }

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Carregando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-8">
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

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-700">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Veículo</th>
              <th className="p-3">Serviço</th>
              <th className="p-3">Data</th>
              <th className="p-3">Horário</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {agendamentos.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-400"
                >
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            ) : (
              agendamentos.map((agendamento) => (
                <tr
                  key={agendamento.id}
                  className="border-t border-zinc-700 text-center"
                >
                  <td className="p-3">{agendamento.nome}</td>
                  <td className="p-3">{agendamento.telefone}</td>
                  <td className="p-3">{agendamento.veiculo}</td>
                  <td className="p-3">{agendamento.servico}</td>
                  <td className="p-3">{agendamento.data}</td>
                  <td className="p-3">{agendamento.horario}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        agendamento.status === "Confirmado"
                          ? "bg-green-600"
                          : agendamento.status === "Concluído"
                          ? "bg-blue-600"
                          : agendamento.status === "Cancelado"
                          ? "bg-red-600"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {agendamento.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap justify-center gap-2">

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
                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg"
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