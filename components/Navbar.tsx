"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-xl md:text-2xl font-bold text-yellow-400">
          🚗 Lava Jato do Yuri
        </h1>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li><a href="#inicio" className="hover:text-yellow-400">Início</a></li>
          <li><a href="#servicos" className="hover:text-yellow-400">Serviços</a></li>
          <li><a href="#agendamento" className="hover:text-yellow-400">Agendamento</a></li>
          <li><a href="#contato" className="hover:text-yellow-400">Contato</a></li>
        </ul>

        {/* Botão Mobile */}
        <button
  className="md:hidden text-3xl"
  onClick={() => {
    console.log("Clique!");
    setMenuAberto(!menuAberto);
  }}
>
  ☰
</button>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-zinc-900">
          <a
            href="#inicio"
            className="block p-4 border-b border-zinc-800"
            onClick={() => setMenuAberto(false)}
          >
            Início
          </a>

          <a
            href="#servicos"
            className="block p-4 border-b border-zinc-800"
            onClick={() => setMenuAberto(false)}
          >
            Serviços
          </a>

          <a
            href="#agendamento"
            className="block p-4 border-b border-zinc-800"
            onClick={() => setMenuAberto(false)}
          >
            Agendamento
          </a>

          <a
            href="#contato"
            className="block p-4"
            onClick={() => setMenuAberto(false)}
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  );
}