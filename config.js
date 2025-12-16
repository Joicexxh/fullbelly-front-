const API_URL = "https://fullbellyy.onrender.com/api/";
fetch("/api/cadastro", {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
        "Content-Type": "application/json",
    },
});
