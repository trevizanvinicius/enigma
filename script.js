// ================= CONFIGURAÇÃO =================
const senhaAdmin = "VtrevoT";

let enigmas = JSON.parse(localStorage.getItem("enigmas")) || [
  { resposta: "patetica", resolvido: false }
];

let enigmaAtual = 0;
let enigmaEditando = -1;

// ================= ELEMENTOS DO JOGO =================
const jogo = document.querySelector(".container");
const titulo = document.getElementById("numero-enigma");
const input = document.getElementById("resposta");
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");
const abrirProgressaoBtn = document.getElementById("abrir-progressao");

// ================= TELA PROGRESSÃO =================
const telaProgressao = document.getElementById("tela-progressao");
const listaProgressao = document.getElementById("lista-progressao");
const voltarProgressaoBtn = document.getElementById("voltar-jogo-progressao");

// ================= ELEMENTOS ADMIN =================
const adminPanel = document.getElementById("admin-panel");
const listaEnigmas = document.getElementById("lista-enigmas");
const novoEnigmaBtn = document.getElementById("novo-enigma");
const voltarJogoAdmin = document.getElementById("voltar-jogo");

const editorTela = document.getElementById("editor-enigma");
const editorTitulo = document.getElementById("editor-titulo");
const editorResposta = document.getElementById("editor-resposta");
const salvarEnigmaBtn = document.getElementById("salvar-enigma");
const apagarEnigmaBtn = document.getElementById("apagar-enigma");
const voltarAdminBtn = document.getElementById("voltar-admin");

// ================= EVENTOS =================
botao.addEventListener("click", verificarResposta);
abrirProgressaoBtn.addEventListener("click", abrirProgressao);
voltarProgressaoBtn.addEventListener("click", voltarAoJogo);

titulo.addEventListener("dblclick", () => {
  const senha = prompt("Acesso restrito:");
  if (senha === senhaAdmin) abrirAdmin();
});

novoEnigmaBtn.addEventListener("click", criarNovoEnigma);
salvarEnigmaBtn.addEventListener("click", salvarEnigma);
apagarEnigmaBtn.addEventListener("click", apagarEnigma);
voltarAdminBtn.addEventListener("click", voltarLista);
voltarJogoAdmin.addEventListener("click", voltarAoJogo);

// ================= JOGO =================
function verificarResposta() {
  const resposta = input.value.toLowerCase().trim();

  if (resposta === enigmas[enigmaAtual].resposta) {
    enigmas[enigmaAtual].resolvido = true;
    salvarStorage();

    // ⚠️ NÃO avança se o próximo não existir
    if (!enigmas[enigmaAtual + 1]) {
      titulo.innerText = "AGUARDE...";
      mensagem.style.color = "#aaa";
      mensagem.innerText = "Construindo enigma";
      input.disabled = true;
      botao.disabled = true;
      return;
    }

    // Só avança se o próximo existir
    enigmaAtual++;
    carregarEnigma(enigmaAtual);
  } else {
    mensagem.style.color = "red";
    mensagem.innerText = "É só isso que você tem para me oferecer?";
  }
}

function carregarEnigma(index) {
  enigmaAtual = index;
  titulo.innerText = `ENIGMA - ${String(index + 1).padStart(2, "0")}`;
  mensagem.innerText = "";
  input.value = "";
  input.disabled = false;
  botao.disabled = false;
}

// ================= PROGRESSÃO =================
function abrirProgressao() {
  jogo.style.display = "none";
  telaProgressao.style.display = "block";
  renderProgressao();
}

function voltarAoJogo() {
  telaProgressao.style.display = "none";
  adminPanel.style.display = "none";
  editorTela.style.display = "none";
  jogo.style.display = "block";
  carregarEnigma(enigmaAtual);
}

function renderProgressao() {
  listaProgressao.innerHTML = "";

  enigmas.forEach((e, index) => {
    const item = document.createElement("div");
    item.className = "progressao-item";

    if (e.resolvido) item.classList.add("resolvido");
    if (index === enigmaAtual) item.classList.add("ativo");

    item.innerText = e.resolvido ? "✔" : index + 1;

    item.onclick = () => {
      telaProgressao.style.display = "none";
      jogo.style.display = "block";
      carregarEnigma(index);
    };

    listaProgressao.appendChild(item);
  });
}

// ================= ADMIN =================
function abrirAdmin() {
  jogo.style.display = "none";
  adminPanel.style.display = "block";
  renderLista();
}

function renderLista() {
  listaEnigmas.innerHTML = "";

  enigmas.forEach((_, index) => {
    const li = document.createElement("li");
    li.innerText = `Enigma ${index + 1}`;
    li.onclick = () => editarEnigma(index);
    listaEnigmas.appendChild(li);
  });
}

function criarNovoEnigma() {
  enigmas.push({ resposta: "", resolvido: false });
  salvarStorage();
  editarEnigma(enigmas.length - 1);
}

function editarEnigma(index) {
  enigmaEditando = index;
  adminPanel.style.display = "none";
  editorTela.style.display = "block";
  editorTitulo.innerText = `Editando Enigma ${index + 1}`;
  editorResposta.value = enigmas[index].resposta;
}

function salvarEnigma() {
  if (enigmaEditando < 0) return;
  enigmas[enigmaEditando].resposta =
    editorResposta.value.trim().toLowerCase();
  salvarStorage();
  voltarLista();
}

function apagarEnigma() {
  if (enigmaEditando < 0) return;
  if (!confirm("Apagar este enigma?")) return;
  enigmas.splice(enigmaEditando, 1);
  salvarStorage();
  enigmaEditando = -1;
  voltarLista();
}

function voltarLista() {
  editorTela.style.display = "none";
  adminPanel.style.display = "block";
  renderLista();
}

// ================= STORAGE =================
function salvarStorage() {
  localStorage.setItem("enigmas", JSON.stringify(enigmas));
}

// ================= INICIALIZAÇÃO =================
carregarEnigma(0);
