import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/store/task.store";
import type { Task } from "@/types/task.types";
import { CheckCircleIcon, CircleIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import TaskDrawer from "./TaskDrawer";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isCompleted = task.status === "completed";

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateTask(task._id, {
        status: isCompleted ? "pending" : "completed",
      });
    } catch {
      // TODO: toast error once toast pattern is wired for tasks
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setDeleteOpen(false);
    } catch {
      // TODO: toast error
    }
  };

  const dueLabel = new Date(task.dueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div
        onClick={() => setDrawerOpen(true)}
        className={cn(
          "group flex cursor-pointer items-center justify-between gap-4 border-b border-border px-5 py-3 last:border-b-0 hover:bg-accent/50",
          task.isAiGenerated && "border-l-2 border-l-primary",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={handleToggleComplete}
            aria-label={isCompleted ? "Mark as pending" : "Mark as complete"}
            className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            {isCompleted ? (
              <CheckCircleIcon
                size={18}
                weight="fill"
                className="text-primary"
              />
            ) : (
              <CircleIcon size={18} />
            )}
          </button>

          <p
            className={cn(
              "truncate text-sm text-foreground",
              isCompleted && "text-muted-foreground line-through",
            )}
          >
            {task.title}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <span>{task.priority}</span>
          <span>{task.effort}</span>
          {!isCompleted && <span>{dueLabel}</span>}

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // don't open the drawer when opening delete dialog
                setDeleteOpen(true);
              }}
              aria-label="Delete task"
              className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
            >
              <TrashIcon size={14} />
            </button>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete task</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete "{task.title}"? This can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <TaskDrawer task={task} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};

export default TaskCard;
