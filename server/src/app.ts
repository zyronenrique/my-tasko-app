import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskRoutes from "./tasks/task.routes";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./auth/auth.routes";
import activityRoutes from "./activity/activity.routes";
import notificationRoutes from "./notifications/notification.routes";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Tasko API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorHandler);

export default app;
