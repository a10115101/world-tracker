import axios from "axios";

const OPENCAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json?";

export async function getGeocoding(queryParams) {
  const params = {
    q: queryParams,
    key: import.meta.env.VITE_OPENCAGE_API_KEY,
    language: "en",
    no_annotations: 1,
    pretty: 1,
  };

  const queryString = new URLSearchParams(params).toString();

  const response = await axios.get(`${OPENCAGE_BASE_URL}${queryString}`);

  return response.data.results;
}
