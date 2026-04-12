import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { WorkflowExecution } from "@prisma/client";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("execution not found");
  }

  const environment = { phases: {} };

  await initializeWorkflowExecution(execution.id, execution.workflowId);
  await initializePhaseStatuses(execution);

  let executionFailed = false;
  for (const phase of execution.phases) {
    try {
      // execute phase
      // update phase status and credits consumed
    } catch (error) {
      executionFailed = true;
      // update phase status to failed
      break;
    }
  }

  // finalize execution
  // cleanup environment
  revalidatePath("workflows/runs/");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string,
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
    },
  });
}

async function initializePhaseStatuses(execution: any) {}
