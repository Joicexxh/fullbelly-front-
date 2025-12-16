const API_URL = "https://fullbellyy.onrender.com/api/";
const dados = {
    nome: "João",
    email: "joao@example.com",
    senha: "123456"
};

fetch(`${API_URL}cadastro`, {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
        "Content-Type": "application/json",
    }
})
.then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
})
.then(data => console.log('✅ Sucesso:', data))
.catch(error => console.error("Erro:", error));
;

