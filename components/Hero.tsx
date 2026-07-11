export default function Hero() {
  return (
    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      bg-black
      text-white
      px-6
      "
    >

      {/* Brilho de fundo */}
      <div className="
        absolute
        w-96
        h-96
        bg-yellow-400
        opacity-20
        rounded-full
        blur-3xl
        animate-pulse
      "></div>


      <div className="
        relative
        z-10
        max-w-6xl
        grid
        md:grid-cols-2
        items-center
        gap-10
      ">


        {/* Texto */}
        <div className="text-center md:text-left">

          <h1 className="
            text-5xl
            md:text-7xl
            font-bold
            text-yellow-400
            mb-6
          ">
            Lava Jato do Yuri 🚗
          </h1>


          <p className="
            text-xl
            md:text-2xl
            text-gray-300
            mb-8
          ">
            Seu veículo limpo, brilhando e cuidado nos mínimos detalhes.
          </p>


          <p className="
            text-gray-400
            mb-8
          ">
            ✨ Lavagem profissional <br />
            ⏱️ Atendimento de 1h30 até 2h <br />
            📅 Trabalhamos com agendamento
          </p>


          <a
            href="https://wa.me/5519988010459"
            target="_blank"
            className="
              inline-block
              bg-yellow-400
              text-black
              font-bold
              px-10
              py-4
              rounded-full
              hover:scale-110
              transition
              duration-300
              shadow-lg
            "
          >
            📲 Agendar agora
          </a>

        </div>


        {/* Imagem do carro */}
        <div className="
          flex
          justify-center
          animate-bounce
          [animation-duration:3s]
        ">

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="Carro brilhando"
            className="
              rounded-3xl
              shadow-2xl
              w-full
              max-w-lg
              border
              border-yellow-400
            "
          />

        </div>


      </div>

    </section>
  );
}