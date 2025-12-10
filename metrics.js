async function loadMetrics() {
  try {
    const res = await fetch(`${API_BASE}/estatisticas`);
    const data = await res.json();
    document.getElementById('m-refeicoes').textContent = data.refeicoes || 0;
    document.getElementById('m-doadores').textContent = data.doadores || 0;
    document.getElementById('m-voluntarios').textContent = data.voluntarios || 0;
  } catch(err) { console.error(err); }
}
loadMetrics();
