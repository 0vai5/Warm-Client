import AddTaskForm from "@/components/dashboard/AddTaskForm";
import ChatPane from "@/components/dashboard/ChatPane";
import TaskList from "@/components/dashboard/TaskList";
import UndoHistory from "@/components/dashboard/UndoHistory";
import UserMenu from "@/components/UserMenu";
import { useTaskStore } from "@/store/task.store";
import { useEffect } from "react";

const DashboardHome = () => {
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <p className="font-heading text-lg lowercase tracking-tight">warm</p>
        <UserMenu />
      </header>

      <div className="flex flex-1 flex-col md:flex-row md:overflow-hidden">
        <main className="flex flex-col gap-4 scrollbar-none border-b border-border p-4 sm:p-6 md:flex-1 md:min-h-0 md:overflow-y-auto scroll-fade md:border-b-0 md:border-r">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-xl">Today</h1>
            <p className="font-mono text-xs whitespace-nowrap text-muted-foreground">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>

          <AddTaskForm />

          {isLoading && (
            <p className="font-mono text-xs text-muted-foreground">
              Loading tasks…
            </p>
          )}

          {error && (
            <p className="font-mono text-xs text-destructive">{error}</p>
          )}

          {!isLoading && !error && tasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks yet. Say what's on your mind in the chat.
            </p>
          )}

          {!isLoading && !error && tasks.length > 0 && (
            <TaskList tasks={tasks} />
          )}
        </main>

        <aside className="flex w-full shrink-0 flex-col p-4 sm:p-6 md:w-95 md:min-h-0">
          <div className="flex justify-between text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Chat
            </p>
            <UndoHistory />
          </div>
          <ChatPane />
        </aside>
      </div>
    </div>
  );
};

export default DashboardHome;
