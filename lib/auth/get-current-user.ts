// lib/api/me.ts

import type { CurrentUser } from "@/lib/auth/types";
import { apiFetch } from "../api-fetch";

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await apiFetch<CurrentUser>("/api/me");
  
  return response.data;

}