const WHATSAPP_PADRAO = "5512996879640";
const campeonatos = [
  { id:1, nome:"Copa eChamp Paulista", modalidade:"Futebol", equipes:16, formato:"Mata-mata", status:"Em andamento", temporada:"2026", vagasDisponiveis:0, inscricaoAte:"2026-10-30", whatsapp:WHATSAPP_PADRAO, descricao:"Uma competição estadual com confrontos eliminatórios e 16 equipes em busca do título.", sobre:"A Copa eChamp Paulista reúne equipes de futebol em uma disputa organizada em formato mata-mata.", info:["16 equipes participantes","Confrontos eliminatórios","Inscrições encerradas"] },
  { id:2, nome:"eChamp Arena Cup", modalidade:"Futsal", equipes:12, formato:"Grupos + mata-mata", status:"Inscrições abertas", temporada:"2026", vagasDisponiveis:4, inscricaoAte:"2026-12-15", whatsapp:WHATSAPP_PADRAO, descricao:"Torneio de futsal com fase de grupos e confrontos eliminatórios.", sobre:"A eChamp Arena Cup reúne equipes de futsal em uma competição dinâmica, com primeira fase em grupos e etapa final eliminatória.", info:["12 equipes previstas","Fase de grupos + mata-mata","Inscrições abertas"] },
  { id:3, nome:"Desafio eChamp Open", modalidade:"Vôlei", equipes:8, formato:"Pontos corridos", status:"Vagas esgotadas", temporada:"2026", vagasDisponiveis:0, inscricaoAte:"2026-12-20", whatsapp:WHATSAPP_PADRAO, descricao:"Competição de vôlei em pontos corridos para oito equipes.", sobre:"O Desafio eChamp Open organiza a disputa entre equipes de vôlei em sistema de pontos corridos.", info:["8 equipes previstas","Sistema de pontos corridos","Vagas esgotadas"] },
  { id:4, nome:"Copa dos Campeões", modalidade:"Futebol", equipes:16, formato:"Mata-mata", status:"Encerrado", temporada:"2026", vagasDisponiveis:0, inscricaoAte:"2026-10-01", whatsapp:WHATSAPP_PADRAO, descricao:"Copa eliminatória já concluída, com histórico disponível para consulta.", sobre:"A Copa dos Campeões reuniu 16 equipes de futebol em confrontos eliminatórios. A competição está encerrada.", info:["16 equipes participantes","Formato mata-mata","Competição encerrada"] },
  { id:5, nome:"eChamp Junior", modalidade:"Futebol", equipes:10, formato:"Grupos", status:"Em andamento", temporada:"2026", vagasDisponiveis:0, inscricaoAte:"2026-10-15", whatsapp:WHATSAPP_PADRAO, descricao:"Campeonato de futebol com dez equipes distribuídas em grupos.", sobre:"O eChamp Junior organiza equipes em grupos e permite acompanhar as principais informações da competição.", info:["10 equipes participantes","Disputa em grupos","Competição em andamento"] },
  { id:6, nome:"Liga eChamp 2026", modalidade:"Futsal", equipes:14, formato:"Pontos corridos", status:"Em andamento", temporada:"2026", vagasDisponiveis:0, inscricaoAte:"2026-10-10", whatsapp:WHATSAPP_PADRAO, descricao:"Liga de futsal em pontos corridos com 14 equipes participantes.", sobre:"A Liga eChamp 2026 reúne 14 equipes em uma temporada de pontos corridos.", info:["14 equipes participantes","Sistema de pontos corridos","Temporada 2026"] }
];

const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
const campeonato = campeonatos.find(c => c.id === id) || campeonatos[0];
const prazoEncerrado = campeonato.inscricaoAte && new Date(campeonato.inscricaoAte + "T23:59:59") < new Date();
const esgotado = campeonato.vagasDisponiveis <= 0 && campeonato.status === "Vagas esgotadas";
const inscricoesFechadas = prazoEncerrado || esgotado || campeonato.status === "Encerrado" || campeonato.status === "Em andamento";

// Permite personalizar o contato de cada competição alterando o campo whatsapp do respectivo item.
const telefone = (campeonato.whatsapp || WHATSAPP_PADRAO).replace(/\D/g, "");
const linkWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(`Olá! Tenho interesse no campeonato ${campeonato.nome} e gostaria de mais informações.`)}`;

document.title = `${campeonato.nome} | eChamp`;
document.getElementById("nome").textContent = campeonato.nome;
document.getElementById("descricao").textContent = campeonato.descricao;
document.getElementById("status").textContent = inscricoesFechadas ? (esgotado ? "Vagas esgotadas" : "Inscrições encerradas") : "Inscrições abertas";
document.getElementById("modalidade").textContent = campeonato.modalidade;
document.getElementById("equipes").textContent = campeonato.equipes;
document.getElementById("formato").textContent = campeonato.formato;
document.getElementById("temporada").textContent = campeonato.temporada;
document.getElementById("sobre").textContent = campeonato.sobre;
document.getElementById("informacoes").innerHTML = campeonato.info.map(item => `<li>${item}</li>`).join("");

const aviso = document.getElementById("avisoInscricao");
const botao = document.getElementById("acompanhar");
if (inscricoesFechadas) {
  aviso.textContent = esgotado ? "As vagas desta competição já foram preenchidas. Não é possível realizar novas inscrições." : "O prazo de inscrição desta competição foi encerrado. Não é possível realizar novas inscrições.";
  aviso.classList.add("fechado");
  botao.removeAttribute("href");
  botao.classList.add("botao-desativado");
  botao.setAttribute("aria-disabled", "true");
  botao.textContent = "Inscrições indisponíveis";
} else {
  aviso.textContent = `Inscrições abertas até ${new Date(campeonato.inscricaoAte + "T12:00:00").toLocaleDateString("pt-BR")} • ${campeonato.vagasDisponiveis} vaga(s) disponível(is).`;
  botao.href = linkWhatsApp;
}
