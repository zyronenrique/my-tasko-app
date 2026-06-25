export type TaskRemarks = "IN_COMPLETE" | "COMPLETE";
export type TaskStatus = "ACTIVE" | "INACTIVE";



export interface Task {
  id: number;
  title: string;
  description?: string | null;
  remark: TaskRemarks;
  status: TaskStatus;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskStats {
  total: number;
  incomplete: number;
  complete: number;
  overdue: number;
}

export interface TaskQuery {
  page?: number;
  limit?: number;
  search?: string;
  remark?: string;
  status?: string;
  sortBy?: string;
  order?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  remark?: "IN_COMPLETE" | "COMPLETE";
  status?: "ACTIVE" | "INACTIVE";
  dueDate?: string;
}
