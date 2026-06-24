import { useQuery }from "@tanstack/react-query";
import { getActivities } from "../api/activity.api";
import { QUERY_KEYS }from "../constants/query-keys";

export function useActivities() {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES],
    queryFn: getActivities,
  });
}
