export default function Footer() {
  return (
    <footer
      id="contato"
      className="bg-zinc-950 text-white py-10 mt-20 border-t border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-yellow-400">
          Lava Jato do Yuri
        </h2>

        <p className="mt-4 text-gray-400">
          Seu carro merece um cuidado especial.
        </p>

        <div className="mt-6 space-y-2">
          <a
  href="https://maps.google.com/?q=Rua+Alberto+Belintani,+500,+Jardim+Flamboyant,+Paulínia,+SP"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-blue-400 hover:underline"
> 
          <p>📍  Rua Alberto Belintani, Nº 500<br />
    Jardim Flamboyant - Paulínia/SP</p>
  </a>
          <a
            href="https://wa.me/5519988010459"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-green-400 hover:underline"
          >
            📞 WhatsApp: (19) 98801-0459
          </a>

          <p>💳 PIX • Dinheiro • Cartão</p>
          <p>🕗 Atendimento: 08:00 às 18:00</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          © 2026 Lava Jato do Yuri. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}