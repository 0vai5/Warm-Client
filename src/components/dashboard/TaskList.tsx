// src/components/dashboard/TaskList.tsx
import TaskCard from "./TaskCard"
import type { Task } from "@/types/task.types"

interface TaskListProps {
  tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
  const pending = tasks.filter((t) => t.status !== "completed")
  const completed = tasks.filter((t) => t.status === "completed")

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        {pending.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted-foreground">
            Nothing pending — you're clear.
          </p>
        ) : (
          pending.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>

      {completed.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            Completed ({completed.length})
          </p>
          <div className="overflow-hidden rounded-md border border-border bg-card">
            {completed.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList