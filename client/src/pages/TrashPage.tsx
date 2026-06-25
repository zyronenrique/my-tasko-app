import { motion } from "framer-motion"
import { ChevronLeft, Ellipsis, Trash2, ArchiveRestore } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { usePermanentDeleteTask, useRestoreTask, useTrash } from "../hooks/useTasks";
import { useState } from "react";
import { toast } from "sonner";

const TrashPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const { data: trash=[], isPending, error } = useTrash();
  const deleteTaskM = usePermanentDeleteTask();
  const restoreTaskM = useRestoreTask();

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
        <h1 className="text-2xl font-bold">Trash</h1>
      </div>
      <section className="mt-2 max-h-130 overflow-y-visible">
        {isPending ? (
          <div className="text-center text-gray-500">
            No trash yet.
          </div>
        ) : (
          <div className="space-y-2">
            {trash.length > 0 &&
              trash.map((trash) => (
                <div
                  key={trash.id}
                  className={`rounded-lg border p-4 shadow-xs transition bg-red-50 border-red-100`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">
                      {trash.title}
                    </h2>
                    <div className="relative">
                      <motion.button
                        title="Action"
                        aria-label="Action"
                        type="button"
                        className="p-2 text-gray-600 hover:bg-[#2C3E50] hover:text-white rounded-full transition duration-200 ease-in-out cursor-pointer"
                        tabIndex={0}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(isOpen === trash.id ? null : trash.id)}
                      >
                        <Ellipsis size={24} />
                      </motion.button>
                      {isOpen === trash.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute top-10 right-0 z-20 flex flex-col bg-white shadow-sm rounded-lg border border-gray-200 min-w-55 focus:outline-none"
                        >
                          <button
                            type="button"
                            className="flex text-green-600 hover:bg-gray-200 hover:text-green-700 items-center px-6 py-4 space-x-2"
                            onClick={() => {
                              try {
                                restoreTaskM.mutate(trash.id);
                                toast.success("This task has been restored");
                              } catch (error) {
                                toast.error("Failed to restore the task. Please try again.");
                              }
                            }}
                          >
                            <ArchiveRestore size={20} />
                            <span>Restore task</span>
                          </button>
                          <button
                            type="button"
                            className="flex text-red-600 hover:bg-gray-200 hover:text-red-700 items-center px-6 py-3 space-x-2"
                            onClick={() => {
                              try {
                                deleteTaskM.mutate(trash.id);
                                toast.success("This task has been deleted");
                              } catch (error) {
                                toast.error("Failed to delete the task. Please try again.");
                              }
                            }}
                          >
                            <Trash2 size={20} />
                            <span>Delete permanently</span>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm">
                    {trash.description}
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    Deleted at {new Date(trash.deletedAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default TrashPage;
