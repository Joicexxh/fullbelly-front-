const API_URL = "https://fullbellyy.onrender.com/api/";

fetch(API_URL)
  .then(res => res.json())
  .then(data => console.log("API OK:", data))
  .catch(err => console.error("API ERRO:", err));
