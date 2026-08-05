import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useTaskStore } from "@/store/task.store";
import TaskList from "@/components/dashboard/TaskList";
import AddTaskForm from "@/components/dashboard/AddTaskForm";

const DashboardHome = () => {
  const user = useAuthStore((state) => state.user);
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <p className="font-heading text-lg lowercase tracking-tight">warm</p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {user?.name}
        </p>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <main className="flex min-h-0 flex-1 flex-col border-b border-border p-4 sm:p-6 md:border-b-0 md:border-r">
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-xl">Today</h1>
            <p className="font-mono text-xs whitespace-nowrap text-muted-foreground">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="mb-4">
            <AddTaskForm />
          </div>

          {isLoading && (
            <p className="font-mono text-xs text-muted-foreground">
              Loading tasks…
            </p>
          )}

          {error && (
            <p className="font-mono text-xs text-destructive">{error}</p>
          )}

          <div className="flex min-h-0 flex-1 flex-col">
            {!isLoading && !error && tasks.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No tasks yet. Say what's on your mind in the chat.
              </p>
            )}

            {!isLoading && !error && tasks.length > 0 && (
              <TaskList tasks={tasks} />
            )}
          </div>
        </main>

        <aside className="w-full shrink-0 p-4 sm:p-6 md:w-95">
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Chat
          </p>
        </aside>
      </div>
    </div>
  );
};

export default DashboardHome;
