import { memo } from "react";
import { motion } from "framer-motion";
import { useCreateEditTask } from "./useCreateEditTask";
import { ErrorIcon } from "../../pages/icons";
import CustomSelect from "../../pages/CustomSelect";
import CustomInput from "../../pages/CustomInput";
import type { Task } from "../../types/task.types";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task | null;
}

const TaskFormModal = memo(({
  isOpen,
  onClose,
  mode,
  task,
}: TaskFormModalProps) => {

  const {
    title,
    description,
    remark,
    status,
    dueDate,
    form,
    onSubmit,
    isPending,
    serverError,
  } = useCreateEditTask({mode, task, onClose});

  const { register, formState: { errors } } = form;

  const errorMessage =
    serverError ||
    errors.title?.message ||
    errors.description?.message ||
    errors.remark?.message ||
    errors.status?.message ||
    errors.dueDate?.message;

  const remarkOptions = [
    { value: "IN_COMPLETE", label: "IN_COMPLETE" },
    { value: "COMPLETE", label: "COMPLETE" },
  ];
  const statusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`relative flex-1 max-w-md bg-white py-10 px-12 rounded-lg shadow-lg`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{
          duration: 0.3,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.4 },
        }}
      >
        <motion.button
          type="button"
          title="Close"
          className="absolute top-3 right-5 text-black text-3xl cursor-pointer"
          onClick={() => {
            onClose();
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          &times;
        </motion.button>
        {/* Error message display */}
        {errorMessage && (
          <motion.div
            className="relative flex mb-6 py-5 px-15 bg-[#FBE6E6] text-sm justify-center items-center rounded-sm shadow-sm drop-shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorIcon />
            <p>{errorMessage}</p>
          </motion.div>
        )}
        <form onSubmit={onSubmit}>
          <div className="flex text-left justify-between items-center">
            <h3 className="text-lg font-semibold">
              {mode === "edit"
                ? "Edit task"
                : "Create a new task"}
            </h3>
          </div>
          <div className="flex flex-col mt-4">
            {/* Title */}
            <div className="mt-2 mb-2 text-left relative">
              <input
                disabled={isPending}
                title="Title"
                type="text"
                id="Title"
                required={mode !== "edit"}
                autoFocus
                minLength={1}
                className={`w-full p-4 border rounded-sm transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${title ? "border-[#2C3E50]" : "border-gray-300"}`}
                placeholder=" "
                {...register("title")}
              />
              <label
                className={`absolute text-lg font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${title ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
                htmlFor="Yunit number"
              >
                Title
              </label>
            </div>
            {/* Description */}
            <div className="mt-2 mb-2 text-left relative">
              <input
                disabled={isPending}
                title="Description"
                type="text"
                required={mode !== "edit"}
                minLength={1}
                className={`w-full p-4 border rounded-sm transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${description ? "border-[#2C3E50]" : "border-gray-300"}`}
                placeholder=" "
                {...register("description")}
              />
              <label
                className={`absolute text-lg font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${description ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
                htmlFor="Yunit name"
              >
                Description
              </label>
            </div>
            {/* Remark */}
            {mode === "edit" && (
              <CustomSelect
                required
                label="Remark"
                value={remark}
                options={remarkOptions}
                {...register("remark")}
              />
            )}
            {/* Status */}
            {mode === "edit" && (
              <CustomSelect
                required
                label="Status"
                value={status}
                options={statusOptions}
                {...register("status")}
              />
            )}
            {/* DueDate */}
            <CustomInput
              type="date"
              label="Due Date"
              value={dueDate}
              {...register("dueDate")}
            />
          </div>
          {/* Register button */}
          <motion.button
            type="submit"
            className={`w-full bg-[#2C3E50] text-lg text-white mt-4 px-15 py-3 rounded-lg shadow-md drop-shadow-lg ${isPending ? "opacity-50 cursor-not-allowed" : "hover:font-medium hover:border-[#386BF6] hover:bg-[#34495e]"}`}
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.02 }}
            whileTap={{ scale: isPending ? 1 : 0.98 }}
          >
            <span>
              {mode === "edit"
                ? "Update task"
                : "Add task"}
            </span>
          </motion.button>
        </form>
      </motion.div>
    </>
  );
});

export default TaskFormModal;
