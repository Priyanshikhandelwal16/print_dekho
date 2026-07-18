"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "HR Director",
    company: "TechVista Solutions",
    quote: "Print Dekho transformed our onboarding experience. The welcome kits are premium quality and our new hires absolutely love them. Their attention to detail is unmatched.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Procurement Head",
    company: "Nexgen Hospitality",
    quote: "We've been working with Print Dekho for 3 years now. Their consistency in quality, timely delivery, and account management makes them our go-to gifting partner.",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    role: "Marketing Manager",
    company: "GreenLeaf Industries",
    quote: "The branding on our corporate merchandise is impeccable. From design mockups to final delivery, the entire process was seamless and professional.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "CEO",
    company: "StartupHub India",
    quote: "As a startup, we needed affordable yet premium gifting solutions. Print Dekho delivered beyond expectations with their flexible MOQ and competitive pricing.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-spacing bg-stone">
      <div className="container-main">
        <SectionHeader
          label="TESTIMONIALS"
          title="What Our Clients Say"
          description="Trusted by 500+ companies for premium corporate gifting solutions"
        />

        <div className="max-w-3xl mx-auto mt-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[22px] p-8 md:p-12 shadow-sm border border-border/50"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-secondary/80 text-base md:text-lg leading-relaxed italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-accent text-lg">
                    {testimonials[current].name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-secondary">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-cream transition-colors"
                aria-label="Previous testimonial"
                suppressHydrationWarning
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-cream transition-colors"
                aria-label="Next testimonial"
                suppressHydrationWarning
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Counter */}
            <p className="text-sm text-muted">
              <span className="font-heading font-bold text-secondary">{String(current + 1).padStart(2, "0")}</span>
              {" / "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
