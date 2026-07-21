"use client";

import { useState } from "react";
import { Settings, Save, Smartphone, MapPin, Mail, Clock, Globe } from "lucide-react";

interface SiteSettingsManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

export function SiteSettingsManager({ data, onSave }: SiteSettingsManagerProps) {
  const [settings, setSettings] = useState(data.siteSettings || {});
  const [stats, setStats] = useState<any[]>(data.statistics || []);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    onSave({ siteSettings: settings, statistics: stats });
    
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  const handleStatChange = (index: number, key: string, value: any) => {
    const updated = stats.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    setStats(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Site Settings</h2>
          <p className="text-muted text-xs mt-1">Configure contact info, social links, and homepage copy details.</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <Save size={14} /> {loading ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm space-y-5">
          <h3 className="font-heading font-extrabold text-sm text-secondary flex items-center gap-2">
            <Smartphone size={16} className="text-accent" /> Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Phone Number</label>
              <input
                type="text"
                required
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">WhatsApp Link/No.</label>
              <input
                type="text"
                required
                value={settings.whatsapp || ""}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Working Hours</label>
              <input
                type="text"
                required
                value={settings.workingHours || ""}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Office Address</label>
            <input
              type="text"
              required
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
            />
          </div>
        </div>

        {/* Hero & CTA Copy */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm space-y-5">
          <h3 className="font-heading font-extrabold text-sm text-secondary flex items-center gap-2">
            <Globe size={16} className="text-accent" /> Page Copywriting
          </h3>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Hero Headline Title</label>
            <input
              type="text"
              required
              value={settings.heroTitle || ""}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Hero Subtitle</label>
            <textarea
              required
              rows={2}
              value={settings.heroSubtitle || ""}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">CTA Banner Title</label>
              <input
                type="text"
                required
                value={settings.ctaTitle || ""}
                onChange={(e) => setSettings({ ...settings, ctaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">CTA Description</label>
              <input
                type="text"
                required
                value={settings.ctaDescription || ""}
                onChange={(e) => setSettings({ ...settings, ctaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm space-y-5 lg:col-span-2">
          <h3 className="font-heading font-extrabold text-sm text-secondary">Social Networks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Instagram URL</label>
              <input
                type="text"
                value={settings.instagram || ""}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Facebook URL</label>
              <input
                type="text"
                value={settings.facebook || ""}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">LinkedIn Company URL</label>
              <input
                type="text"
                value={settings.linkedin || ""}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Home Counters / Statistics */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm space-y-5 lg:col-span-2">
          <h3 className="font-heading font-extrabold text-sm text-secondary">Home Page Counter Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-stone/30 p-4 rounded-xl border border-border/40 space-y-2">
                <p className="font-mono text-[9px] font-semibold text-muted">Counter {idx + 1}</p>
                <div>
                  <label className="block text-[9px] font-bold text-muted/80 uppercase">Label</label>
                  <input
                    type="text"
                    required
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full mt-0.5 px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold text-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-muted/80 uppercase">Value Number</label>
                  <input
                    type="number"
                    required
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, "value", Number(e.target.value))}
                    className="w-full mt-0.5 px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold text-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-muted/80 uppercase">Suffix (e.g. +, %)</label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => handleStatChange(idx, "suffix", e.target.value)}
                    className="w-full mt-0.5 px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold text-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-muted/80 uppercase">Custom display text</label>
                  <input
                    type="text"
                    value={stat.display || ""}
                    onChange={(e) => handleStatChange(idx, "display", e.target.value)}
                    placeholder="None"
                    className="w-full mt-0.5 px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold text-secondary focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
