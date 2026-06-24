import { prisma } from "../lib/prisma";

export async function getActivities(userId: number){
  return prisma.activityLog.findMany({
    where: { userId },
    include: {
      task: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });
}

export async function createLog(
  action: string,
  userId: number,
  taskId?: number,
  oldValue?: string,
  newValue?: string,
) {
  return prisma.activityLog.create({
    data: {
      action,
      userId,
      taskId: taskId || null ,
      oldValue: oldValue || null,
      newValue: newValue || null,
    },
  });
}
