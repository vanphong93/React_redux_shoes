import axios from "axios";
const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
export const https = axios.create({
    baseURL: BASE_URL,
});
