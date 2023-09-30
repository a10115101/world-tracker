import axios from "axios";

import { backendPort } from "src/utilities/port";
import { checkToken } from "src/utilities/localStorage";

const API_URL = backendPort("api/v1/friends");

export async function getFriends() {
  const response = await axios.get(API_URL, checkToken());
  return response.data.results.friends;
}

export async function addFriend(id) {
  return await axios.get(`${API_URL}/${id}`, checkToken());
}

export async function acceptFriend(id) {
  return await axios.patch(`${API_URL}/${id}`, {}, checkToken());
}

export async function cancelFriend(id) {
  return await axios.delete(`${API_URL}/${id}`, checkToken());
}
