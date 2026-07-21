"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface PortfolioManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function PortfolioManager({ data, onSave }: PortfolioManagerProps) {
  const [items, setItems] = useState(data.portfolio || []);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
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

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        title: item.title,
        category: item.category,
        image: item.image,
      });
    } else {
      setEditingId(null);
      setForm({
        title: "",
        category: "Corporate Kits",
        image: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedItems = [...items];

    if (editingId) {
      updatedItems = updatedItems.map((item) =>
        item.id === editingId ? { ...item, ...form } : item
      );
    } else {
      updatedItems.push({
        id: `port-${Date.now()}`,
        ...form,
      });
    }

    setItems(updatedItems);
    onSave({ portfolio: updatedItems });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio showcase item?")) {
      const updatedItems = items.filter((item: any) => item.id !== id);
      setItems(updatedItems);
      onSave({ portfolio: updatedItems });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Portfolio Showcase</h2>
          <p className="text-muted text-xs mt-1">Manage project gallery photos, corporate kits, event merchandise showcase.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus size={14} /> Add Portfolio Item
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-[22px] border border-border shadow-sm overflow-hidden group hover:border-accent/15 transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 bg-stone/40 overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                  sizes="20vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
                  No image
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 bg-white/95 text-secondary hover:text-accent rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/95 text-red-600 hover:bg-red-50 rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider bg-accent/5 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h4 className="font-heading font-bold text-xs text-secondary mt-1.5 line-clamp-1">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[420px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingId ? "Edit Portfolio Item" : "Add Portfolio Item"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Project / Item Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Employee Welcome Kit"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Category Tag</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Corporate Kits, Apparel, Drinkware, Events, Bags"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>

              {/* Direct Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Project Image</label>
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
