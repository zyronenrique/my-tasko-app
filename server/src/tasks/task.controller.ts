import type { Request, Response } from "express";
import * as taskService from "./task.services";
import type { GetTasksQuery } from "./task.validation";

export async function getTaskStats(req: Request, res: Response) {
  const stats = await taskService.getTaskStats(req.user!.userId);
  return res.json(stats);
}

export async function getTasks(req: Request, res: Response) {
  const query = res.locals.query as GetTasksQuery;
  const tasks = await taskService.getTasks(req.user!.userId, query);
  return res.json(tasks);
}

export async function getTaskById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = Number(req.user!.userId);
  const task = await taskService.getTaskById(id, userId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  return res.json(task);
}

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask({...req.body, userId: req.user!.userId});
  return res.json(task);
}

export async function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = Number(req.user!.userId);
  const task = await taskService.updateTask(id, userId, req.body);
  return res.json(task);
}

export async function softDeleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = Number(req.user!.userId);
  await taskService.softDeleteTask(id, userId);
  return res.json({message: "Task soft deleted successfully"});
}

export async function getSoftDeletedTasks(req: Request, res: Response) {
  const task = await taskService.getSoftDeletedTasks(req.user!.userId);
  return res.json(task);
}

export async function restoreTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const task = await taskService.restoreTask(id, req.user!.userId);
  return res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = Number(req.user!.userId);
  await taskService.deleteTask(id, userId);
  return res.json({message: "Task deleted permanently"});
}
