"use client";

import { UnpublishWorkflow } from "@/actions/workflows/unPublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

export default function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const mutationFn = useMutation({
    mutationFn: async (workflowId: string) => UnpublishWorkflow(workflowId),
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
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
        toast.loading("Un-publishing workflow...", { id: workflowId });
        mutationFn.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
}
