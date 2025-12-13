// ===============================
// CONFIG
// ===============================
const API_URL = "https://fullbelly-cs9f.onrender.com/api";

// ===============================
// NAVEGAÇÃO SPA
// ===============================
function go(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "home") renderHomeDoacoes();
  if (page === "doacoes") {
    carregarPerfis();
    renderDoacoes();
  }
}

// ===============================
// CPF / CNPJ DINÂMICO
// ===============================
const tipoUsuario = document.getElementById("tipoUsuario");
const docField = document.getElementById("docField");

tipoUsuario.addEventListener("change", () => {
  if (tipoUsuario.value === "empresa") {
    docField.innerHTML = `
      <label>CNPJ</label>
      <input id="cnpj" required />
    `;
  } else if (tipoUsuario.value === "pessoa") {
    docField.innerHTML = `
      <label>CPF</label>
      <input id="cpf" required />
    `;
  } else {
    docField.innerHTML = "";
  }
});

// ===============================
// ESTADO
// ===============================
let currentUserId = null;

// ===============================
// CADASTRO DE USUÁRIO
// ===============================
document.getElementById("formCadastro").addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("tipo", tipoUsuario.value);
  formData.append("nome", nome.value);
  formData.append("email", email.value);
  formData.append("telefone", telefone.value);
  formData.append("endereco", endereco.value);
  formData.append("descricao", descricao.value);

  if (tipoUsuario.value === "empresa") {
    formData.append("cnpj", document.getElementById("cnpj").value);
  }
  if (tipoUsuario.value === "pessoa") {
    formData.append("cpf", document.getElementById("cpf").value);
  }

  const foto = document.getElementById("fotoPerfil").files[0];
  if (foto) formData.append("foto", foto);

  try {
    const res = await fetch(`${API_URL}/usuarios/`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    currentUserId = data.id;

    alert("Cadastro realizado com sucesso!");
    e.target.reset();
    go("doacoes");

  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar usuário");
  }
});

// ===============================
// CARREGAR PERFIS
// ===============================
async function carregarPerfis() {
  try {
    const res = await fetch(`${API_URL}/usuarios/`);
    const data = await res.json();

    const select = document.getElementById("selectPerfil");
    select.innerHTML = `<option value="">Selecione um perfil</option>`;

    data.forEach(u => {
      select.innerHTML += `<option value="${u.id}">${u.nome} (${u.tipo})</option>`;
    });

  } catch (err) {
    console.error(err);
  }
}

// ===============================
// VISUALIZAR PERFIL
// ===============================
async function loadProfile(userId) {
  if (!userId) return;
  currentUserId = userId;

  try {
    const res = await fetch(`${API_URL}/usuarios/${userId}/`);
    const user = await res.json();

    document.getElementById("profile-name").innerText = user.nome;
    document.getElementById("profile-type").innerText = user.tipo;
    document.getElementById("profile-email").innerText = user.email;
    document.getElementById("profile-telefone").innerText = user.telefone;
    document.getElementById("profile-endereco").innerText = user.endereco || "Não informado";
    document.getElementById("profile-descricao").innerText = user.descricao || "Sem descrição";

    document.getElementById("profile-foto").src =
      user.foto
        ? `https://fullbelly-cs9f.onrender.com${user.foto}`
        : "imagens/default-avatar.png";

    const atividades = document.getElementById("profile-atividades");
    atividades.innerHTML = "";

    user.historicoDoacoes?.forEach(d => {
      atividades.innerHTML += `<li>${d.item} — ${d.data}</li>`;
    });

  } catch (err) {
    console.error(err);
  }
}

// ===============================
// REGISTRAR DOAÇÃO
// ===============================
document.getElementById("formDoacao").addEventListener("submit", async e => {
  e.preventDefault();

  if (!currentUserId) {
    alert("Selecione um perfil!");
    return;
  }

  const doacao = {
    item: alimento.value,
    qtd: qtd.value,
    validade: validade.value,
    local: localRetirada.value,
    usuario: currentUserId
  };

  try {
    await fetch(`${API_URL}/doacoes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacao)
    });

    alert("Doação registrada!");
    e.target.reset();
    renderDoacoes();
    renderHomeDoacoes();

  } catch (err) {
    console.error(err);
  }
});

// ===============================
// LISTAR DOAÇÕES
// ===============================
async function renderDoacoes(filter = "") {
  try {
    const res = await fetch(`${API_URL}/doacoes/`);
    const data = await res.json();

    const container = document.getElementById("listaDoacoes");
    container.innerHTML = "";

    data
      .filter(d => d.item.toLowerCase().includes(filter.toLowerCase()))
      .forEach(d => {
        container.innerHTML += `
          <div class="donation-item">
            <strong>${d.item}</strong>
            <p>Qtd: ${d.qtd}</p>
            <p>Validade: ${d.validade}</p>
            <p>Retirada: ${d.local}</p>
            <small>Por: ${d.usuario_nome}</small>
          </div>
        `;
      });

  } catch (err) {
    console.error(err);
  }
}

// ===============================
// HOME — DOAÇÕES
// ===============================
async function renderHomeDoacoes() {
  try {
    const res = await fetch(`${API_URL}/doacoes/`);
    const data = await res.json();

    const container = document.getElementById("homeDoacoes");
    container.innerHTML = "";

    data.forEach(d => {
      container.innerHTML += `
        <div class="donation-item">
          <strong>${d.item}</strong>
          <p>${d.qtd} — ${d.local}</p>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}

// ===============================
// FILTRO
// ===============================
document.getElementById("filtroAlimento").addEventListener("input", e => {
  renderDoacoes(e.target.value);
});

document.addEventListener("DOMContentLoaded", renderHomeDoacoes);
