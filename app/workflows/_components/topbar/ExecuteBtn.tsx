"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutationFn = useMutation({
    mutationFn: async ({
      workflowId,
      flowDefinition,
    }: {
      workflowId: string;
      flowDefinition: string;
    }) => RunWorkflow({ workflowId, flowDefinition }),
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
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
        mutationFn.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
