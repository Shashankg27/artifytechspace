import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | ARTIFY TECHSPACE",
  description: "Admin panel for managing submissions",
};

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
