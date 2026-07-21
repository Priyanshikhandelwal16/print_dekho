"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";

interface TestimonialsManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function TestimonialsManager({ data, onSave }: TestimonialsManagerProps) {
  const [reviews, setReviews] = useState(data.testimonials || []);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
  });

  const handleOpenModal = (review: any = null) => {
    if (review) {
      setEditingId(review.id);
      setForm({
        name: review.name,
        role: review.role,
        company: review.company,
        quote: review.quote,
        rating: review.rating || 5,
      });
    } else {
      setEditingId(null);
      setForm({
        name: "",
        role: "",
        company: "",
        quote: "",
        rating: 5,
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedReviews = [...reviews];

    if (editingId) {
      updatedReviews = updatedReviews.map((r) =>
        r.id === editingId ? { ...r, ...form } : r
      );
    } else {
      updatedReviews.push({
        id: `test-${Date.now()}`,
        ...form,
      });
    }

    setReviews(updatedReviews);
    onSave({ testimonials: updatedReviews });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial review?")) {
      const updatedReviews = reviews.filter((r: any) => r.id !== id);
      setReviews(updatedReviews);
      onSave({ testimonials: updatedReviews });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Client Testimonials</h2>
          <p className="text-muted text-xs mt-1">Manage reviews and quotes from HR directors, procurement managers, and startup CEOs.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev: any) => (
          <div
            key={rev.id}
            className="bg-white rounded-[24px] p-6 border border-border shadow-sm hover:border-accent/15 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating || 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenModal(rev)}
                    className="p-1.5 bg-stone/50 hover:bg-accent/5 text-muted hover:text-accent rounded-lg cursor-pointer transition-colors"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 bg-stone/50 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-secondary/85 leading-relaxed italic">&ldquo;{rev.quote}&rdquo;</p>
            </div>

            <div className="mt-5 flex items-center gap-3.5 pt-4 border-t border-border/40">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center font-heading font-extrabold text-accent text-sm flex-shrink-0">
                {rev.name?.[0]}
              </div>
              <div>
                <h5 className="font-heading font-extrabold text-xs text-secondary">{rev.name}</h5>
                <p className="text-[10px] text-muted">{rev.role}, {rev.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[480px] p-6">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Client Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Rating Stars</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. HR Director"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Company Name</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. TechVista Solutions"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Review Quote</label>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="The onboarding kits exceeded expectations..."
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
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 cursor-pointer shadow-sm"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
