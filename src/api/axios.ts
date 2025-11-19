import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tech-challenge-api-dzjy.onrender.com', // Define a URL base
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo padrão
  },
  timeout: 5000, // Define um tempo limite de 5 segundos para as requisições
});

export default api;