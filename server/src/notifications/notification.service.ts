import { ActivityAction } from "../constants/activity.js";
import { NotificationType } from "../constants/notificationType.js";
import { prisma } from "../lib/prisma.js";

export async function getNotifications(userId: number) {
  return prisma.notification.findMany({
    where: { userId },
    select: {
      id: true,
      type: true,
      title: true,
      message: true,
      read: true,
      createdAt: true,
      task: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getUnreadCount(userId: number){
  return prisma.notification.count({
    where: {
      userId,
      read: false,
    }
  });
}

export async function createNotification(
  userId: number,
  type: string,
  title: string,
  message: string,
  taskId?: number,
) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      taskId: taskId || null,
    },
  });
}

export async function markAsRead(
  id: number,
  userId: number
) {
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  })
  if(!notification){
    throw new Error("Notification not found");
  }
  return prisma.notification.update({
    where: {
      id,
      userId,
    },
    data: {
      read: true,
    },
  });
}

export async function markAllAsRead(userId: number){
  return prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
}

export async function createOverdueNotifications() {
  const overdueTasks = await prisma.task.findMany({
    where: {
      deletedAt: null,
      dueDate: {
        lt: new Date(),
      },
      remark: {
        not: "COMPLETE",
      },
    },
  });
  for (const task of overdueTasks) {
    const existingNotification = await prisma.notification.findFirst({
      where: {
        userId: task.userId,
        type: ActivityAction.TASK_OVERDUE,
      },
    });
    if (existingNotification) {
      continue;
    }
    await createNotification(
      task.userId,
      NotificationType.TASK_OVERDUE,
      "Task Overdue",
      `"${task.title}" is overdue`,
      task.id,
    );
  }
}
