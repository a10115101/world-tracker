import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/friends";

export async function getFriends() {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(API_URL, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.results.friends;
}

export async function addFriend(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data;
}

export async function acceptFriend(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.patch(
    `${API_URL}/${id}`,
    {},
    {
      headers: { Authorization: token },
      withCredentials: true,
    }
  );

  return response.data;
}

export async function cancelFriend(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data;
}
