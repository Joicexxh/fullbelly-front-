// ===============================
// Navegação entre páginas
// ===============================
const API_URL = "https://fullbelly.onrender.com/api/";
function go(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

// ===============================
// Campos CPF / CNPJ dinâmico
// ===============================
const tipoUsuario = document.getElementById('tipoUsuario');
const docField = document.getElementById('docField');

tipoUsuario.addEventListener('change', () => {
  if(tipoUsuario.value === 'empresa') {
    docField.innerHTML = '<label>CNPJ</label><input id="cnpj" required />';
  } else if(tipoUsuario.value === 'pessoa') {
    docField.innerHTML = '<label>CPF</label><input id="cpf" required />';
  } else {
    docField.innerHTML = '';
  }
});

// ===============================
// Estado global
// ===============================
let usuarios = [];
let doacoes = [];
let currentUserId = null; // usuário logado ou selecionado para doação

// ===============================
// Cadastro de usuário
// ===============================
document.getElementById('formCadastro').addEventListener('submit', e => {
  e.preventDefault();

  const novoUsuario = {
    id: Date.now(),
    tipo: tipoUsuario.value,
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    endereco: document.getElementById('endereco').value,
    descricao: document.getElementById('descricao').value,
    foto: document.getElementById('fotoPerfil').files[0] ? URL.createObjectURL(document.getElementById('fotoPerfil').files[0]) : 'imagens/default-avatar.png',
    historicoDoacoes: []
  };

  usuarios.push(novoUsuario);
  alert('Cadastro realizado com sucesso!');
  e.target.reset();
  carregarPerfis();
});

// ===============================
// Carregar perfis no select
// ===============================
function carregarPerfis() {
  const select = document.getElementById('selectPerfil');
  select.innerHTML = '<option value="">Selecione um usuário ou restaurante</option>';
  usuarios.forEach(u => {
    select.innerHTML += `<option value="${u.id}">${u.nome} (${u.tipo})</option>`;
  });
}

// ===============================
// Visualizar perfil selecionado
// ===============================
function loadProfile(userId){
  const user = usuarios.find(u => u.id == userId);
  if(!user) return;

  currentUserId = user.id;

  document.getElementById('profile-name').innerText = user.nome;
  document.getElementById('profile-type').innerText = user.tipo;
  document.getElementById('profile-email').innerText = user.email;
  document.getElementById('profile-telefone').innerText = user.telefone;
  document.getElementById('profile-endereco').innerText = user.endereco || 'Não informado';
  document.getElementById('profile-descricao').innerText = user.descricao || 'Sem descrição';
  document.getElementById('profile-foto').src = user.foto || 'imagens/default-avatar.png';

  const atividades = document.getElementById('profile-atividades');
  atividades.innerHTML = '';
  user.historicoDoacoes?.forEach(d => {
    atividades.innerHTML += `<li>${user.tipo==='empresa'?'Doou':'Recebeu'}: ${d.item} em ${d.data}</li>`;
  });
}

// ===============================
// Registrar doação
// ===============================
document.getElementById('formDoacao').addEventListener('submit', e => {
  e.preventDefault();

  if(!currentUserId){
    alert('Selecione um perfil para registrar doação!');
    return;
  }

  const doacao = {
    id: Date.now(),
    item: document.getElementById('alimento').value,
    qtd: document.getElementById('qtd').value,
    validade: document.getElementById('validade').value,
    local: document.getElementById('localRetirada').value,
    usuarioId: currentUserId
  };

  doacoes.push(doacao);

  // Adicionar ao histórico do usuário
  const usuario = usuarios.find(u => u.id === currentUserId);
  if(usuario){
    usuario.historicoDoacoes.push({ item: doacao.item, data: new Date().toLocaleDateString() });
  }

  alert('Doação registrada!');
  renderDoacoes();
  renderHomeDoacoes();
  e.target.reset();
});

// ===============================
// Renderizar doações
// ===============================
function renderDoacoes(filter=''){
  const container = document.getElementById('listaDoacoes');
  container.innerHTML = '';

  doacoes.filter(d => !filter || d.item.toLowerCase().includes(filter.toLowerCase()))
    .forEach(d => {
      const user = usuarios.find(u => u.id === d.usuarioId);
      container.innerHTML += `
        <div class="donation-item">
          <strong>${d.item}</strong> - ${d.qtd} - Validade: ${d.validade} - Retirada: ${d.local || 'Não informado'}
          <br><small>Doado por: ${user ? user.nome : 'Desconhecido'}</small>
        </div>
      `;
  });
}

// ===============================
// Renderizar doações na Home
// ===============================
function renderHomeDoacoes() {
  const container = document.getElementById('homeDoacoes');
  container.innerHTML = '';

  doacoes.forEach(d => {
    const user = usuarios.find(u => u.id === d.usuarioId);
    const div = document.createElement('div');
    div.className = 'donation-item';
    div.innerHTML = `<strong>${d.item}</strong> - ${d.qtd} - Validade: ${d.validade} - Retirada: ${d.local || 'Não informado'} <br><small>Doado por: ${user ? user.nome : 'Desconhecido'}</small>`;
    container.appendChild(div);
  });
}

// ===============================
// Chat simples
// ===============================
function sendMsg(){
  const name = document.getElementById('chatName').value || 'Anônimo';
  const text = document.getElementById('chatText').value;
  if(!text) return;

  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `<div><strong>${name}:</strong> ${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById('chatText').value = '';
}

// ===============================
// Filtro de doações
// ===============================
document.getElementById('filtroAlimento').addEventListener('input', e => {
  renderDoacoes(e.target.value);
});

// ===============================
// Inicialização
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  carregarPerfis();
  renderDoacoes();
  renderHomeDoacoes();
});
