import axios from 'axios';

// esse comando "axios.create" cria uma requisição HTTP (pelo q eu entendi)
export const api = axios.create({
  baseURL: 'http://localhost:3333'
});
