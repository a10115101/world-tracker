import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/records";

export async function getAllRecords() {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return axios.get(API_URL, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}

export async function creataRecord(recordObject) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return axios.post(
    API_URL,
    { recordObject },
    { headers: { Authorization: token }, withCredentials: true }
  );
}
