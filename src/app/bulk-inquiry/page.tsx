"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, UserCheck, Palette, Package, Truck, MapPin } from "lucide-react";

const benefits = [
  { icon: UserCheck, title: "Dedicated Manager", description: "A single point of contact for your entire order lifecycle." },
  { icon: Palette, title: "Free Mockup Support", description: "Digital mockups shared before production begins for approval." },
  { icon: Package, title: "Premium Packaging", description: "Custom boxes, pouches & branded packaging with your logo." },
  { icon: Truck, title: "Fast Production", description: "7–10 day standard. Rush orders in 4–5 days." },
  { icon: MapPin, title: "Pan India Delivery", description: "Deliver to multiple addresses across India in one order." },
];

const processSteps = [
  { step: "01", title: "Share Requirements", description: "Tell us what you need — products, quantity, branding, and timeline." },
  { step: "02", title: "Get Quotation & Mockup", description: "Receive a detailed quote with digital mockups within 24 hours." },
  { step: "03", title: "Approve & Production", description: "Approve the mockup and we begin in-house production immediately." },
  { step: "04", title: "Quality Check & Delivery", description: "Multi-point QC, premium packing, and pan-India delivery." },
];

export default function BulkInquiryPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    phone: "",
    email: "",
    category: "",
    quantity: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg("Thank you for your bulk inquiry! Our team will share a quotation within 24 hours.");
        setFormData({
          companyName: "",
          name: "",
          phone: "",
          email: "",
          category: "",
          quantity: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        alert("Failed to submit inquiry. Please try again or call us directly.");
      }
    } catch (err) {
      alert("Error submitting inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero — cream */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Bulk Orders
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Need Corporate Gifts in Bulk?
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              From 50 to 50,000 units — get premium quality branded merchandise with competitive pricing and on-time delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <SectionHeader
            label="Why Choose Us"
            title="The Print Dekho Advantage"
            description="Everything you need for a seamless bulk ordering experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-center p-6 bg-stone rounded-[22px] border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/5 mx-auto">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-sm text-secondary">{benefit.title}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — stone */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="How It Works"
            title="Simple 4-Step Process"
            description="From inquiry to delivery — we make bulk ordering effortless."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 bg-white rounded-[22px] border border-border"
              >
                <span className="text-4xl font-heading font-extrabold text-accent/15">{step.step}</span>
                <h3 className="mt-2 font-heading font-bold text-base text-secondary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form — ivory */}
      <section className="section-spacing bg-ivory">
        <div className="container-main max-w-3xl">
          <SectionHeader
            label="Send Inquiry"
            title="Get Your Bulk Quote"
            description="Fill in your requirements and receive a detailed quotation within 24 hours."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-8 lg:p-10 rounded-[22px] border border-border shadow-sm"
          >
            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                {successMsg}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  placeholder="Your company name"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  placeholder="Full name"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  placeholder="+91 XXXXX XXXXX"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  placeholder="you@company.com"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Product Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                >
                  <option value="">Select category</option>
                  <option value="corporate-kits">Corporate Gift Kits</option>
                  <option value="apparel">Corporate Apparel</option>
                  <option value="drinkware">Drinkware & Bottles</option>
                  <option value="bags">Bags & Backpacks</option>
                  <option value="sports-jerseys">Sports Jerseys</option>
                  <option value="stationery">Stationery & Diaries</option>
                  <option value="promotional">Promotional T-Shirts</option>
                  <option value="combo-sets">Combo Sets</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Quantity</label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                >
                  <option value="">Select quantity</option>
                  <option value="50-100">50–100 units</option>
                  <option value="100-500">100–500 units</option>
                  <option value="500-1000">500–1,000 units</option>
                  <option value="1000-5000">1,000–5,000 units</option>
                  <option value="5000+">5,000+ units</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Budget per Unit</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                >
                  <option value="">Select budget</option>
                  <option value="100-300">₹100–₹300</option>
                  <option value="300-500">₹300–₹500</option>
                  <option value="500-1000">₹500–₹1,000</option>
                  <option value="1000-2000">₹1,000–₹2,000</option>
                  <option value="2000+">₹2,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="urgent">Urgent (within 1 week)</option>
                  <option value="1-2-weeks">1–2 weeks</option>
                  <option value="2-4-weeks">2–4 weeks</option>
                  <option value="1-month+">1 month+</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary mb-2">Upload Logo (optional)</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.ai,.pdf,.eps,.cdr"
                className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-muted file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-stone rounded-[12px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                placeholder="Tell us about your requirements, special branding needs, delivery locations..."
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
              Submit Bulk Inquiry
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Testimonial — white */}
      <section className="section-spacing bg-white">
        <div className="container-main max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="p-8 lg:p-10 bg-stone rounded-[22px] border border-border"
          >
            <p className="text-sm lg:text-base text-secondary leading-relaxed italic">
              &ldquo;Print Dekho delivered 3,000 branded welcome kits for our new hires across 5 cities — on time, with perfect quality, and custom packaging. They&apos;ve been our go-to partner for 3 years now.&rdquo;
            </p>
            <div className="mt-5">
              <p className="font-heading font-bold text-sm text-secondary">HR Head</p>
              <p className="text-xs text-muted">Leading IT Company, Bangalore</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA — charcoal */}
      <section className="section-spacing bg-charcoal">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] text-white">
              Prefer to Talk Directly?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Call us at +91 76654 67878 or WhatsApp for instant response.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Sales Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
