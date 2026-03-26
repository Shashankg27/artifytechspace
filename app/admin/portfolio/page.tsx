"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Loader2, Image as ImageIcon, Folder } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "categories">("projects");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Category Form State
  const [catData, setCatData] = useState({ name: "", description: "" });
  const [catImage, setCatImage] = useState<File | null>(null);

  // Project Form State
  const [projData, setProjData] = useState({
    title: "",
    categoryId: "",
    description: "",
    link: "",
    techStack: "",
    features: "",
  });
  const [projImages, setProjImages] = useState<FileList | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, portRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/portfolio")
      ]);
      const [cats, ports] = await Promise.all([catRes.json(), portRes.json()]);
      
      if (Array.isArray(cats)) setCategories(cats);
      if (Array.isArray(ports)) setPortfolios(ports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- Category Handlers ---
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catImage) return alert("Please select a category image");

    setSubmitting(true);
    const data = new FormData();
    data.append("name", catData.name);
    data.append("description", catData.description);
    data.append("image", catImage);

    try {
      const res = await fetch("/api/categories", { method: "POST", body: data });
      if (res.ok) {
        setCatData({ name: "", description: "" });
        setCatImage(null);
        const el = document.getElementById("catImageInput") as HTMLInputElement;
        if (el) el.value = "";
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create category");
      }
    } catch (err) {
      alert("Error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete category? This will fail if projects are still linked to it.")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
      else {
        const err = await res.json();
        alert(err.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Project Handlers ---
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projImages || projImages.length === 0) return alert("Select at least one image");
    if (!projData.categoryId) return alert("Select a category");

    setSubmitting(true);
    const data = new FormData();
    data.append("title", projData.title);
    data.append("categoryId", projData.categoryId);
    data.append("description", projData.description);
    data.append("link", projData.link);
    data.append("techStack", projData.techStack);
    data.append("features", projData.features);
    
    Array.from(projImages).forEach(file => data.append("images", file));

    try {
      const res = await fetch("/api/portfolio", { method: "POST", body: data });
      if (res.ok) {
        setProjData({ title: "", categoryId: "", description: "", link: "", techStack: "", features: "" });
        setProjImages(null);
        const el = document.getElementById("projImagesInput") as HTMLInputElement;
        if (el) el.value = "";
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create project");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-black text-foreground">Content Factory</h1>
        <div className="flex bg-card/50 p-1 rounded-xl border border-border">
          <button 
            onClick={() => setActiveTab("projects")} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "projects" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ImageIcon className="w-4 h-4" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab("categories")} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "categories" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Folder className="w-4 h-4" /> Categories
          </button>
        </div>
      </div>
      
      {/* CATEGORIES TAB */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-card/30 p-6 rounded-xl border border-border/40 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> New Category
            </h2>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Name</label>
                <input required value={catData.name} onChange={e => setCatData({ ...catData, name: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Description (Optional)</label>
                <textarea rows={2} value={catData.description} onChange={e => setCatData({ ...catData, description: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Cover Image</label>
                <input id="catImageInput" type="file" accept="image/*" required onChange={e => setCatImage(e.target.files?.[0] || null)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              </div>
              <button disabled={submitting} type="submit" className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-xl hover:bg-primary/90 flex justify-center items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Category"}
              </button>
            </form>
          </div>

          <div className="xl:col-span-2">
            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : categories.length === 0 ? (
              <div className="bg-card/30 rounded-xl p-12 text-center text-muted-foreground border border-border/40 font-medium">No categories found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(c => (
                  <div key={c._id} className="bg-card/30 rounded-xl border border-border/40 overflow-hidden group">
                    <div className="h-32 w-full relative bg-muted overflow-hidden">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <h3 className="font-black text-white text-lg drop-shadow-md">{c.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">{c.description || "No description"}</p>
                      <button onClick={() => handleDeleteCategory(c._id)} className="w-full flex items-center justify-center gap-2 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 py-2 rounded-lg transition-all font-bold text-xs border border-red-500/10">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-card/30 p-6 rounded-xl border border-border/40 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> New Project
            </h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Title</label>
                <input required value={projData.title} onChange={e => setProjData({ ...projData, title: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Category</label>
                <select required value={projData.categoryId} onChange={e => setProjData({ ...projData, categoryId: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm">
                  <option value="" disabled>Select a Category...</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Description</label>
                <textarea required rows={3} value={projData.description} onChange={e => setProjData({ ...projData, description: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Link (Optional)</label>
                <input value={projData.link} onChange={e => setProjData({ ...projData, link: e.target.value })} className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Tech Stack (CSV)</label>
                <input value={projData.techStack} onChange={e => setProjData({ ...projData, techStack: e.target.value })} placeholder="React, Node.js, ..." className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Features (CSV)</label>
                <input value={projData.features} onChange={e => setProjData({ ...projData, features: e.target.value })} placeholder="Feature 1, Feature 2" className="w-full bg-background border border-border rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Images</label>
                <input id="projImagesInput" type="file" multiple accept="image/*" required onChange={e => setProjImages(e.target.files)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                <p className="text-[10px] text-muted-foreground mt-1">Select multiple images if needed.</p>
              </div>
              <button disabled={submitting} type="submit" className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-xl hover:bg-primary/90 flex justify-center items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Project"}
              </button>
            </form>
          </div>

          <div className="xl:col-span-2">
            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : portfolios.length === 0 ? (
              <div className="bg-card/30 rounded-xl p-12 text-center text-muted-foreground border border-border/40 font-medium">No projects found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolios.map(p => {
                  const categoryName = p.categoryId?.name || "Unknown Category";
                  const coverImage = p.images?.[0] || "";
                  
                  return (
                    <div key={p._id} className="bg-card/30 rounded-xl border border-border/40 overflow-hidden flex flex-col group">
                      <div className="h-48 w-full relative bg-muted overflow-hidden">
                        {coverImage && <img src={coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] text-white font-bold flex items-center gap-1.5 shadow-xl">
                          <ImageIcon className="w-3 h-3" /> {p.images?.length || 0}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black tracking-widest uppercase text-primary mb-2 block">{categoryName}</span>
                          <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{p.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{p.description}</p>
                        </div>
                        <button onClick={() => handleDeleteProject(p._id)} className="w-full flex items-center justify-center gap-2 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 py-2.5 rounded-lg transition-all font-bold text-xs uppercase tracking-widest border border-red-500/10">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
