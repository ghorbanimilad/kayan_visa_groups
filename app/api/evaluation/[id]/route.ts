import { prisma } from "@/lib/prisma";

interface DeleteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: Request, { params }: DeleteParams) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const evaluation = await prisma.immigrationEvaluation.findUnique({
    where: { id: userId },
  });

  if (!evaluation) {
    return new Response("Evaluation not found", { status: 404 });
  }

  await prisma.immigrationEvaluation.delete({ where: { id: userId } });

  return new Response("Deleted successfully", { status: 200 });
}
