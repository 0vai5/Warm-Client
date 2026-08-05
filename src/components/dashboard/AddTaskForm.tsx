import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
    createTaskFormSchema,
    type CreateTaskFormInput,
} from "@/lib/validations/task";
import { useTaskStore } from "@/store/task.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "@/components/Loader";

const AddTaskForm = () => {
  const { createTask } = useTaskStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormInput>({
    resolver: zodResolver(createTaskFormSchema),
  });

  const onSubmit = async (data: CreateTaskFormInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createTask({
        title: data.title,
        description: data.description || undefined,
        priority: data.priority || undefined,
        effort: data.effort || undefined,
        category: data.category || undefined,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
      });
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-md border border-border bg-card p-4"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Call the electrician"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="priority">Priority</Label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="priority" className="w-full">
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
          <Label htmlFor="effort">Effort</Label>
          <Controller
            control={control}
            name="effort"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="effort" className="w-full">
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

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dueDate">Due date</Label>
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
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
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Input id="category" placeholder="work" {...register("category")} />
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(buttonVariants({ size: "sm" }), "mt-1")}
      >
        {isSubmitting ? <Loader /> : "Add task"}
      </button>
    </form>
  );
};

export default AddTaskForm;
