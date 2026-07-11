"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  async function entrar(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);

      router.push("/admin");
    } catch {
      alert("E-mail ou senha inválidos.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={entrar}
        className="bg-zinc-900 p-8 rounded-2xl w-96 space-y-5"
      >
        <h1 className="text-3xl text-yellow-400 font-bold text-center">
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}