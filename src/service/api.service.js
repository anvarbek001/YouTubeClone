/** @format */
import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const RAPID_API = import.meta.env.VITE_APP_API_KEY;

const options = {
  params: {
    relatedToVideoId: "7ghhRHRP6t4",
    part: "id,snippet",
    type: "video",
    maxResults: "50",
  },
  headers: {
    "x-rapidapi-key": RAPID_API.toString(),
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};
export const ApiService = {
  async fetching(url) {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response.data;
  },
};
