"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

const faqCategories = ["Ordering", "Customization", "Production", "Payment"];

const faqs: Record<string, { question: string; answer: string }[]> = {
  Ordering: [
    { question: "What is the minimum order quantity (MOQ)?", answer: "Our standard MOQ is 50 units for most products. For custom packaging and special items, the MOQ may start at 100 units. We're flexible — reach out for smaller pilot orders." },
    { question: "How do I place a bulk order?", answer: "You can place an order by filling out our Bulk Inquiry form, calling us at +91 76654 67878, or emailing printdekhojpr@gmail.com. Our team will share a quotation within 24 hours." },
    { question: "Can I order samples before placing a bulk order?", answer: "Yes! We provide physical samples for most products before bulk production. Sample charges are adjusted in your final invoice when you proceed with the bulk order." },
    { question: "Do you deliver across India?", answer: "Absolutely. We deliver pan-India through trusted logistics partners. Standard shipping takes 3–5 business days after production, depending on location." },
    { question: "Can I track my order?", answer: "Yes, once your order is dispatched, we share tracking details via WhatsApp and email. You can track the shipment in real-time." },
  ],
  Customization: [
    { question: "What branding options are available?", answer: "We offer Screen Printing, Embroidery, Laser Engraving, UV Printing, Sublimation, Heat Transfer (DTF/Vinyl), and Debossing — depending on the product material and your design." },
    { question: "Can you replicate my exact brand colors?", answer: "Yes, we work with Pantone color matching to ensure your brand colors are replicated accurately across all products." },
    { question: "Do you provide design/mockup support?", answer: "Absolutely. Our design team creates free digital mockups for every order. You'll approve the mockup before we begin production." },
    { question: "Can I customize packaging with my brand?", answer: "Yes! We offer custom boxes, pouches, bags, and premium packaging options with your logo, colors, and messaging. Custom packaging is available from 100+ units." },
    { question: "What file formats do you need for my logo?", answer: "We accept AI, CDR, EPS, PDF (vector formats), and high-resolution PNG files (300+ DPI). Our design team can also help convert your logo if needed." },
  ],
  Production: [
    { question: "What is the standard production time?", answer: "Standard production takes 7–10 working days after design approval. Rush orders can be completed in 4–5 working days (subject to product availability)." },
    { question: "Is everything manufactured in-house?", answer: "Yes, most products are manufactured and branded in our in-house facility in Jaipur. This gives us full control over quality, timelines, and costs." },
    { question: "How do you ensure quality?", answer: "We follow a multi-point quality check process — from raw material inspection to final QC before packaging. Every order is inspected by our dedicated QC team." },
    { question: "Can you handle very large orders (10,000+ units)?", answer: "Yes, our facility has a capacity of 50,000+ units per month. We regularly handle large-scale corporate orders with on-time delivery." },
    { question: "What happens if there's a defect in my order?", answer: "We have a strict quality guarantee. If any items are defective, we replace them at no extra cost. Report issues within 48 hours of delivery." },
  ],
  Payment: [
    { question: "What are your payment terms?", answer: "We typically work on 50% advance + 50% before dispatch for new clients. For repeat clients, we offer flexible credit terms based on relationship." },
    { question: "What payment methods do you accept?", answer: "We accept Bank Transfer (NEFT/RTGS/IMPS), UPI, Credit/Debit cards, and company cheques. GST invoices are provided for all orders." },
    { question: "Do you provide GST invoices?", answer: "Yes, we provide proper GST tax invoices for every order. Our GST registration is active and verified." },
    { question: "Is there any additional cost for branding?", answer: "Branding charges depend on the technique and logo complexity. In most cases, branding is included in the per-unit price we quote. We'll always clarify this upfront." },
    { question: "Do you offer volume discounts?", answer: "Yes! We offer tiered pricing — the higher your quantity, the better the per-unit rate. Contact us for a custom quote based on your volume." },
  ],
};

import { useSiteData } from "@/lib/useSiteData";

export default function FAQsPage() {
  const { data } = useSiteData();
  const faqs: Record<string, { question: string; answer: string }[]> = data?.faqs || {};
  const faqCategories = Object.keys(faqs).length > 0 ? Object.keys(faqs) : ["Ordering", "Customization", "Production", "Payment"];

  const [activeTab, setActiveTab] = useState("Ordering");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = faqs[activeTab] ? activeTab : faqCategories[0];
  const currentFAQs = faqs[currentCategory] || [];
  const filteredFAQs = searchQuery
    ? currentFAQs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentFAQs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              Help Center
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              Find answers to common questions about ordering, customization, production, and payment.
            </p>

            {/* Search bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-[16px] border border-border text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                suppressHydrationWarning
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs — white */}
      <section className="section-spacing bg-white">
        <div className="container-main max-w-3xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setOpenIndex(0); }}
                className={`px-5 py-2.5 rounded-[16px] text-sm font-semibold transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-secondary text-white shadow-lg"
                    : "bg-stone text-muted hover:bg-cream border border-border"
                }`}
                suppressHydrationWarning
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {filteredFAQs.map((faq, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="border border-border rounded-[16px] overflow-hidden hover:border-accent/30 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  suppressHydrationWarning
                >
                  <span className="font-heading font-semibold text-sm text-secondary pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
              Still Have Questions?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Our team is ready to help. Reach out via phone, WhatsApp, or email.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Us
              </Button>
              <Button href="/bulk-inquiry" variant="ghost" size="lg">
                Send Inquiry
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
