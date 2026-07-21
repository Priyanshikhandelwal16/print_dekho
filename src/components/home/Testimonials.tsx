"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteData } from "@/lib/useSiteData";

export function Testimonials() {
  const { data } = useSiteData();
  const testimonials = data?.testimonials || [];
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) return null;
  const activeReview = testimonials[current] || testimonials[0];

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
                {Array.from({ length: activeReview.rating || 5 }).map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-secondary/80 text-base md:text-lg leading-relaxed italic">
                &ldquo;{activeReview.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-accent text-lg">
                    {activeReview.name ? activeReview.name[0] : "C"}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-secondary">
                    {activeReview.name}
                  </p>
                  <p className="text-xs text-muted">
                    {activeReview.role}, {activeReview.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-border/60 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center text-secondary transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-2 px-2">
              {testimonials.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    current === i ? "bg-accent w-6" : "bg-border hover:bg-muted"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-border/60 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center text-secondary transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
