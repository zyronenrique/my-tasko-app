import { api } from "../lib/api-client";
import type { ActivityLog } from "../types/activity.types";

export async function getActivities() {
  return api<ActivityLog[]>("/api/activity");
}
