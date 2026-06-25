import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useActivities } from "../hooks/useActivities";

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { data: activities=[], isPending, error } = useActivities();

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
        <h1 className="text-2xl font-bold">Activity Logs</h1>
      </div>
      <section className="mt-2 max-h-130 overflow-y-auto">
        {isPending ? (
          <div className="text-center text-gray-500">
            No activities yet.
          </div>
        ) : (
          <div className="space-y-2">
            {activities.length > 0 &&
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`rounded-lg border p-4 shadow-xs transition bg-blue-50 border-blue-100`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">
                      {activity.action}
                    </h2>
                  </div>
                  <p className="mt-1 text-sm">
                    {activity.oldValue} was changed to {activity.newValue}
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ActivitiesPage;
