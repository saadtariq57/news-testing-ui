import axios from "axios";

function newsApiToken(): string {
  return (
    process.env.NEWS_API_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_NEWS_API_TOKEN?.trim() ||
    ""
  );
}

export const newsApi = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_NEWS_API_URL ?? "").replace(/\/+$/, ""),
  headers: {
    Accept: "application/json",
  },
});

newsApi.interceptors.request.use((config) => {
  const token = newsApiToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
