import {
  Ellipsis,
  SquarePen,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Task } from "../../types/task.types";
import { useState } from "react";
import { useDeleteTask } from "../../hooks/useTasks";
import { toast } from 'sonner';
import DeleteModal from "./DeleteModal";

interface TasksTableRowProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
}

const TasksTableRow = ({
  task,
  index,
  onEdit,
}: TasksTableRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const deleteTaskM = useDeleteTask();
  const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: task.title }), 2000));
  return (
    <>
      <motion.tr
        className="hover:bg-gray-100 transition duration-200 ease-in-out"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <td className="p-4 whitespace-nowrap space-x-4">
          <div className="flex flex-col truncate max-w-50">
            <span className="text-sm font-medium text-gray-900 truncate">
              {task.title}
            </span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm ">{task.description || "-"}</span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{task.remark}</span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap max-w-50">
          <div className="flex items-center space-x-2">
            <span className="text-sm truncate">
              {task.status}
            </span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              {task.updatedAt
                ? new Date(task.updatedAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="relative">
            <motion.button
              title="Action"
              aria-label="Action"
              type="button"
              className="p-2 text-gray-600 hover:bg-[#2C3E50] hover:text-white rounded-full transition duration-200 ease-in-out cursor-pointer"
              tabIndex={0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Ellipsis size={24} />
            </motion.button>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-10 right-0 z-20 flex flex-col bg-white shadow-xl rounded-lg border border-gray-200 `min-w-40 focus:outline-none"
                tabIndex={-1}
              >
                <button
                  type="button"
                  title="Edit user"
                  aria-label="Edit user"
                  className="flex text-blue-600 hover:bg-gray-200 hover:text-blue-700 rounded-tl-lg rounded-tr-lg items-center px-6 py-4 space-x-2"
                  onClick={() => onEdit(task)}
                >
                  <SquarePen size={20} />
                  <span>Edit task</span>
                </button>
                <button
                  type="button"
                  title="Delete user"
                  aria-label="Delete user"
                  className="flex text-red-600 hover:bg-gray-200 hover:text-red-700 items-center px-6 py-3 space-x-2"
                  onClick={() => setIsOpenModal(!isModalOpen)}
                >
                  <Trash2 size={20} />
                  <span>Delete task</span>
                </button>
              </motion.div>
            )}
          </div>
        </td>
      </motion.tr>
      {isModalOpen && (
        <div className={"fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex items-center justify-center"}>
          <DeleteModal
            entityType="soft"
            isOpen={isModalOpen}
            onClose={() => setIsOpenModal(!isModalOpen)}
            onDelete={async () => {
              try {
                deleteTaskM.mutate(task.id);
                toast.success("This task deleted successfully.");
              } catch {
                toast.error("Failed to delete the task. Please try again.");
              }
            }}
          />
        </div>
      )}
    </>
  );
}

export default TasksTableRow;
