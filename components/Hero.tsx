export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-black to-zinc-900 px-6"
    >
      <h1 className="text-6xl font-extrabold text-yellow-400">
        LAVA JATO DO YURI
      </h1>

      <p className="mt-6 text-2xl text-gray-300">
        Seu carro merece um cuidado especial!
      </p>

      <p className="mt-4 max-w-2xl text-gray-400">
        Lavagem completa, aspiração, lavagem dos tapetes e pretinho,
        tudo com qualidade, cuidado e preço justo.
      </p>

      <a
        href="#agendamento"
        className="mt-10 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition"
      >
        AGENDAR AGORA
      </a>
    </section>
  );
}