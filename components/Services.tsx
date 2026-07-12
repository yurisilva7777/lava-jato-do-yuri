export default function Services() {
  const servicos = [
    {
      icone: "🚗",
      titulo: "Lavagem Completa + Pretinho",
      descricao:
        "Lavagem externa completa com aplicação de pretinho nos pneus para deixar seu veículo com aparência renovada.",
      valor: "R$ 30",
      tempo: "1h30 até 2h",
    },
    {
      icone: "✨",
      titulo: "Pacote Completo",
      descricao:
        "Lavagem completa, aspiração interna, lavagem dos tapetes e aplicação de pretinho para um acabamento premium.",
      valor: "R$ 40",
      tempo: "1h30 até 2h",
    },
    {
      icone: "🧹",
      titulo: "Limpeza Interna + Aspiração",
      descricao:
        "Limpeza completa da parte interna com aspiração dos bancos, carpete e porta-malas. Não inclui lavagem externa.",
      valor: "R$ 25",
      tempo: "45min até 1h",
    },
    {
      icone: "🏍️",
      titulo: "Lavagem de Moto + Pretinho",
      descricao:
        "Lavagem completa da moto com aplicação de pretinho nas partes apropriadas.",
      valor: "R$ 30",
      tempo: "1h30 até 2h",
    },
  ];

  return (
    <section
      id="servicos"
      className="bg-zinc-950 text-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-400">
          🧽 Nossos Serviços
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-14 text-lg">
          Qualidade, cuidado e atenção aos mínimos detalhes.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {servicos.map((servico, index) => (
            <div
              key={index}
              className="
                group
                bg-gradient-to-b
                from-zinc-900
                to-zinc-800
                rounded-3xl
                p-8
                border
                border-zinc-700
                shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-3
                hover:border-yellow-400
                hover:shadow-yellow-500/20
              "
            >
              <div className="text-6xl text-center mb-5 transition-transform duration-300 group-hover:scale-110">
                {servico.icone}
              </div>

              <h3 className="text-2xl font-bold text-center text-yellow-400 min-h-[70px]">
                {servico.titulo}
              </h3>

              <p className="text-gray-300 text-center mt-5 leading-7 min-h-[120px]">
                {servico.descricao}
              </p>

              <div className="mt-6 text-center">

                <p className="text-4xl font-bold text-green-400">
                  {servico.valor}
                </p>

                <div className="mt-5 bg-black/50 rounded-2xl p-4 border border-zinc-700">

                  <p className="text-sm text-gray-400">
                    ⏱️ Tempo aproximado
                  </p>

                  <p className="text-lg font-bold text-white mt-1">
                    {servico.tempo}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}