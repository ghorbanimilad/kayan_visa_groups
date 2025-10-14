import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const visaTypes = await prisma.visaType.findMany({
    include: { countries: true } // کشورها هم بیار
  });
  const safeVisaTypes = JSON.parse(JSON.stringify(visaTypes));
  return (
    <>
      <Navbar visaTypes={safeVisaTypes} />
      {children}
      <Footer   />
    </>
  );
}
