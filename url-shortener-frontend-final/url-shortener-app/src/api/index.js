// src/api/index.js
// API utility for handling requests with JWT from Zustand store

import useAuthStore from "../store/auth";

const API_BASE = "http://localhost:8080/api";

function getAuthHeaders() {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, { method = "GET", body, headers = {}, ...rest } = {}) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...headers,
    },
    ...rest,
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export default apiFetch;
