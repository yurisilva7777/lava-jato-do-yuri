"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Schedule() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const agendar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !telefone || !veiculo || !servico || !data || !horario) {
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
        alert("❌ Este horário já está ocupado. Escolha outro.");
        return;
      }

      await addDoc(collection(db, "agendamentos"), {
        nome,
        telefone,
        veiculo,
        servico,
        data,
        horario,
        status: "Agendado",
        criadoEm: new Date(),
      });

      alert("✅ Agendamento realizado com sucesso!");

      setNome("");
      setTelefone("");
      setVeiculo("");
      setServico("");
      setData("");
      setHorario("");

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
        p-8
        md:p-10
        rounded-3xl
        shadow-2xl
        border
        border-zinc-800
        "
      >

        <h2 className="
          text-4xl
          font-bold
          text-center
          text-yellow-400
          mb-3
        ">
          📅 Agende seu Horário
        </h2>

        <p className="
          text-center
          text-gray-400
          mb-8
        ">
          Escolha o melhor dia e horário para cuidar do seu veículo.
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
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-yellow-400
            outline-none
            "
          />


          <input
            type="tel"
            placeholder="📱 WhatsApp"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-yellow-400
            outline-none
            "
          />


          <input
            type="text"
            placeholder="🚗 Modelo do veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-yellow-400
            outline-none
            "
          />


          <select
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-yellow-400
            outline-none
            "
          >

            <option value="">
              🧽 Escolha um serviço
            </option>

            <option value="Lavagem Completa + Pretinho - R$35">
              🚗 Lavagem Completa + Pretinho - R$35
            </option>

            <option value="Pacote Completo - R$40">
              ✨ Pacote Completo - R$40
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
            outline-none
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
            outline-none
            "
          >

            <option value="">
              Escolha um horário
            </option>

            <option value="08:00">🌅 08:00</option>
            <option value="10:00">☀️ 10:00</option>
            <option value="12:00">🕛 12:00</option>
            <option value="14:00">🌤️ 14:00</option>
            <option value="16:00">🌇 16:00</option>
            <option value="18:00">🌙 18:00</option>

          </select>



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
            transition
            duration-300
            "
          >
            🚗 CONFIRMAR AGENDAMENTO
          </button>


        </form>

      </div>

    </section>
  );
}