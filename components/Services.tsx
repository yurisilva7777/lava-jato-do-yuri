export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-zinc-950 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Nossos Serviços
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Serviço 1 */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-6xl text-center mb-4">🚗</div>

            <h3 className="text-2xl font-bold text-center text-yellow-400">
              Lavagem Completa + Pretinho
            </h3>

            <p className="text-center text-gray-300 mt-4">
              Lavagem externa completa com aplicação de pretinho nos pneus.
            </p>

            <p className="text-center text-4xl font-bold text-green-400 mt-6">
              R$ 30
            </p>
          </div>

          {/* Serviço 2 */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-6xl text-center mb-4">✨</div>

            <h3 className="text-2xl font-bold text-center text-yellow-400">
              Pacote Completo
            </h3>

            <p className="text-center text-gray-300 mt-4">
              Lavagem completa, aspiração interna, lavagem dos tapetes e
              aplicação de pretinho.
            </p>

            <p className="text-center text-4xl font-bold text-green-400 mt-6">
              R$ 40
            </p>
          </div>

          {/* Serviço 3 */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-6xl text-center mb-4">🏍️</div>

            <h3 className="text-2xl font-bold text-center text-yellow-400">
              Lavagem de Moto + Pretinho
            </h3>

            <p className="text-center text-gray-300 mt-4">
              Lavagem completa da moto com aplicação de pretinho nas partes
              apropriadas.
            </p>

            <p className="text-center text-4xl font-bold text-green-400 mt-6">
              R$ 30
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}