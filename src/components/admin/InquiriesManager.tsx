"use client";

import { useState } from "react";
import { Inbox, CheckCircle2, Phone, Mail, Trash2, Search, Calendar } from "lucide-react";

interface InquiriesManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function InquiriesManager({ data, onSave }: InquiriesManagerProps) {
  const [inquiries, setInquiries] = useState<any[]>(data.inquiries || []);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const updateStatus = (id: string, newStatus: string) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    onSave({ inquiries: updated });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry record?")) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      onSave({ inquiries: updated });
    }
  };

  const filteredInquiries = inquiries
    .filter((inq) => {
      if (filterStatus === "All") return true;
      return inq.status === filterStatus;
    })
    .filter((inq) => {
      const search = searchTerm.toLowerCase();
      return (
        inq.name?.toLowerCase().includes(search) ||
        inq.companyName?.toLowerCase().includes(search) ||
        inq.email?.toLowerCase().includes(search) ||
        inq.phone?.toLowerCase().includes(search) ||
        inq.message?.toLowerCase().includes(search)
      );
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-extrabold text-xl text-secondary">Customer Inquiries</h2>
        <p className="text-muted text-xs mt-1">Review bulk customization inquiries and general contact requests.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-[22px] border border-border shadow-sm">
        <div className="flex flex-wrap gap-2">
          {["All", "Pending", "Contacted", "Resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === status
                  ? "bg-secondary text-white shadow-sm"
                  : "text-muted hover:bg-stone hover:text-secondary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone border border-border rounded-xl text-xs text-secondary placeholder:text-muted/40 focus:outline-none focus:border-accent/40"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm bg-white rounded-[24px] border border-border">
            No inquiries matching your criteria.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white p-6 rounded-[24px] border border-border shadow-sm hover:border-accent/10 transition-colors flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="space-y-4 flex-grow">
                {/* Header */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-heading font-extrabold text-sm text-secondary">{inq.name}</h4>
                  {inq.companyName && (
                    <span className="text-[10px] bg-accent/5 text-accent font-bold px-2.5 py-0.5 rounded-full">
                      {inq.companyName}
                    </span>
                  )}
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    inq.status === "Pending" ? "bg-amber-100 text-amber-800" :
                    inq.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                    "bg-emerald-100 text-emerald-800"
                  }`}>
                    {inq.status}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-stone/40 p-4 rounded-xl text-xs text-secondary border border-border/40">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-muted" />
                    <span>{inq.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-muted" />
                    <span>{inq.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-muted" />
                    <span>{new Date(inq.createdAt).toLocaleString("en-IN")}</span>
                  </div>
                  {inq.category && (
                    <div className="sm:col-span-2 md:col-span-3 border-t border-border/50 pt-2 mt-1 font-semibold text-[10px] text-accent uppercase tracking-wider">
                      Request: {inq.category} • Qty: {inq.quantity || "N/A"} • Budget: {inq.budget || "N/A"} • Timeline: {inq.timeline || "N/A"}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="text-xs text-secondary/90 leading-relaxed bg-stone/20 p-4 rounded-xl italic">
                  &ldquo;{inq.message}&rdquo;
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col justify-end items-end gap-3 flex-shrink-0">
                <div className="flex gap-2 w-full md:w-auto">
                  {inq.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(inq.id, "Contacted")}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm"
                    >
                      Contacted
                    </button>
                  )}
                  {inq.status !== "Resolved" && (
                    <button
                      onClick={() => updateStatus(inq.id, "Resolved")}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} /> Resolve
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(inq.id)}
                  className="p-2 border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50/50 rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
