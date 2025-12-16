// config.js
const API_URL = "https://fullbellyy.onrender.com/api/";
const dados = {
    nome: "João",
    email: "joao@example.com",
    senha: "123456"
};

fetch("https://fullbellyy.onrender.com/api/cadastro", {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
        "Content-Type": "application/json",
    },
});
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Erro:", error));

