"use client";

import { motion } from "framer-motion";
import { Package, Inbox, HelpCircle, Star, BookOpen, Clock } from "lucide-react";

interface DashboardOverviewProps {
  data: any;
  setActiveTab: (tab: string) => void;
  updateStatus: (inquiryId: string, status: string) => void;
}

export function DashboardOverview({ data, setActiveTab, updateStatus }: DashboardOverviewProps) {
  const totalProducts = data.products?.length || 0;
  const totalInquiries = data.inquiries?.length || 0;
  const pendingInquiries = data.inquiries?.filter((i: any) => i.status === "Pending")?.length || 0;
  const totalBlogs = data.blogs?.length || 0;
  const totalFaqs = Object.values(data.faqs || {}).reduce((acc: number, val: any) => acc + val.length, 0);
  const totalTestimonials = data.testimonials?.length || 0;

  const recentInquiries = (data.inquiries || []).slice(0, 4);

  const stats = [
    { label: "Pending Inquiries", value: pendingInquiries, icon: Inbox, color: "text-amber-500", bg: "bg-amber-50", tab: "inquiries" },
    { label: "Total Products", value: totalProducts, icon: Package, color: "text-blue-500", bg: "bg-blue-50", tab: "products" },
    { label: "Active FAQs", value: totalFaqs, icon: HelpCircle, color: "text-emerald-500", bg: "bg-emerald-50", tab: "faqs" },
    { label: "Blog Articles", value: totalBlogs, icon: BookOpen, color: "text-indigo-500", bg: "bg-indigo-50", tab: "blogs" },
    { label: "Testimonials", value: totalTestimonials, icon: Star, color: "text-rose-500", bg: "bg-rose-50", tab: "testimonials" },
    { label: "Total Inquiries", value: totalInquiries, icon: Clock, color: "text-slate-500", bg: "bg-slate-50", tab: "inquiries" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading font-extrabold text-xl text-secondary">Dashboard Overview</h2>
        <p className="text-muted text-xs mt-1">Real-time status of your Print Dekho website.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveTab(stat.tab)}
              className="text-left bg-white p-5 rounded-[22px] border border-border shadow-sm hover:shadow-md hover:border-accent/20 transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon size={20} className="transition-transform group-hover:scale-110" />
              </div>
              <p className="mt-4 font-heading font-extrabold text-2xl text-secondary">{stat.value}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted/80 tracking-wide uppercase uppercase-spacing">{stat.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-[24px] border border-border shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-heading font-bold text-base text-secondary">Recent Inquiries</h3>
            <p className="text-muted text-xs mt-0.5">Lately submitted bulk orders and contact form leads.</p>
          </div>
          <button
            onClick={() => setActiveTab("inquiries")}
            className="text-xs font-semibold text-accent hover:underline hover:text-accent/80 cursor-pointer"
          >
            View All Inquiries
          </button>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="text-center py-10 text-muted text-sm bg-stone/30 rounded-[18px]">
            No inquiries received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentInquiries.map((inq: any) => (
              <div
                key={inq.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-stone/40 border border-border/60 rounded-[20px] hover:border-accent/10 transition-colors gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-bold text-sm text-secondary">
                      {inq.name}
                    </span>
                    {inq.companyName && (
                      <span className="text-[10px] bg-accent/5 text-accent font-semibold px-2 py-0.5 rounded-full">
                        {inq.companyName}
                      </span>
                    )}
                    <span className="text-[10px] text-muted ml-auto sm:ml-0">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted space-x-3">
                    <span>Phone: <strong>{inq.phone}</strong></span>
                    <span>Email: <strong>{inq.email}</strong></span>
                  </div>
                  <div className="mt-2 text-xs text-secondary bg-white p-3 rounded-xl border border-border/30">
                    <p className="font-semibold text-[10px] text-accent/80 uppercase tracking-wider mb-1">
                      Req: {inq.category} • Qty: {inq.quantity} • Budget: {inq.budget}
                    </p>
                    <p className="italic text-secondary/90">&ldquo;{inq.message}&rdquo;</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-2 justify-between flex-shrink-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    inq.status === "Pending" ? "bg-amber-100 text-amber-800" :
                    inq.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                    "bg-emerald-100 text-emerald-800"
                  }`}>
                    {inq.status}
                  </span>
                  
                  {inq.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(inq.id, "Contacted")}
                      className="text-[11px] font-bold text-white bg-accent hover:bg-accent/90 px-3 py-1.5 rounded-xl cursor-pointer shadow-sm transition-colors"
                    >
                      Mark Contacted
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
