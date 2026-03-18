"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminAuth", "true");
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-premium p-1 rounded-3xl shadow-2xl relative overflow-hidden shimmer-border">
          <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.4rem] relative z-10 w-full space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tight">Access Restricted</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Provide Credentials</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background/50 border border-border/60 focus:border-primary rounded-xl pl-11 pr-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                    placeholder="admin"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background/50 border border-border/60 focus:border-primary rounded-xl pl-11 pr-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
