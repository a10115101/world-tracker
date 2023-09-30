import axios from "axios";

import { backendPort } from "src/utilities/port";
import { checkToken } from "src/utilities/localStorage";

const API_URL = backendPort("api/v1/records");

export async function getAllRecords(statusMode, dateMode) {
  const response = await axios.get(
    `${API_URL}/?status=${statusMode}&date=${dateMode}`,
    checkToken()
  );
  return response.data.data.records;
}

export async function getRecord(id) {
  const response = await axios.get(`${API_URL}/${id}`, checkToken());
  return response.data.data.record;
}

export async function creataRecord(recordObject) {
  return axios.post(API_URL, recordObject, checkToken());
}

export async function updateRecord(id, updateRecordObject) {
  return await axios.patch(
    `${API_URL}/${id}`,
    updateRecordObject,
    checkToken()
  );
}

export async function deleteRecord(id) {
  return await axios.delete(`${API_URL}/${id}`, checkToken());
}

export async function getStatisCountries(id) {
  const response = await axios.get(
    `${API_URL}/statisCountries/${id}`,
    checkToken()
  );
  return response.data.data;
}

export async function getStatisContinents(id) {
  const response = await axios.get(
    `${API_URL}/statisContinents/${id}`,
    checkToken()
  );
  return response.data.data.statis;
}

export async function getRecentlyVisited(id) {
  const response = await axios.get(
    `${API_URL}/recentlyVisited/${id}`,
    checkToken()
  );
  return response.data.data.recentlyVisited;
}
