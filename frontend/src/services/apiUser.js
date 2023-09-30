import axios from "axios";

import { backendPort } from "src/utilities/port";
import { checkToken } from "src/utilities/localStorage";

const API_URL = backendPort("api/v1/users");

export async function getAllUsers(queryText) {
  const response = await axios.get(
    `${API_URL}/?username=${queryText}`,
    checkToken()
  );
  return response.data.data.users;
}

export async function getUser(id) {
  const response = await axios.get(`${API_URL}/${id}`, checkToken());
  return response.data.data.user;
}

export async function updateUser(id, updateMeObject) {
  return await axios.patch(`${API_URL}/${id}`, updateMeObject, checkToken());
}
