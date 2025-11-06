import { prisma } from "@/lib/prisma";

interface DeleteParams {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: DeleteParams) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const evaluation = await prisma.immigrationEvaluation.findUnique({
    where: { id },
  });

  if (!evaluation) {
    return new Response("Evaluation not found", { status: 404 });
  }

  await prisma.immigrationEvaluation.delete({ where: { id } });

  return new Response("Deleted successfully", { status: 200 });
}
