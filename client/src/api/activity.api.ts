import { api } from "../lib/api-client";

export async function getActivities() {
  return api("/api/activity");
}
