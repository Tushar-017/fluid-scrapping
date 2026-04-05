import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import TopBar from "@/app/workflows/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

const ExecutionViewerPage = ({
  params,
}: {
  params: { workflowId: string; executionId: string };
}) => {
  const { workflowId, executionId } = params;
  return (
    <div className="flex h-screen flex-col w-full overflow-hidden">
      <TopBar
        title="Workflow Run Details"
        workflowId={workflowId}
        hideActionBtns={true}
        subtitle={`Run ID: ${executionId}`}
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2Icon className="animate-spin h-10 w-10 stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper
            workflowId={workflowId}
            executionId={executionId}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;

async function ExecutionViewerWrapper({
  workflowId,
  executionId,
}: {
  workflowId: string;
  executionId: string;
}) {
  // await waitFor(4000); // Simulating loading time for fetching execution details
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Workflow execution not found
      </div>
    );
  }
  return <ExecutionViewer initialWorkflowExecution={workflowExecution} />;
}
