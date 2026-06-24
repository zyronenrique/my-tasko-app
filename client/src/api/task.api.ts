import { api } from "../lib/api-client";
import type { CreateTaskDto, PaginatedResponse, Task, TaskQuery, TaskStats, UpdateTaskDto } from "../types/task.types";

export function getTrash() {
  return api("/api/tasks/trash");
}

export async function getTasks(
  params: TaskQuery
) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(
          key,
          String(value)
        );
      }
    }
  );
  return api<PaginatedResponse<Task>>(
    `/api/tasks?${searchParams.toString()}`
  );
}

export async function getTaskStats() {
  return api<TaskStats>("/api/tasks/stats" );
}

export async function createTask(
  data: CreateTaskDto
) {
  return api("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTask(
  id: number,
  data: UpdateTaskDto,
) {
  return api(`/api/tasks/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export function softDeleteTask(
  id: number
) {
  return api(`/api/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
}

export function deleteTask(
  id: number
) {
  return api(`/api/tasks/${id}/permanent`,
    {
      method: "DELETE",
    }
  );
}

export function restoreTask(
  id: number
) {
  return api(`/api/tasks/${id}/restore`,
    {
      method: "PATCH",
    }
  );
}



