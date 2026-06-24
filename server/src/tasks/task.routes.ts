import { Router } from "express";

import { getTasks, getTaskById, createTask, updateTask, softDeleteTask, getTaskStats, getSoftDeletedTasks, restoreTask, deleteTask } from "./task.controller";
import { validate } from "../middleware/validate.middleware";
import { createTaskSchema, getTasksSchema, updateTaskSchema } from "./task.validation";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateQuery } from "../middleware/validateQuery.middleware";

const router = Router();
router.use(authMiddleware);
router.get("/", authMiddleware, validateQuery(getTasksSchema), getTasks);
router.post("/", validate(createTaskSchema), createTask);
router.get("/stats", authMiddleware, getTaskStats);
router.get("/trash", authMiddleware, getSoftDeletedTasks);
router.get("/:id", getTaskById);
router.patch("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", authMiddleware, softDeleteTask);
router.patch("/:id/restore", authMiddleware, restoreTask);
router.delete("/:id/permanent", deleteTask)

export default router;
