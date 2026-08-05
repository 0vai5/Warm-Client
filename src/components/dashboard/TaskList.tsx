import TaskCard from "./TaskCard"
import type { Task } from "@/types/task.types"

interface TaskListProps {
  tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  )
}

export default TaskList