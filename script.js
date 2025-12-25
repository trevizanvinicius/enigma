const screens = document.querySelectorAll(".screen");

const ADMIN_PASSWORD = "1234";

let enigmas = JSON.parse(localStorage.getItem("enigmas")) || [];

// ================= TROCA DE TELAS =================
function mostrarTela(id) {
  screens.forEach(tela => tela.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function voltarJogo() {
  mostrarTela("jogo");
}

function abrirProgressao() {
  mostrarTela("progressao");
  renderProgressao();
}

function abrirAdmin() {
  mostrarTela("admin-panel");
}

// ================= ADMIN =================
function entrarAdmin() {
  const senha = document.getElementById("senha-admin").value;

  if (senha === ADMIN_PASSWORD) {
    alert("Acesso liberado!");
  } else {
    alert("Senha incorreta!");
  }
}

// ================= PROGRESSÃO =================
function renderProgressao() {
  const lista = document.getElementById("lista-progressao");
  lista.innerHTML = "";

  enigmas.forEach((_, i) => {
    const item = document.createElement("div");
    item.className = "progressao-item";
    item.textContent = i + 1;
    lista.appendChild(item);
  });
}
