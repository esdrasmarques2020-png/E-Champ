const WHATSAPP_ECHAMP = "5512996879640";

// Dados demonstrativos. As datas e vagas podem ser ajustadas para cada competição.
const campeonatos = [
  { id: 1, nome: "Copa eChamp Paulista", modalidade: "Futebol", equipes: 16, formato: "Mata-mata", status: "andamento", statusTexto: "Em andamento", vagasDisponiveis: 0, inscricaoAte: "2026-10-30", whatsapp: WHATSAPP_ECHAMP },
  { id: 2, nome: "eChamp Arena Cup", modalidade: "Futsal", equipes: 12, formato: "Grupos + mata-mata", status: "inscricoes", statusTexto: "Inscrições abertas", vagasDisponiveis: 4, inscricaoAte: "2026-12-15", whatsapp: WHATSAPP_ECHAMP },
  { id: 3, nome: "Desafio eChamp Open", modalidade: "Vôlei", equipes: 8, formato: "Pontos corridos", status: "esgotado", statusTexto: "Vagas esgotadas", vagasDisponiveis: 0, inscricaoAte: "2026-12-20", whatsapp: WHATSAPP_ECHAMP },
  { id: 4, nome: "Copa dos Campeões", modalidade: "Futebol", equipes: 16, formato: "Mata-mata", status: "encerrado", statusTexto: "Encerrado", vagasDisponiveis: 0, inscricaoAte: "2026-10-01", whatsapp: WHATSAPP_ECHAMP },
  { id: 5, nome: "eChamp Junior", modalidade: "Futebol", equipes: 10, formato: "Grupos", status: "andamento", statusTexto: "Em andamento", vagasDisponiveis: 0, inscricaoAte: "2026-10-15", whatsapp: WHATSAPP_ECHAMP },
  { id: 6, nome: "Liga eChamp 2026", modalidade: "Futsal", equipes: 14, formato: "Pontos corridos", status: "andamento", statusTexto: "Em andamento", vagasDisponiveis: 0, inscricaoAte: "2026-10-10", whatsapp: WHATSAPP_ECHAMP }
];

const lista = document.getElementById("listaCampeonatos");
const busca = document.getElementById("busca");
const statusFiltro = document.getElementById("status");
const resultado = document.getElementById("resultadoBusca");
const vazio = document.getElementById("vazio");
const limparFiltros = document.getElementById("limparFiltros");

function obterSituacao(c) {
  const prazoEncerrado = c.inscricaoAte && new Date(c.inscricaoAte + "T23:59:59") < new Date();
  if (c.vagasDisponiveis <= 0 && c.status === "esgotado") return { fechado: true, texto: "Vagas esgotadas", filtro: "esgotado" };
  if (prazoEncerrado || c.status === "encerrado") return { fechado: true, texto: "Inscrições encerradas", filtro: "encerrado" };
  if (c.status === "andamento") return { fechado: true, texto: "Em andamento", filtro: "andamento" };
  return { fechado: false, texto: "Inscrições abertas", filtro: "inscricoes" };
}

function renderizar() {
  const termo = busca.value.toLowerCase().trim();
  const filtroStatus = statusFiltro.value;
  const filtrados = campeonatos.filter(c => {
    const situacao = obterSituacao(c);
    const combinaTexto = c.nome.toLowerCase().includes(termo) || c.modalidade.toLowerCase().includes(termo);
    const combinaStatus = filtroStatus === "todos" || situacao.filtro === filtroStatus;
    return combinaTexto && combinaStatus;
  });

  lista.innerHTML = filtrados.map(c => {
    const situacao = obterSituacao(c);
    return `
      <article class="card ${situacao.fechado ? 'card-indisponivel' : ''}">
        <div class="card-top"><h2>🏆 ${c.nome}</h2><span class="status ${situacao.fechado ? 'status-fechado' : ''}">${situacao.texto}</span></div>
        <p>${c.modalidade} • competição organizada pelo eChamp.</p>
        <div class="dados">
          <div class="dado"><small>Equipes</small><strong>${c.equipes}</strong></div>
          <div class="dado"><small>Formato</small><strong>${c.formato}</strong></div>
        </div>
        <a class="ver ${situacao.fechado ? 'ver-indisponivel' : ''}" href="detalhe-campeonato.html?id=${c.id}">${situacao.fechado ? 'Consultar detalhes →' : 'Ver campeonato →'}</a>
      </article>`;
  }).join("");

  resultado.textContent = `${filtrados.length} campeonato(s) encontrado(s). Os cards em cinza não aceitam novas inscrições.`;
  vazio.hidden = filtrados.length !== 0;
}

busca.addEventListener("input", renderizar);
statusFiltro.addEventListener("change", renderizar);
limparFiltros.addEventListener("click", () => { busca.value = ""; statusFiltro.value = "todos"; renderizar(); });
renderizar();
