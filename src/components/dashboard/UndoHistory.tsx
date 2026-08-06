import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUndoStore } from "@/store/undo.store";
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

const ACTION_LABELS: Record<string, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
};

const UndoHistory = () => {
  const { history, isLoading, isUndoing, error, fetchHistory, undoAction } =
    useUndoStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const hasItems = history.length > 0;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center mb-4 gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground",
        )}
      >
        <ClockCounterClockwiseIcon size={13} />
        Recent actions
        {hasItems && (
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
            {history.length}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="start" className="w-72">
        {isLoading && history.length === 0 && (
          <p className="font-mono text-[11px] text-muted-foreground">
            Loading history…
          </p>
        )}

        {!isLoading && !hasItems && (
          <p className="font-mono text-[11px] text-muted-foreground">
            No AI actions yet.
          </p>
        )}

        {error && (
          <p className="font-mono text-[11px] text-destructive">{error}</p>
        )}

        {hasItems && (
          <div className="flex flex-col gap-2">
            {history.map((action) => (
              <div
                key={action._id}
                className="flex items-center justify-between gap-2"
              >
                <span className="font-mono text-[11px] text-foreground">
                  {ACTION_LABELS[action.actionType] ?? action.actionType}
                </span>

                <button
                  type="button"
                  onClick={() => undoAction(action._id)}
                  disabled={isUndoing}
                  className="flex items-center gap-1 font-mono text-[11px] text-primary transition-colors hover:text-primary/80 disabled:opacity-50"
                >
                  Undo
                </button>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UndoHistory;
