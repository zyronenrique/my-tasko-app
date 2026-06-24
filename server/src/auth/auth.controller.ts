import type { Request, Response } from "express";
import * as authService from "./auth.service";

export async function refresh(req: Request, res: Response) {
  const tokens = await authService.refresh(req.body.refreshToken);
  return res.json(tokens);
}

export async function register(req: Request, res: Response) {
  const result = await authService.register(
    req.body.email,
    req.body.password,
    req.body.name
  );
  return res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const result = await authService.login(
    req.body.email,
    req.body.password
  );
  return res.json(result);
}

export async function me(req: Request, res: Response) {
  return res.json({user: req.user});
}

export async function logout(req: Request, res: Response) {
  await authService.logout(req.user!.userId);
  return res.json({message: "Logged out successfully" });
}
