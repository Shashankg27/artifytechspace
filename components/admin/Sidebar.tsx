"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Mail, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const menuItems = [
  { name: "Submissions", icon: Mail, path: "/admin/dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Only show sidebar if not on the login page
  if (pathname === "/admin/login") return null;

  return (
    <aside className="w-64 h-screen bg-card/30 backdrop-blur-xl border-r border-border/40 flex flex-col sticky top-0">
      <div className="p-6 mb-8">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase text-foreground">
              Admin<span className="text-primary">Panel</span>
            </h1>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1">
              Management Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary'}`} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3 h-3" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all group"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
