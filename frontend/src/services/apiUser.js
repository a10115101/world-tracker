import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

export async function updateUser(id, updateMeObject) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return await axios.patch(
    `${API_URL}/${id}`,
    { updateMeObject },
    { headers: { Authorization: token }, withCredentials: true }
  );
}
