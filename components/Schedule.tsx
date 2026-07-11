
"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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

  console.log({
    nome,
    telefone,
    veiculo,
    servico,
    data,
    horario,
  });

  try {
    const docRef = await addDoc(collection(db, "agendamentos"), {
      nome,
      telefone,
      veiculo,
      servico,
      data,
      horario,
      status: "Agendado",
    });

    console.log("Documento criado:", docRef.id);

    alert("Agendamento realizado com sucesso!");
setNome("");
setTelefone("");
setVeiculo("");
setServico("");
setData("");
setHorario("");
  } catch (error) {
    console.error("Erro Firebase:", error);
    alert("Erro ao realizar o agendamento.");
  }
};

  return (
    <section
      id="agendamento"
      className="bg-black text-white py-20 px-6"
    >
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Agende seu Horário
        </h2>

        <form onSubmit={agendar} className="space-y-6">

          <input
         type="text"
         placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-4 rounded-xl bg-zinc-800"
/>
          <input
  type="tel"
  placeholder="WhatsApp"
  value={telefone}
  onChange={(e) => setTelefone(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800"
/>
         <input
  type="text"
  placeholder="Modelo do veículo"
  value={veiculo}
  onChange={(e) => setVeiculo(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800"
/>

          <select
  value={servico}
  onChange={(e) => setServico(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800"
>
  <option value="">Escolha um serviço</option>
  <option value="Lavagem Completa + Pretinho">
    Lavagem Completa + Pretinho - R$30
  </option>
  <option value="Pacote Completo">
    Pacote Completo - R$40
  </option>
</select>
<label className="block text-sm font-medium mb-2">
  Escolha a data
</label>
         <input
  type="date"
  value={data}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setData(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800"
/>

          <select
  value={horario}
  onChange={(e) => setHorario(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800"
>
  <option value="">Escolha um horário</option>
  <option value="08:00">08:00</option>
  <option value="10:00">10:00</option>
  <option value="12:00">12:00</option>
  <option value="14:00">14:00</option>
  <option value="16:00">16:00</option>
  <option value="18:00">18:00</option>
</select>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            AGENDAR
          </button>

        </form>

      </div>
    </section>
  );
}