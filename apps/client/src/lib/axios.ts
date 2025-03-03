import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const api = axios.create({ headers: defaultHeaders });

api.interceptors.request.use((config) => {
  const { projectId } = JSON.parse(
    window.localStorage.getItem("projectId") || "{}"
  );
  if (projectId) {
    config.headers["Project-Id"] = projectId;
  }
  return config;
});
