"use client";

import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

export default function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutationFn = useMutation({
    mutationFn: async ({
      workflowId,
      flowDefinition,
    }: {
      workflowId: string;
      flowDefinition: string;
    }) => PublishWorkflow({ workflowId, flowDefinition }),
    onSuccess: () => {
      toast.success("Execution started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      data-workflow-id={workflowId}
      disabled={mutationFn.isPending}
      onClick={() => {
        const executionPlan = generate();
        if (!executionPlan) {
          toast.error("Invalid flow definition", { id: "flow-execution" });
          return;
        }
        toast.loading("Publishing workflow...", { id: workflowId });
        mutationFn.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
}
