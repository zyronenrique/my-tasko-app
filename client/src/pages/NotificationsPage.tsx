import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { data: notifications=[], isPending, error } = useNotifications();

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <motion.button
          type="button"
          className="flex items-center justify-center gap-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=> navigate("/dashboard")}
        >
          <ChevronLeft size={20}/>
          <span className="font-semibold">Back</span>
        </motion.button>
        <h1 className="text-2xl font-bold">Notification</h1>
      </div>
      <section className="mt-2 max-h-130 overflow-y-auto">
        {isPending ? (
          <div className="text-center text-gray-500">
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.length > 0 &&
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border border-gray-200 p-4 shadow-xs transition ${
                    notification.read
                      ? "bg-white"
                      : "bg-blue-50 border-blue-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">
                      {notification.title}
                    </h2>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="mt-1 text-sm">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default NotificationsPage
