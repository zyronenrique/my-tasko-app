import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validateQuery(
  schema: ZodType
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: result.error.issues,
      });
    }
    res.locals.query = result.data;
    next();
  };
}
