<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>FullBelly</title>
  <style>
    .page { display: none; }
    .page.active { display: block; }
    .donation-item { border: 1px solid #ccc; padding: 5px; margin: 5px 0; }
  </style>
</head>
<body>

<!-- ===============================
     Navegação
=============================== -->
<nav>
  <button onclick="go('home')">Home</button>
  <button onclick="go('cadastro')">Cadastro</button>
  <button onclick="go('doacoes')">Doações</button>
</nav>

<!-- ===============================
     Páginas
=============================== -->
<div id="home" class="page active">
  <h1>Doações Recentes</h1>
  <input type="text" id="filtroAlimento" placeholder="Filtrar por alimento" />
  <div id="homeDoacoes"></div>
</div>

<div id="cadastro" class="page">
  <h1>Cadastro de Usuário</h1>
  <form id="formCadastro">
    <select id="tipoUsuario" required>
      <option value="">Selecione tipo</option>
      <option value="pessoa">Pessoa</option>
      <option value="empresa">Empresa</option>
    </select>
    <div id="docField"></div>
    <input id="nome" placeholder="Nome" required />
    <input id="email" type="email" placeholder="Email" required />
    <input id="telefone" placeholder="Telefone" required />
    <input id="endereco" placeholder="Endereço" />
    <textarea id="descricao" placeholder="Descrição"></textarea>
    <input type="file" id="fotoPerfil" />
    <button type="submit">Cadastrar</button>
  </form>
</div>

<div id="doacoes" class="page">
  <h1>Registrar Doação</h1>
  <select id="selectPerfil" onchange="loadProfile(this.value)"></select>
  <div id="profile">
    <h2 id="profile-name"></h2>
    <p id="profile-type"></p>
    <p id="profile-email"></p>
    <p id="profile-telefone"></p>
    <p id="profile-endereco"></p>
    <p id="profile-descricao"></p>
    <img id="profile-foto" width="100" />
    <ul id="profile-atividades"></ul>
  </div>
  <form id="formDoacao">
    <input id="alimento" placeholder="Alimento" required />
    <input id="qtd" placeholder="Quantidade" required />
    <input id="validade" type="date" required />
    <input id="localRetirada" placeholder="Local de Retirada" />
    <button type="submit">Registrar Doação</button>
  </form>
  <h2>Doações</h2>
  <div id="listaDoacoes"></div>
</div>

<script>
  const API_URL = "https://fullbelly-cs9f.onrender.com/api/";

  // ===============================
  // Navegação
  // ===============================
  function go(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
    if(page==='doacoes') carregarPerfis();
    if(page==='home') renderHomeDoacoes();
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

  let currentUserId = null;

  // ===============================
  // Cadastro de usuário
  // ===============================
  document.getElementById('formCadastro').addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tipo', tipoUsuario.value);
    formData.append('nome', document.getElementById('nome').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('telefone', document.getElementById('telefone').value);
    formData.append('endereco', document.getElementById('endereco').value);
    formData.append('descricao', document.getElementById('descricao').value);
    const foto = document.getElementById('fotoPerfil').files[0];
    if(foto) formData.append('foto', foto);

    fetch(`${API_URL}usuarios/`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      alert('Cadastro realizado com sucesso!');
      e.target.reset();
    })
    .catch(err => console.error(err));
  });

  // ===============================
  // Carregar perfis
  // ===============================
  function carregarPerfis() {
    fetch(`${API_URL}usuarios/`)
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById('selectPerfil');
        select.innerHTML = '<option value="">Selecione um usuário ou restaurante</option>';
        data.forEach(u => {
          select.innerHTML += `<option value="${u.id}">${u.nome} (${u.tipo})</option>`;
        });
      })
      .catch(err => console.error(err));
  }

  // ===============================
  // Visualizar perfil
  // ===============================
  function loadProfile(userId){
    currentUserId = userId;
    if(!userId) return;

    fetch(`${API_URL}usuarios/${userId}/`)
      .then(res => res.json())
      .then(user => {
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
      })
      .catch(err => console.error(err));
  }

  // ===============================
  // Registrar doação
  // ===============================
  document.getElementById('formDoacao').addEventListener('submit', e => {
    e.preventDefault();
    if(!currentUserId) return alert('Selecione um perfil!');

    const doacao = {
      item: document.getElementById('alimento').value,
      qtd: document.getElementById('qtd').value,
      validade: document.getElementById('validade').value,
      local: document.getElementById('localRetirada').value,
      usuarioId: currentUserId
    };

    fetch(`${API_URL}doacoes/`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(doacao)
    })
    .then(res => res.json())
    .then(data => {
      alert('Doação registrada!');
      renderDoacoes();
      renderHomeDoacoes();
      e.target.reset();
    })
    .catch(err => console.error(err));
  });

  // ===============================
  // Renderizar doações
  // ===============================
  function renderDoacoes(filter=''){
    fetch(`${API_URL}doacoes/`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('listaDoacoes');
        container.innerHTML = '';
        data.filter(d => !filter || d.item.toLowerCase().includes(filter.toLowerCase()))
          .forEach(d => {
            container.innerHTML += `
              <div class="donation-item">
                <strong>${d.item}</strong> - ${d.qtd} - Validade: ${d.validade} - Retirada: ${d.local}
                <br><small>Doado por: ${d.usuario_nome}</small>
              </div>
            `;
          });
      })
      .catch(err => console.error(err));
  }

  function renderHomeDoacoes() {
    fetch(`${API_URL}doacoes/`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('homeDoacoes');
        container.innerHTML = '';
        data.forEach(d => {
          container.innerHTML += `<div class="donation-item">
            <strong>${d.item}</strong> - ${d.qtd} - Validade: ${d.validade} - Retirada: ${d.local}
            <br><small>Doado por: ${d.usuario_nome}</small>
          </div>`;
        });
      })
      .catch(err => console.error(err));
  }

  // ===============================
  // Filtro de doações
  // ===============================
  document.getElementById('filtroAlimento').addEventListener('input', e => {
    renderDoacoes(e.target.value);
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderHomeDoacoes();
  });
</script>

</body>
</html>
