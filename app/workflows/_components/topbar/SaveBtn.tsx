"use client";

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function SaveBtn({ workflowId }: { workflowId?: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: async (data: { workflowId: string; flowData: any }) => {
      return await UpdateWorkflow({
        id: data.workflowId,
        definition: data.flowData,
      });
    },
    onSuccess: () => {
      toast.success("Workflow saved successfully", { id: "save-workflow" });
    },
    onError: (error) => {
      toast.error("Failed to save workflow", { id: "save-workflow" });
      console.error("Error saving workflow:", error);
    },
  });

  const handleSave = () => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading("Saving workflow...", { id: "save-workflow" });
    saveMutation.mutate({
      workflowId: workflowId!,
      flowData: workflowDefinition,
    });
  };

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={handleSave}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}
