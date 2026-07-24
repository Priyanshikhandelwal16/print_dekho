"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, BookOpen, Star, Upload, Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface BlogManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function BlogManager({ data, onSave }: BlogManagerProps) {
  const [blogs, setBlogs] = useState(data.blogs || []);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    image: "",
    category: "",
    date: "",
    readTime: "",
    featured: false,
    content: "",
  });

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading image file");
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (blog: any = null) => {
    if (blog) {
      setEditingId(blog.id);
      setForm({
        title: blog.title,
        excerpt: blog.excerpt,
        image: blog.image,
        category: blog.category,
        date: blog.date,
        readTime: blog.readTime,
        featured: !!blog.featured,
        content: blog.content || "",
      });
    } else {
      setEditingId(null);
      setForm({
        title: "",
        excerpt: "",
        image: "",
        category: "Corporate Gifting",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readTime: "5 min read",
        featured: false,
        content: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedBlogs = [...blogs];

    if (form.featured) {
      updatedBlogs = updatedBlogs.map((b) => ({ ...b, featured: false }));
    }

    if (editingId) {
      updatedBlogs = updatedBlogs.map((b) =>
        b.id === editingId ? { ...b, ...form } : b
      );
    } else {
      updatedBlogs.push({
        id: `blog-${Date.now()}`,
        ...form,
      });
    }

    setBlogs(updatedBlogs);
    onSave({ blogs: updatedBlogs });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = blogs.filter((b: any) => b.id !== id);
      setBlogs(updatedBlogs);
      onSave({ blogs: updatedBlogs });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Blog & Insights</h2>
          <p className="text-muted text-xs mt-1">Manage blog articles, gifting guides, and industry news.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus size={14} /> Add Blog Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog: any) => (
          <div
            key={blog.id}
            className="bg-white rounded-[24px] border border-border shadow-sm overflow-hidden flex flex-col justify-between group hover:border-accent/15 transition-all"
          >
            <div className="relative h-48 bg-stone/40 overflow-hidden">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  sizes="25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
                  No image set
                </div>
              )}
              {blog.featured && (
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Star size={10} className="fill-white" /> Featured Article
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(blog)}
                  className="p-2 bg-white/95 text-secondary hover:text-accent rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 bg-white/95 text-red-600 hover:bg-red-50 rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-muted font-medium mb-1.5">
                  <span className="text-accent font-bold uppercase">{blog.category}</span>
                  <span>{blog.date} • {blog.readTime}</span>
                </div>
                <h4 className="font-heading font-extrabold text-sm text-secondary line-clamp-2 leading-snug">
                  {blog.title}
                </h4>
                <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
              {/* Preview link */}
              <div className="mt-3 pt-3 border-t border-border/60">
                <a
                  href={`/blog/${blog.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  <ExternalLink size={11} />
                  Preview on site
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[550px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingId ? "Edit Blog Post" : "Add Blog Post"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Article Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Top 10 Corporate Gift Ideas for Employee Appreciation"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Category</label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Corporate Gifting, Branding Tips"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Estimated Read Time</label>
                  <input
                    type="text"
                    required
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Publish Date String</label>
                  <input
                    type="text"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. Dec 15, 2024"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Feature Status</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent"
                    />
                    <span className="text-xs font-semibold text-secondary">Set as Featured Main Hero Post</span>
                  </label>
                </div>
              </div>

              {/* Direct Cover Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Cover Image</label>
                <div className="flex flex-col gap-2">
                  {form.image && (
                    <div className="relative h-32 w-full bg-stone/40 rounded-xl overflow-hidden border border-border">
                      <Image src={form.image} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: "" })}
                        className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <label className="flex items-center gap-2 px-4 py-2.5 bg-accent/5 hover:bg-accent/15 border border-accent/20 rounded-xl text-xs font-bold text-accent cursor-pointer transition-all justify-center">
                    {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                    <span>{uploading ? "Uploading Image..." : "Upload Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="Or enter image URL / path manually"
                    className="w-full px-3 py-2 bg-stone border border-border rounded-xl text-[11px] font-mono text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Short Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief summary of the article..."
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Full Article Content</label>
                <textarea
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Detailed article body text..."
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-border/80 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-border rounded-lg text-xs font-bold text-muted hover:bg-stone cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Blog Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
