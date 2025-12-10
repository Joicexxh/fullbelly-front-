async function renderDoacoes() {
  const filtro = document.getElementById('filtroAlimento').value.toLowerCase();
  const lista = document.getElementById('listaDoacoes');
  lista.innerHTML = '';
  try {
    const res = await fetch(`${API_BASE}/doacoes`);
    const doacoes = await res.json();
    doacoes.filter(d => !filtro || d.alimento.toLowerCase().includes(filtro))
           .forEach(d => {
             const el = document.createElement('div');
             el.className = 'donation-card';
             el.innerHTML = `<strong>${d.alimento}</strong><br>${d.qtd} — Validade: ${d.validade}<br>Local: ${d.local}`;
             lista.appendChild(el);
           });
  } catch(err){ console.error(err); }
}

document.getElementById('formDoacao').addEventListener('submit', async e => {
  e.preventDefault();
  const doacao = {
    alimento: document.getElementById('alimento').value,
    qtd: document.getElementById('qtd').value,
    validade: document.getElementById('validade').value,
    local: document.getElementById('localRetirada').value || 'Não informado'
  };
  try {
    await fetch(`${API_BASE}/doacoes`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(doacao)
    });
    renderDoacoes();
    e.target.reset();
    alert('Doação publicada!');
  } catch(err){ console.error(err); alert('Erro ao publicar doação!'); }
});

renderDoacoes();
