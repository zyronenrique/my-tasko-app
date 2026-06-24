import type { Request, Response } from "express";
import * as activityService from "./activity.service";

export async function getActivities(req: Request, res: Response) {
  const activities = await activityService.getActivities(req.user!.userId);
  return res.json(activities);
}
