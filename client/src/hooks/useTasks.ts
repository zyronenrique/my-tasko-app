import { useQuery, useMutation }from "@tanstack/react-query";
import { getTasks, getTaskStats, createTask, updateTask, softDeleteTask, restoreTask, deleteTask } from "../api/task.api";
import { QUERY_KEYS }from "../constants/query-keys";
import { queryClient } from "../lib/query-client";
import type { TaskQuery, UpdateTaskDto } from "../types/task.types";

export function useTasks(
  params: TaskQuery
) {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS, params],
    queryFn: () => getTasks(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useTaskStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.TASK_STATS],
    queryFn: getTaskStats,
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASK_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
    },
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTaskDto;
    }) =>
      updateTask(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.TASKS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.TASK_STATS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ACTIVITIES],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.NOTIFICATIONS],
        });
      },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: softDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASK_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
    },
  });
}

export function useRestoreTask() {
  return useMutation({
    mutationFn: restoreTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASK_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
    },
  });
}

export function usePermanentDeleteTask() {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
    },
  });
}
