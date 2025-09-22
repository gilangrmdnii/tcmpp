// src/services/api.ts
import axios from "axios";
import { getEnv } from "@utils/env";

// Base URL dari env atau fallback staging
const API_BASE_URL =
  getEnv("NEXT_PUBLIC_API_BASE_URL") || "https://api-staging-owdi.nuncorp.id/";

// Inisialisasi Axios client (tanpa Authorization default, biar clean)
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ================== API FUNCTIONS ==================

// Coin
export const fetchCoin = async (token: string) => {
  const res = await apiClient.get("api/v1/coin/fetch", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCoin = async (
  token: string,
  coin_used: number,
  time_taken: number
) => {
  const res = await apiClient.put(
    "api/v1/coin/update-coin",
    { coin_used, time_taken },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Profile
export const fetchProfile = async (token: string) => {
  const res = await apiClient.get("api/v1/auth/profile/fetch", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
