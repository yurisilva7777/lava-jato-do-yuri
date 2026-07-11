export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-zinc-950 text-white py-20 px-6"
    >
      <h2 className="text-2xl md:text-3xl">
        Nossos Serviços
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition">

          <h3 className="text-2xl md:text-3xl">
            🚗 Lavagem Completa + Pretinho
          </h3>

          <p className="text-4xl md:text-5xl">
            R$ 30
          </p>

          <ul className="mt-8 space-y-3 text-lg">

            <li>✔ Lavagem Completa</li>

            <li>✔ Pretinho nos pneus</li>

          </ul>

        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition">

          <h3 className="text-3xl font-bold text-blue-400">
            ✨ Pacote Completo
          </h3>

          <p className="text-5xl font-bold mt-6 text-yellow-400">
            R$ 40
          </p>

          <ul className="mt-8 space-y-3 text-lg">

            <li>✔ Lavagem Completa</li>

            <li>✔ Aspiração Interna</li>

            <li>✔ Lavagem dos Tapetes</li>

            <li>✔ Pretinho nos Pneus</li>

          </ul>

        </div>

      </div>

    </section>
  );
}