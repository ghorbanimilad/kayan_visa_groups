"use client";

import { useState } from "react";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      
      <div className="flex-1 flex-col">
        {/* Header */}
        <AdminHeader toggleSidebar={() => setIsOpen(!isOpen)} />
        
        {/* Main content */}
        <main className="flex-1 px-4">{children}</main>
      </div>
    </div>
  );
}
