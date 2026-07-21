"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Gift, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface CorporateKitsManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function CorporateKitsManager({ data, onSave }: CorporateKitsManagerProps) {
  const [kits, setKits] = useState(data.corporateKits || []);
  const [showModal, setShowModal] = useState(false);
  const [editingKitId, setEditingKitId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    itemsText: "",
    moq: "",
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

  const handleOpenModal = (kit: any = null) => {
    if (kit) {
      setEditingKitId(kit.id);
      setForm({
        title: kit.title,
        image: kit.image,
        itemsText: (kit.items || []).join(", "),
        moq: kit.moq,
      });
    } else {
      setEditingKitId(null);
      setForm({
        title: "",
        image: "",
        itemsText: "",
        moq: "50 units",
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedKits = [...kits];

    const kitData = {
      title: form.title,
      image: form.image,
      items: form.itemsText.split(",").map((s) => s.trim()).filter((s) => s.length > 0),
      moq: form.moq,
    };

    if (editingKitId) {
      updatedKits = updatedKits.map((k) =>
        k.id === editingKitId ? { ...k, ...kitData } : k
      );
    } else {
      updatedKits.push({
        id: `kit-${Date.now()}`,
        ...kitData,
      });
    }

    setKits(updatedKits);
    onSave({ corporateKits: updatedKits });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this kit option?")) {
      const updatedKits = kits.filter((k: any) => k.id !== id);
      setKits(updatedKits);
      onSave({ corporateKits: updatedKits });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Corporate Gift Kits</h2>
          <p className="text-muted text-xs mt-1">Manage standard pre-curated onboarding kits and custom hampers.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus size={14} /> Add Kit Option
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kits.map((kit: any) => (
          <div
            key={kit.id}
            className="bg-white rounded-[24px] border border-border shadow-sm overflow-hidden flex flex-col group hover:border-accent/15 transition-all"
          >
            <div className="relative h-56 bg-stone/40 overflow-hidden">
              {kit.image ? (
                <Image
                  src={kit.image}
                  alt={kit.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  sizes="25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
                  No image set
                </div>
              )}
              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(kit)}
                  className="p-2 bg-white/95 text-secondary hover:text-accent rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(kit.id)}
                  className="p-2 bg-white/95 text-red-600 hover:bg-red-50 rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 bg-secondary/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                MOQ: {kit.moq}
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-extrabold text-sm text-secondary flex items-center gap-2">
                  <Gift size={14} className="text-accent" /> {kit.title}
                </h4>
                <ul className="mt-3 space-y-1.5">
                  {(kit.items || []).map((item: string, idx: number) => (
                    <li key={idx} className="text-xs text-muted flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[480px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingKitId ? "Edit Kit Option" : "Add Corporate Kit Option"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Kit Title</label>
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
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Minimum Order Qty (MOQ)</label>
                <input
                  type="text"
                  required
                  value={form.moq}
                  onChange={(e) => setForm({ ...form, moq: e.target.value })}
                  placeholder="e.g. 50 units"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>

              {/* Direct Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Kit Image</label>
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
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Kit Items (Comma-separated)</label>
                <textarea
                  required
                  rows={4}
                  value={form.itemsText}
                  onChange={(e) => setForm({ ...form, itemsText: e.target.value })}
                  placeholder="Branded T-Shirt, Stainless Flask, Diary, Metal Pen, Coffee Mug"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 resize-none"
                />
                <p className="text-[10px] text-muted mt-1">Separate each item in the kit with a comma.</p>
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
                  Save Kit Option
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
