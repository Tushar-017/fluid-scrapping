"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Textarea } from "@/components/ui/textarea";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      return await CreateWorkflow(data);
    },
    onSuccess: () => {
      toast.success("Workflow created successfully", { id: "create-workflow" });
    },
    onError: (error) => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
      console.error("Error creating workflow:", error);
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate({
        name: values.name,
        description: values.description ?? "",
      });
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={isPending}>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subtitle="Start building your workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of your workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full " disabled={isPending}>
                {!isPending ? "Proceed" : <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
