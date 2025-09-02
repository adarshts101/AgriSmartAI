import axios from "axios";
const API_BASE = "http://127.0.0.1:5000/api";

export async function fetchWeather(city) {
  return axios.get(`${API_BASE}/weather`, { params: { city } }).then(r => r.data);
}
export async function fetchMarketPrices(crop) {
  return axios.get(`${API_BASE}/market/prices`, { params: { crop } }).then(r => r.data);
}
export async function predictMarket(crop, days) {
  return axios.get(`${API_BASE}/market/predict`, { params: { crop, days } }).then(r => r.data);
}
export async function fetchGuides(topic) {
  return axios.get(`${API_BASE}/guides`, { params: { topic } }).then(r => r.data);
}
export async function chatAI(query) {
  return axios.post(`${API_BASE}/chat`, { query }).then(r => r.data);
}
