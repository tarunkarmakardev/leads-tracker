import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const api = axios.create({ headers: defaultHeaders });
