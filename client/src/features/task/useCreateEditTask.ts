import { useForm, useWatch } from 'react-hook-form';
import { createTaskSchema, type TaskFormData } from "../schemas/taks.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask, useUpdateTask } from '../../hooks/useTasks';
import type { Task } from '../../types/task.types';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface CreateEditProps {
  mode: "create" | "edit";
  task?: Task | null;
  onClose: () => void
}

export const useCreateEditTask = ({ mode, task, onClose }: CreateEditProps) => {
  const createTaskM = useCreateTask();
  const updateTaskM = useUpdateTask();
  const form = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      remark: "IN_COMPLETE",
      status: "INACTIVE",
      dueDate: "",
    },
  });
  const title = useWatch({
    control: form.control,
    name: "title",
  });
  const description = useWatch({
    control: form.control,
    name: "description",
  });
  const remark = useWatch({
    control: form.control,
    name: "remark",
  });
  const status = useWatch({
    control: form.control,
    name: "status",
  });
  const dueDate = useWatch({
    control: form.control,
    name: "dueDate",
  });
  const onSubmit = form.handleSubmit((data) => {
    if (mode === "edit" && task) {
      updateTaskM.mutate({
        id: task.id,
        data: {
          title: data.title,
          description: data.description,
          remark: data.remark,
          status: data.status,
          dueDate: data.dueDate
            ? new Date(data.dueDate).toISOString()
            : undefined,
        },
      });
      toast.success("Task has been updated successfully.");
    } else {
      createTaskM.mutate({
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString()
          : undefined,
      });
      toast.success("New task has been created successfully.");
    }
    onClose();
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        remark: task.remark,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : "",
      });
    }
  }, [mode, task, form]);

  return {
    title,
    description,
    remark,
    status,
    dueDate,
    form,
    onSubmit,
    isPending: createTaskM.isPending,
    serverError:
      createTaskM.isError
        ? "Failed to create new task. Please try again!"
        : "",
  };
};
