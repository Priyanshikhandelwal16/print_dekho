"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our MOQ varies by product — typically 50 pieces for printed items and 25 for premium gifts. We're flexible and can accommodate smaller quantities for select products. Contact us for specific requirements.",
  },
  {
    question: "What is the typical delivery timeline?",
    answer: "Standard orders are delivered within 7-12 business days from design approval. Express delivery (3-5 days) is available for urgent requirements at an additional cost. Pan India delivery is included.",
  },
  {
    question: "What branding options are available?",
    answer: "We offer logo printing (screen, digital, UV), embroidery, sublimation, laser engraving, debossing, and heat transfer. Our team recommends the best method based on your product and design requirements.",
  },
  {
    question: "Do you provide design mockups before production?",
    answer: "Yes! We provide free digital mockups within 24-48 hours of receiving your brand guidelines. You can request unlimited revisions before approving the final design for production.",
  },
  {
    question: "Do we get a dedicated account manager?",
    answer: "Absolutely. Every client is assigned a dedicated account manager who handles your requirements end-to-end — from product selection to delivery tracking. Available via phone, email, and WhatsApp.",
  },
  {
    question: "Can I request product samples before bulk ordering?",
    answer: "Yes, we provide branded samples for quality approval before bulk production. Sample costs are adjusted against the final order. Unbranded samples are available at nominal charges.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-spacing bg-ivory">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Heading */}
          <div className="lg:col-span-2">
            <SectionHeader
              label="FAQ"
              title="Frequently Asked Questions"
              description="Everything you need to know about our corporate gifting process"
              align="left"
            />
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border border-border/60 rounded-[16px] overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  aria-expanded={openIndex === i}
                  suppressHydrationWarning
                >
                  <span className="font-heading font-semibold text-sm md:text-base text-secondary pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone flex items-center justify-center">
                    {openIndex === i ? (
                      <Minus size={16} className="text-accent" />
                    ) : (
                      <Plus size={16} className="text-secondary/50" />
                    )}
                  </div>
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
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
