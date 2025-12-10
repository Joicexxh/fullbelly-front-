const API_BASE = 'https://seu-backend.onrender.com';

document.getElementById('formCadastro').addEventListener('submit', async e => {
  e.preventDefault();
  const senha = document.getElementById('senha').value;
  const senha2 = document.getElementById('senha2').value;
  if(senha !== senha2){ alert('Senhas não coincidem'); return; }

  const usuario = {
    tipo: tipoUsuario.value,
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: senha,
    cpf_cnpj: document.getElementById('cpf')?.value || document.getElementById('cnpj')?.value,
    endereco: document.getElementById('endereco').value,
    descricao: document.getElementById('descricao').value
  };

  try {
    const res = await fetch(`${API_BASE}/usuarios`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(usuario)
    });
    const data = await res.json();
    document.getElementById('cadMsg').textContent = data.message || 'Cadastro realizado!';
    e.target.reset();
    setTimeout(()=>document.getElementById('cadMsg').textContent='',3000);
  } catch(err) {
    console.error(err);
    alert('Erro ao cadastrar!');
  }
});
