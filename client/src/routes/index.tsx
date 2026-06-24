import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../features/task/TasksPage";
import TrashPage from "../pages/TrashPage";
import NotificationsPage from "../pages/NotificationsPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <ProtectedRoute />,
    children: [{
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        {
          index: true,
          element: (
            <TasksPage />
          ),
        },
        {
          path: "tasks",
          element: <TasksPage />,
        },
        {
          path: "trash",
          element: <TrashPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPage />,
        },
        {
          path: "activities",
          element: <ActivitiesPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    }]
  },
]);
