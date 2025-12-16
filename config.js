// config.js
const API_URL = "https://fullbellyy.onrender.com/";

fetch(API_URL + "api/foods/")
  .then(res => res.json())
  .then(data => console.log("API OK:", data))
  .catch(err => console.error("API ERRO:", err));
