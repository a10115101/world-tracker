import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

export async function signup(username, email, password) {
  return await axios.post(`${API_URL}/signup`, { username, email, password });
}

export async function login(email, password) {
  return await axios.post(`${API_URL}/login`, { email, password });
}

export async function google() {
  return await axios.get(`${API_URL}/getGoogleUser`, { withCredentials: true });
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
