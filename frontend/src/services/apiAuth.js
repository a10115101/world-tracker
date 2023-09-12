import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

export async function signup(username, email, password) {
  return await axios.post(`${API_URL}/signup`, { username, email, password });
}

// export async function auth() {
//   await axios.get(`${API_URL}/login`);
//   console.log("login");
// }
