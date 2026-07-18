"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  { icon: Phone, title: "Phone", value: "+91 76654 67878", description: "Mon–Sat, 10AM–7PM" },
  { icon: MessageCircle, title: "WhatsApp", value: "+91 76654 67878", description: "Quick responses" },
  { icon: Mail, title: "Email", value: "printdekhojpr@gmail.com", description: "Reply within 24hrs" },
  { icon: MapPin, title: "Address", value: "Jaipur, Rajasthan", description: "Visit our facility" },
  { icon: Clock, title: "Working Hours", value: "Mon–Sat: 10AM–7PM", description: "Sunday closed" },
];

export default function ContactPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! Our team will get back to you within 24 hours.");
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
              Get In Touch
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Let&apos;s Build Something Amazing Together
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              Share your requirements and our team will craft the perfect corporate gifting solution for your brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-heading font-bold text-xl text-secondary mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-4 p-4 bg-stone rounded-[16px] border border-border hover:border-accent/30 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/5 flex-shrink-0">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-secondary">{info.title}</p>
                        <p className="text-sm text-secondary mt-0.5">{info.value}</p>
                        <p className="text-[11px] text-muted">{info.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-heading font-bold text-xl text-secondary mb-6">Send Us an Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                    Send Inquiry
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Integration */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="Find Us"
            title="Visit Our Facility"
            description="Our manufacturing unit is located in Jaipur, Rajasthan, India."
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[350px] lg:h-[450px] rounded-[26px] overflow-hidden border border-border shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56963.81180216147!2d75.74838634863282!3d26.912433000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db41215b497b7%3A0xf69c73e16b95c378!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Print Dekho Location Map"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
