

import EditContentForm from "@/components/dashboard/EditContentForm";

type Props = { params: { id: string } };

export default async function EditContentPage({ params }: Props) {
  const resolvedParams = await params; // unwrap کردن Promise
  const contentId = resolvedParams.id;
  return <EditContentForm contentId={contentId} />;
}
