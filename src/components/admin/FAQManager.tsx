"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, MessageSquare, ChevronDown } from "lucide-react";

interface FAQManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function FAQManager({ data, onSave }: FAQManagerProps) {
  const [faqs, setFaqs] = useState<Record<string, any[]>>(data.faqs || {});
  const [activeCategory, setActiveCategory] = useState(Object.keys(data.faqs || {})[0] || "Ordering");

  const [showModal, setShowModal] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [form, setForm] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const categories = Object.keys(faqs);

  const handleOpenModal = (category: string, faq: any = null) => {
    if (faq) {
      setEditingFaqId(faq.id);
      setForm({
        category,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      setEditingFaqId(null);
      setForm({
        category,
        question: "",
        answer: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFaqs = { ...faqs };

    // Remove from old category if editing and category changed
    if (editingFaqId) {
      Object.keys(updatedFaqs).forEach((cat) => {
        updatedFaqs[cat] = updatedFaqs[cat].filter((f) => f.id !== editingFaqId);
      });
    }

    const faqData = {
      id: editingFaqId || `faq-${Date.now()}`,
      question: form.question,
      answer: form.answer,
    };

    if (!updatedFaqs[form.category]) {
      updatedFaqs[form.category] = [];
    }

    updatedFaqs[form.category].push(faqData);

    // Clean up empty categories (except standard ones if preferred)
    Object.keys(updatedFaqs).forEach((cat) => {
      if (updatedFaqs[cat].length === 0 && !["Ordering", "Customization", "Production", "Payment"].includes(cat)) {
        delete updatedFaqs[cat];
      }
    });

    setFaqs(updatedFaqs);
    onSave({ faqs: updatedFaqs });
    
    // Ensure active category is updated
    if (!updatedFaqs[activeCategory]) {
      setActiveCategory(form.category);
    }
    
    setShowModal(false);
  };

  const handleDelete = (category: string, id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      const updatedFaqs = { ...faqs };
      updatedFaqs[category] = updatedFaqs[category].filter((f) => f.id !== id);

      if (updatedFaqs[category].length === 0 && !["Ordering", "Customization", "Production", "Payment"].includes(category)) {
        delete updatedFaqs[category];
        setActiveCategory(Object.keys(updatedFaqs)[0] || "Ordering");
      }

      setFaqs(updatedFaqs);
      onSave({ faqs: updatedFaqs });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">FAQ Management</h2>
          <p className="text-muted text-xs mt-1">Add, edit, or remove client help center questions and answers.</p>
        </div>
        <button
          onClick={() => handleOpenModal(activeCategory)}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border/85 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-secondary text-white shadow-sm"
                : "text-muted hover:bg-stone hover:text-secondary"
            }`}
          >
            {cat} ({faqs[cat]?.length || 0})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {!faqs[activeCategory] || faqs[activeCategory].length === 0 ? (
          <div className="text-center py-10 text-muted text-sm bg-stone/30 rounded-[18px]">
            No FAQ entries in this category. Click Add FAQ to create one.
          </div>
        ) : (
          faqs[activeCategory].map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-[22px] border border-border shadow-sm hover:border-accent/10 transition-colors flex justify-between items-start gap-4"
            >
              <div className="space-y-2">
                <h4 className="font-heading font-extrabold text-xs text-secondary flex items-start gap-2">
                  <MessageSquare size={13} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-muted leading-relaxed pl-5">{faq.answer}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0 mt-1">
                <button
                  onClick={() => handleOpenModal(activeCategory, faq)}
                  className="p-1.5 bg-stone/50 hover:bg-accent/5 text-muted hover:text-accent rounded-lg cursor-pointer transition-colors"
                >
                  <Edit2 size={11} />
                </button>
                <button
                  onClick={() => handleDelete(activeCategory, faq.id)}
                  className="p-1.5 bg-stone/50 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[500px] p-6">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingFaqId ? "Edit FAQ Entry" : "Add FAQ Entry"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">FAQ Category</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Ordering, Customization, Production, Payment, etc."
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Question</label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="e.g. Can I customize packaging with my brand logo?"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Write the FAQ answer..."
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
