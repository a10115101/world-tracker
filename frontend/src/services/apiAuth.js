import axios from "axios";

import { backendPort } from "src/utilities/port";

const API_URL = backendPort("api/v1/auth");

export async function signup(username, email, password) {
  return await axios.post(`${API_URL}/signup`, { username, email, password });
}

export async function login(email, password) {
  return await axios.post(`${API_URL}/login`, { email, password });
}

export async function logout() {
  return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}

export async function google() {
  return await axios.get(`${API_URL}/getGoogleUser`, { withCredentials: true });
}
