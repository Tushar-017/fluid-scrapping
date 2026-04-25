"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow(workflowId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });
  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("Only published workflows can be unpublished");
  }

  await prisma.workflow.update({
    where: { id: workflowId, userId },
    data: { status: WorkflowStatus.DRAFT, executionPlan: null, creditsCost: 0 },
  });

  revalidatePath(`/workflows/editor/${workflowId}`);
}
