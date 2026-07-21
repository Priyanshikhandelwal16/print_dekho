"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Gift,
  Image as ImageIcon,
  Star,
  HelpCircle,
  BookOpen,
  Inbox,
  Settings,
  Upload,
  LogOut,
  ExternalLink,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { LoginScreen } from "@/components/admin/LoginScreen";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { CorporateKitsManager } from "@/components/admin/CorporateKitsManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { FAQManager } from "@/components/admin/FAQManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { SiteSettingsManager } from "@/components/admin/SiteSettingsManager";
import { MediaManager } from "@/components/admin/MediaManager";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [saveNotification, setSaveNotification] = useState(false);

  // Check auth and load site data
  const initAdmin = async () => {
    try {
      const authRes = await fetch("/api/admin/check-auth");
      const authData = await authRes.json();

      if (authData.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/site-data");
      const data = await res.json();
      setSiteData(data);
    } catch (e) {
      console.error("Error fetching site data", e);
    }
  };

  useEffect(() => {
    initAdmin();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  // Save changes to API
  const handleSaveData = async (updatedFields: Record<string, any>) => {
    if (!siteData) return;

    const newSiteData = { ...siteData, ...updatedFields };
    setSiteData(newSiteData);

    try {
      const res = await fetch("/api/site-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 2500);
      }
    } catch (error) {
      console.error("Failed to save updates to API", error);
    }
  };

  const updateInquiryStatus = (id: string, status: string) => {
    const updatedInquiries = (siteData.inquiries || []).map((inq: any) =>
      inq.id === id ? { ...inq, status } : inq
    );
    handleSaveData({ inquiries: updatedInquiries });
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="flex items-center gap-3 text-secondary font-heading font-bold text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => { setIsAuthenticated(true); fetchData(); }} />;
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="flex items-center gap-3 text-secondary font-heading font-bold text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span>Loading Print Dekho data...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products & Categories", icon: Package },
    { id: "corporate-kits", label: "Corporate Kits", icon: Gift },
    { id: "portfolio", label: "Portfolio Showcase", icon: ImageIcon },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "blogs", label: "Blogs & News", icon: BookOpen },
    { id: "inquiries", label: "Customer Inquiries", icon: Inbox, count: siteData.inquiries?.filter((i: any) => i.status === "Pending")?.length || 0 },
    { id: "settings", label: "Site Settings", icon: Settings },
    { id: "media", label: "Media Uploads", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-stone/60 flex flex-col font-sans">
      {/* Save Toast */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold"
          >
            <CheckCircle2 size={16} /> Changes saved to website!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-heading font-extrabold text-lg tracking-tight text-secondary">
              PRINT <span className="text-accent">DEKHO</span>
            </Link>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-bold bg-accent/10 text-accent px-2.5 py-1 rounded-full">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone hover:bg-stone/80 text-secondary text-xs font-semibold rounded-lg border border-border transition-colors"
            >
              <span>View Website</span>
              <ExternalLink size={13} className="text-muted" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 w-full flex-grow flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="bg-white p-3 rounded-[24px] border border-border shadow-sm space-y-1 sticky top-24">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[14px] text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-secondary text-white shadow-sm"
                      : "text-secondary/80 hover:bg-stone hover:text-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? "text-gold" : "text-muted"} />
                    <span>{tab.label}</span>
                  </div>

                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-800"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Panel Content */}
        <main className="flex-grow min-w-0">
          {activeTab === "dashboard" && (
            <DashboardOverview
              data={siteData}
              setActiveTab={setActiveTab}
              updateStatus={updateInquiryStatus}
            />
          )}

          {activeTab === "products" && (
            <ProductsManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "corporate-kits" && (
            <CorporateKitsManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "portfolio" && (
            <PortfolioManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "faqs" && (
            <FAQManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "blogs" && (
            <BlogManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "inquiries" && (
            <InquiriesManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "settings" && (
            <SiteSettingsManager data={siteData} onSave={handleSaveData} />
          )}

          {activeTab === "media" && <MediaManager />}
        </main>
      </div>
    </div>
  );
}
