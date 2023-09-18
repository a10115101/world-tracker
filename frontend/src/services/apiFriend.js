import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/friends";

export async function getFriends() {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/getFriends`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.results.friends;
}
