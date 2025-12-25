const screens = document.querySelectorAll(".screen");

const ADMIN_PASSWORD = "1234"; // 🔑 MUDE AQUI

let enigmas = JSON.parse(localStorage.getItem("enigmas")) || [];

// Troca de telas
function goTo(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "progress") {
    renderEnigmas();
  }
}

// Login admin
function loginAdmin() {
  const input = document.getElementById("adminPassword").value;
  const error = document.getElementById("adminError");

  if (input === ADMIN_PASSWORD) {
    error.textContent = "";
    goTo("editor");
  } else {
    error.textContent = "Senha incorreta.";
  }
}

// Adicionar enigma
function addEnigma() {
  const title = document.getElementById("enigmaTitle").value;
  const text = document.getElementById("enigmaText").value;

  if (!title || !text) return;

  enigmas.push({ title, text });
  localStorage.setItem("enigmas", JSON.stringify(enigmas));

  document.getElementById("enigmaTitle").value = "";
  document.getElementById("enigmaText").value = "";

  alert("Enigma salvo!");
}

// Renderizar enigmas
function renderEnigmas() {
  const list = document.getElementById("enigmasList");
  list.innerHTML = "";

  enigmas.forEach((e, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${i + 1}. ${e.title}</strong><br>${e.text}`;
    list.appendChild(li);
  });
}
