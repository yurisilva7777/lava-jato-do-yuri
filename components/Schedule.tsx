"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const precos: Record<string, number> = {
  "Lavagem Completa + Pretinho - R$30": 30,
  "Pacote Completo - R$40": 40,
  "Limpeza Interna + Aspiração - R$25": 25,
  "Lavagem de Moto + Pretinho - R$30": 30,
};

export default function Schedule() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");

  const [gorjeta, setGorjeta] = useState(0);

  const agendar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nome ||
      !telefone ||
      !veiculo ||
      !servico ||
      !data ||
      !horario ||
      !formaPagamento
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const q = query(
        collection(db, "agendamentos"),
        where("data", "==", data),
        where("horario", "==", horario)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("❌ Este horário já está ocupado.");
        return;
      }

      const valor = precos[servico] || 0;

      await addDoc(collection(db,"agendamentos"),{

nome,
telefone,
veiculo,

servico,

valor: Number(
  servico.match(/\d+/)?.[0] || 0
),

gorjeta,

data,
horario,

status:"Agendado",

criadoEm:new Date()

});
      alert("✅ Agendamento realizado com sucesso!");

      setNome("");
      setTelefone("");
      setVeiculo("");
      setServico("");
      setData("");
      setHorario("");
      setFormaPagamento("");

    } catch (error) {
      console.error(error);
      alert("Erro ao realizar o agendamento.");
    }
  };

  return (
    <section
      id="agendamento"
      className="bg-black text-white py-20 px-6"
    >
      <div
        className="
          max-w-3xl
          mx-auto
          bg-zinc-900
          rounded-3xl
          border
          border-zinc-800
          shadow-2xl
          p-10
        "
      >

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-3">
          📅 Agende seu Horário
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Escolha o melhor horário para cuidar do seu veículo.
        </p>

        <form
          onSubmit={agendar}
          className="space-y-5"
          
        >


          <input
            type="text"
            placeholder="👤 Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none"
          />

          <input
            type="tel"
            placeholder="📱 WhatsApp"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none"
          />

          <input
            type="text"
            placeholder="🚗 Modelo do veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none"
          />

          <select
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none"
          >
            <option value="">🧽 Escolha um serviço</option>

            <option value="Lavagem Completa + Pretinho - R$30">
              🚗 Lavagem Completa + Pretinho - R$30
            </option>

            <option value="Pacote Completo - R$40">
              ✨ Pacote Completo - R$40
            </option>

            <option value="Limpeza Interna + Aspiração - R$25">
              🧹 Limpeza Interna + Aspiração - R$25
            </option>

            <option value="Lavagem de Moto + Pretinho - R$30">
              🏍️ Lavagem de Moto + Pretinho - R$30
            </option>
          </select>

           <label className="text-yellow-400 font-medium">
            📅 Escolha a data
          </label>

          <input
            type="date"
            value={data}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setData(e.target.value)}
            className="
              w-full
              p-4
              rounded-2xl
              bg-zinc-800
              border
              border-zinc-700
              focus:border-yellow-400
              focus:ring-2
              focus:ring-yellow-400
              outline-none
              transition
            "
          />

          <label className="text-yellow-400 font-medium">
            ⏰ Escolha o horário
          </label>

          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="
              w-full
              p-4
              rounded-2xl
              bg-zinc-800
              border
              border-zinc-700
              focus:border-yellow-400
              focus:ring-2
              focus:ring-yellow-400
              outline-none
              transition
            "
          >
            <option value="">Escolha um horário</option>

            <option value="08:00">🌅 08:00</option>
            <option value="10:00">☀️ 10:00</option>
            <option value="12:00">🕛 12:00</option>
            <option value="14:00">🌤️ 14:00</option>
            <option value="16:00">🌇 16:00</option>
            <option value="18:00">🌙 18:00</option>
          </select>

          <label className="text-yellow-400 font-medium">
            💳 Forma de Pagamento
          </label>
        <label>💰 Gorjeta</label>

<select
className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
  value={gorjeta}
  onChange={(e) => setGorjeta(Number(e.target.value))}
>
  <option value={0}>Sem gorjeta</option>
  <option value={5}>R$ 5</option>
  <option value={10}>R$ 10</option>
  <option value={15}>R$ 15</option>
  <option value={20}>R$ 20</option>
  <option value={25}>R$ 25</option>
  
</select>
          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            className="
              w-full
              p-4
              rounded-2xl
              bg-zinc-800
              border
              border-zinc-700
              focus:border-yellow-400
              focus:ring-2
              focus:ring-yellow-400
              outline-none
              transition
            "
          >
            <option value="">Selecione</option>

            <option value="Dinheiro">
              💵 Dinheiro
            </option>

            <option value="PIX">
              📲 PIX
            </option>

            <option value="Cartão">
              💳 Cartão
            </option>
          </select>

          {servico && (
            <div className="bg-zinc-800 border border-yellow-400 rounded-2xl p-5 text-center">

              <p className="text-gray-400 text-sm">
                Valor do serviço
              </p>

              <h3 className="text-4xl font-bold text-yellow-400 mt-2">
                R$ {(precos[servico] || 0).toFixed(2)}
              </h3>

            </div>
          )}

          <button
            type="submit"
            className="
              w-full
              bg-yellow-400
              text-black
              py-4
              rounded-2xl
              font-bold
              text-lg
              hover:bg-yellow-300
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
            "
          >
            🚗 CONFIRMAR AGENDAMENTO
          </button>

        </form>

      </div>

    </section>
  );
}