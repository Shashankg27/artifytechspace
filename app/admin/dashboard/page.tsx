"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Mail, Phone, Calendar } from "lucide-react";

interface Submission {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if authenticated
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      if (res.ok) {
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubmissions(submissions.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete submission.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("An error occurred while deleting.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Submissions</h2>
          <p className="text-muted-foreground mt-2">Manage contact form inquiries.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-colors text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      <div className="glass-premium rounded-3xl p-6 lg:p-8 flex-1 overflow-auto border border-border/50 shadow-2xl">
        {loading ? (
          <div className="flex items-center justify-center h-48">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Mail className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub._id} className="bg-card/40 hover:bg-card/60 rounded-2xl p-6 border border-border/40 transition-all group">
                <div className="flex flex-col lg:flex-row gap-6 lg:items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                      <h3 className="text-lg font-bold text-foreground">{sub.fullName}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{sub.subject}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${sub.email}`} className="hover:text-primary transition-colors">{sub.email}</a>
                      </div>
                      {sub.phoneNumber && (
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <a href={`tel:${sub.phoneNumber}`} className="hover:text-primary transition-colors">{sub.phoneNumber}</a>
                        </div>
                      )}
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(sub.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/80 bg-background/30 p-4 rounded-xl border border-border/30">
                      {sub.message}
                    </p>
                  </div>

                  <div className="flex lg:flex-col justify-end">
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="text-red-500/60 hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 p-3 rounded-xl transition-all"
                      title="Delete Submission"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
