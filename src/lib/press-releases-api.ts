import axios from "axios";

function pressReleasesApiToken(): string {
  return (
    process.env.PRESS_RELEASES_API_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_PRESS_RELEASES_API_TOKEN?.trim() ||
    ""
  );
}

export const pressReleasesApi = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_PRESS_RELEASES_API_URL ?? "").replace(/\/+$/, ""),
  headers: {
    Accept: "application/json",
  },
});

pressReleasesApi.interceptors.request.use((config) => {
  const token = pressReleasesApiToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
