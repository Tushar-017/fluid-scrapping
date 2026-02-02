import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const { userId } = auth();
  if (!userId) return <div>unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <pre className="h-screen">{JSON.stringify(workflow, null, 4)}</pre>;
}

export default page;
