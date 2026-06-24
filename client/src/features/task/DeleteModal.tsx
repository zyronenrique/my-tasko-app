import { memo } from "react";
import { motion } from "framer-motion";

interface DeleteUserModalProps {
  entityType: "soft" | "permanent";
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteModal = memo(({
  entityType,
  isOpen,
  onClose,
  onDelete,
}: DeleteUserModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <motion.div
        className={`flex flex-col flex-1 items-center max-w-md bg-white py-10 px-15 rounded-lg shadow-lg`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{
          duration: 0.3,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.4 },
        }}
      >
        {/* Modal content */}
        <div className="rounded-full bg-red-500 size-15 items-center justify-center mx-auto mb-4">
          <motion.div
            className="text-5xl font-bold text-white size-15 flex items-center justify-center mx-auto mb-4"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: [1, -1, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            !
          </motion.div>
        </div>
        <h2 className="text-xl font-bold text-center mb-4 max-w-75">
          Are you sure you want to delete this task ?
        </h2>
        <div className="flex w-full  justify-center gap-4 mt-2">
          <button
            type="button"
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            No
          </button>
        </div>
        <p className="w-full text-gray-600 text-xs text-center mt-4 py-2 px-8 bg-[#FBE6E6] rounded-sm shadow-sm drop-shadow-sm">
          {entityType === "soft" ? "Task will move to trash bin" : "Warning: This action cannot be undone!"}
        </p>
      </motion.div>
    </>
  );
});

export default DeleteModal;
