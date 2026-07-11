export default function Services() {
  const servicos = [
    {
      icone: "🚗",
      titulo: "Lavagem Completa + Pretinho",
      descricao:
        "Lavagem externa completa com aplicação de pretinho nos pneus para deixar seu veículo renovado.",
      valor: "R$ 30",
    },
    {
      icone: "✨",
      titulo:
        "Lavagem Completa + Aspirar + Tapetes + Pretinho",
      descricao:
        "Serviço completo com limpeza interna, aspiração, lavagem dos tapetes e acabamento premium.",
      valor: "R$ 40",
    },
    {
      icone: "🏍️",
      titulo: "Lavagem de Moto + Pretinho",
      descricao:
        "Lavagem completa da moto com cuidado nos detalhes e aplicação de pretinho.",
      valor: "R$ 30",
    },
  ];

  return (
    <section
      id="servicos"
      className="bg-zinc-950 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-12">
          🧽 Nossos Serviços
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {servicos.map((servico, index) => (
            <div
              key={index}
              className="
              bg-zinc-900
              rounded-3xl
              p-8
              shadow-2xl
              border
              border-zinc-800
              hover:border-yellow-400
              hover:scale-105
              transition-all
              duration-300
              "
            >

              <div className="text-6xl text-center mb-5">
                {servico.icone}
              </div>


              <h3 className="
                text-2xl
                font-bold
                text-center
                text-yellow-400
              ">
                {servico.titulo}
              </h3>


              <p className="
                text-center
                text-gray-300
                mt-5
                leading-relaxed
              ">
                {servico.descricao}
              </p>


              <p className="
                text-center
                text-4xl
                font-bold
                text-green-400
                mt-6
              ">
                {servico.valor}
              </p>


              <div className="
                mt-5
                text-center
                bg-black
                rounded-xl
                p-3
              ">
                ⏱️ Tempo de serviço:
                <br />
                <span className="font-bold text-white">
                  1h30 até 2h
                </span>
              </div>


            </div>
          ))}

        </div>

      </div>
    </section>
  );
}