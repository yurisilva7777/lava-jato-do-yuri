export interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  veiculo: string;
  servico: string;
  valor: number;
  gorjeta: number;
  data: string;
  horario: string;
  status: string;
}


export function calcularStats(
  agendamentos: Agendamento[]
) {

  const hoje = new Date()
    .toLocaleDateString("pt-BR")
    .split("/")
    .reverse()
    .join("-");


  const concluidosLista = agendamentos.filter(
    (a) => a.status === "Concluído"
  );


  const hojeLista = concluidosLista.filter(
    (a) => a.data === hoje
  );


  const faturamentoHoje = hojeLista.reduce(
    (total, a) =>
      total + (a.valor || 0),
    0
  );


  const gorjetasHoje = hojeLista.reduce(
    (total, a) =>
      total + (a.gorjeta || 0),
    0
  );


  const faturamentoTotal = concluidosLista.reduce(
    (total, a) =>
      total +
      (a.valor || 0) +
      (a.gorjeta || 0),
    0
  );


  const concluidos =
    concluidosLista.length;


  const confirmados =
    agendamentos.filter(
      (a)=>a.status==="Confirmado"
    ).length;


  const pendentes =
    agendamentos.filter(
      (a)=>a.status==="Agendado"
    ).length;


  const cancelados =
    agendamentos.filter(
      (a)=>a.status==="Cancelado"
    ).length;



  const servicos: Record<string, number>={};


  agendamentos.forEach((a)=>{

    if(a.servico){

      servicos[a.servico] =
        (servicos[a.servico] || 0)+1;

    }

  });



  const servicosMaisVendidos =
    Object.entries(servicos)
    .map(([nome,quantidade])=>({
      nome,
      quantidade
    }))
    .sort(
      (a,b)=>b.quantidade-a.quantidade
    );



  return {

    faturamentoHoje,

    gorjetasHoje,

    faturamentoTotal,

    concluidos,

    confirmados,

    pendentes,

    cancelados,

    servicosMaisVendidos

  };

}