import ReservationContent from "@/components/animation/ReservationContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "رزرو تایم مشاوره",
  description: " رزرو مشاوره موسسه مهاجرتی ماکان",
  keywords: "ویزا,مشاوره مهاجرتی,وکیل مهاجرتی,سایت مهاجرتی,ویزای کار,موسسه مهاجرتی,مهاجرت, اقامت, ویزای شینگن, ویزای استارت آپ"
};

export default function Reservation() {
      return (
            <ReservationContent />
      )
}
