// src/components/dashboard/TaskDrawer.tsx
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  updateTaskFormSchema,
  type UpdateTaskFormInput,
} from "@/lib/validations/task"
import { useTaskStore } from "@/store/task.store"
import type { Task } from "@/types/task.types"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@phosphor-icons/react"

interface TaskDrawerProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TaskDrawer = ({ task, open, onOpenChange }: TaskDrawerProps) => {
  const { updateTask } = useTaskStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskFormInput>({
    resolver: zodResolver(updateTaskFormSchema),
  })

  useEffect(() => {
    if (!open) return
    reset({
      title: task.title,
      description: task.description || undefined,
      priority: task.priority,
      effort: task.effort,
      status: task.status,
      category: task.category || undefined,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    })
  }, [open, task, reset])


  const onSubmit = async (data: UpdateTaskFormInput) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await updateTask(task._id, {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority || undefined,
        effort: data.effort || undefined,
        status: data.status || undefined,
        category: data.category || undefined,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
      })
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
          <SheetDescription>
            {task.isAiGenerated ? "Created by Warm" : "Update the details below."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" {...register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-priority">Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="edit-priority" className="w-full">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-effort">Effort</Label>
              <Controller
                control={control}
                name="effort"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="edit-effort" className="w-full">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick">Quick</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="edit-status" className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="postponed">Postponed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-dueDate">Due date</Label>
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full justify-start gap-2 font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon size={14} />
                      {field.value
                        ? field.value.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        : "Select date"}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-category">Category</Label>
              <Input id="edit-category" {...register("category")} />
            </div>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}
        </form>

        <SheetFooter>
          <button
            type="submit"
            form={undefined}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={buttonVariants({ size: "sm" })}
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TaskDrawer