export const API_URL = import.meta.env.PROD
  ? "https://final-project-daanhoubrechts-api.onrender.com//api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD ? "PROD token" : "local token";
export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];
