import { prisma } from "../lib/prisma.js";
import { createLog } from "../activity/activity.service.js";
import { ActivityAction } from "../constants/activity.js";
import { createNotification } from "../notifications/notification.service.js";
import { NotificationType } from "../constants/notificationType.js";
import type { GetTasksQuery } from "./task.validation.js";

export async function getTaskStats(userId: number) {
  const [total, incomplete, complete, overdue] = await Promise.all([
    prisma.task.count({ where: { userId, deletedAt: null } }),
    prisma.task.count({ where: { userId, deletedAt: null, remark: "IN_COMPLETE" } }),
    prisma.task.count({ where: { userId, deletedAt: null, remark: "COMPLETE" } }),
    prisma.task.count({ where: { userId, deletedAt: null, dueDate: { lt: new Date() }, remark: { not: "COMPLETE" } } }),
  ]);
  return {
    total,
    incomplete,
    complete,
    overdue,
  };
}

export async function getTasks(
  userId: number,
  query: GetTasksQuery,
) {
  const {page, limit, search, remark, status, sortBy, order} = query;
  const where = {
    userId,
    deletedAt: null,
    ...(search && {
      title: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),
    ...(remark && { remark }),
    ...(status && { status }),
  };
  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.task.count({
      where,
    }),
  ]);
  return {
    data: tasks,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getTaskById(id: number, userId: number) {
  return prisma.task.findFirst({
    where: {
      id,
      userId,
      deletedAt: null,
    },
  });
}

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: string,
  userId: number;
}) {
  const task = await prisma.task.create({
    data,
  });
  await createLog(
    ActivityAction.TASK_CREATED,
    data.userId,
    task.id
  );
  await createNotification(
    data.userId,
    ActivityAction.TASK_CREATED,
    "Task Created",
    `"${task.title}" was created`
  );
  return task;
}

export async function updateTask(
  id: number,
  userId: number,
  data: any,
) {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
      deletedAt: null,
    },
  })
  if(!task){
    throw new Error("Task not found");
  }
  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });
  await createLog(
    ActivityAction.TASK_UPDATED,
    userId,
    task.id
  );
  if (data.status && task.status !== updatedTask.status) {
    await createLog(
      ActivityAction.TASK_STATUS_CHANGED,
      userId,
      updatedTask.id,
      task.status,
      updatedTask.status
    );
    await createNotification(
      userId,
      NotificationType.TASK_STATUS_CHANGED,
      "Status Updated",
      `"${updatedTask.title}" status changed from ${task.status} to ${updatedTask.status}`
    );
  }
  if (data.remark && task.remark !== updatedTask.remark) {
    await createLog(
      ActivityAction.TASK_REMARK_CHANGED,
      userId,
      updatedTask.id,
      task.remark,
      updatedTask.remark
    );
    await createNotification(
      userId,
      NotificationType.TASK_REMARK_CHANGED,
      "Remark Updated",
      `"${updatedTask.title}" remark changed from ${task.remark} to ${updatedTask.remark}`
    );
  }
  if (updatedTask.remark === "COMPLETE") {
    await createNotification(
      userId,
      NotificationType.TASK_COMPLETED,
      "Task Completed",
      `"${updatedTask.title}" was completed`
    );
  }
  return updatedTask;
}

export async function softDeleteTask(id: number, userId: number) {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!task) {
    throw new Error("Task not found");
  }
  await createLog(
    ActivityAction.TASK_DELETED,
    userId,
    task.id
  );
  await createNotification(
    userId,
    NotificationType.TASK_DELETED,
    "Soft deleted",
    `"${task.title}" moved to trash bin`
  );
  return prisma.task.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    }
  });
}

export async function getSoftDeletedTasks(userId: number) {
  return prisma.task.findMany({
    where: {
      userId,
      deletedAt: {
        not: null,
      },
    },
    orderBy: {
      deletedAt: "desc",
    }
  })
}

export async function restoreTask(id: number, userId: number) {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  await createLog(
    ActivityAction.TASK_RESTORED,
    userId,
    task.id
  );
  await createNotification(
    userId,
    NotificationType.TASK_RESTORED,
    "Task restored",
    `"${task.title}" has been restored`
  );
  return prisma.task.update({
    where: { id },
    data: {
      deletedAt: null,
    },
  });
}

export async function deleteTask(id: number, userId: number) {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!task) {
    throw new Error("Task not found");
  }
  await createLog(
    ActivityAction.TASK_DELETED_PERMANENTLY,
    userId,
    task.id
  );
  await createNotification(
    userId,
    NotificationType.TASK_DELETED,
    "Permanently deleted",
    `"${task.title}" has been deleted permanently`
  );
  return prisma.task.delete({
    where: { id },
  });
}
