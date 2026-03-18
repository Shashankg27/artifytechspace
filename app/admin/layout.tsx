import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | ARTIFY TECHSPACE",
  description: "Admin panel for managing submissions",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-lg font-black tracking-widest uppercase">Admin<span className="text-primary">Panel</span></h1>
        </div>
      </header>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 flex">
        {children}
      </main>
    </div>
  );
}
