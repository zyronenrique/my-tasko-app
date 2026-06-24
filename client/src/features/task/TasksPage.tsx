import { motion } from 'framer-motion';
import { Funnel, Plus, Search } from "lucide-react";
import { useState } from 'react';
import TaskFormModal from './TaskFormModal';
import { useTasks } from '../../hooks/useTasks';
import TasksTableHeader from './TasksTableHeader';
import SkeletonTasksList from '../../pages/SkeletonTasksList';
import TasksTableRow from './TasksTableRow';
import CustomSelect from '../../pages/CustomSelect';
import type { Task } from '../../types/task.types';

const TasksPage = () => {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRemark, setSelectedRemark] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("desc");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const {data, isPending} = useTasks({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    remark: selectedRemark,
    status: selectedStatus,
    sortBy: sortBy,
    order: orderBy,
  })
  const tasks = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };
  const handleRemarkFilter = (value: string) => {
    setSelectedRemark(value);
    setCurrentPage(1);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setModalMode("edit");
    setOpenTaskForm(!openTaskForm);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            My Tasks
          </h1>
          <div className="flex items-center gap-2 py-2">
            <div className="relative flex items-center bg-white rounded-lg">
              <button
                title="Search"
                type="button"
                className="absolute left-1 p-2 text-gray-500 hover:text-[#2C3E50]"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-10 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                title="Filter"
                aria-label="Filter"
                type="button"
                className="flex px-4 py-2 text-lg font-semibold items-center border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition duration-200 ease-in-out"
                tabIndex={0}
                onClick={() => setOpenFilter(!openFilter)}
              >
                <Funnel size={20} className="mr-2" />
                Filter
              </button>
              {openFilter && (
                <motion.div
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -10}}
                  transition={{duration: 0.2, ease: "easeInOut"}}
                  className="absolute top-13 right-0 z-20 flex flex-col bg-white shadow-lg rounded-lg p-2 border border-gray-200 min-w-40 focus:outline-none"
                  tabIndex={-1}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") close();
                  }}
                >
                  <div className="px-2">
                    <CustomSelect
                      label="Remark"
                      value={selectedRemark}
                      onChange={(e) => handleRemarkFilter(e.target.value)}
                      options={[
                        { value: "IN_COMPLETE", label: "IN_COMPLETE" },
                        { value: "COMPLETE", label: "COMPLETE" },
                      ]}
                    />
                    <CustomSelect
                      label="Status"
                      value={selectedStatus}
                      onChange={(e) => handleStatusFilter(e.target.value)}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "INACTIVE", label: "INACTIVE" },
                      ]}
                    />
                    <CustomSelect
                      label="Sort By"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      options={[
                        { value: "createdAt", label: "Created At" },
                        { value: "title", label: "Title" },
                        { value: "dueDate", label: "DueDate" },
                        { value: "updatedAt", label: "Updated At" },
                      ]}
                    />
                    <CustomSelect
                      label="Order By"
                      value={orderBy}
                      onChange={(e) => setOrderBy(e.target.value)}
                      options={[
                        { value: "asc", label: "↓ A-Z" },
                        { value: "desc", label: "↑ Z-A" },
                      ]}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <motion.button
              type="button"
              className={`flex items-center gap-2 bg-blue-400 rounded-lg px-4 py-2 border border-gray-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> {
                setModalMode("create");
                setSelectedTask(null);
                setOpenTaskForm(!openTaskForm);
              }}
            >
              <Plus size={20} />
              <span className='text-lg'>Add task</span>
            </motion.button>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 shadow-sm max-h-[65vh] overflow-y-visible p-1">
          <table className="min-w-full divide-y divide-gray-200 caption-bottom ">
            <TasksTableHeader />
            <tbody className="bg-white text-left divide-y divide-gray-200">
              {isPending
                ? <SkeletonTasksList />
                : tasks && tasks.length > 0 ?
                  tasks.map((task, index) => (
                    <TasksTableRow
                      key={task.id}
                      task={task}
                      index={index}
                      onEdit={handleEditTask}
                    />
                  ))
                : (
                  <tr>
                    <td colSpan={8} className="py-4 text-center">
                      <div className="flex flex-col items-center justify-center h-[50vh] w-full">
                        <span className="font-medium text-6xl text-gray-800">No tasks found.</span>
                      </div>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className={`px-6 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2C3E50] text-white hover:bg-[#34495E]"}`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className={`px-10 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#2C3E50] text-white hover:bg-[#34495E]"}`}
          >
            Next
          </button>
        </div>
      </div>
      {openTaskForm && (
        <div className={"fixed inset-0 bg-black/10 z-50 backdrop-blur-xs flex items-center justify-center overflow-hidden"}>
          <TaskFormModal
            isOpen={openTaskForm}
            onClose={() => setOpenTaskForm(!openTaskForm)}
            mode={modalMode}
            task={selectedTask}
          />
        </div>
      )}
    </>
  )
}

export default TasksPage

