"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const slides = [
  { image: "/images/slider_gifts.png", heading: "Premium Corporate Gifting That Builds Brands", subtitle: "Elevate your corporate identity with custom branded merchandise" },
  { image: "/images/slider_welcome_kit.png", heading: "Employee Welcome Kits", subtitle: "Make every new hire feel valued from day one" },
  { image: "/images/slider_drinkware.png", heading: "Branded Drinkware Collection", subtitle: "High-quality mugs, bottles & tumblers with your brand" },
  { image: "/images/slider_apparel.png", heading: "Corporate Apparel Solutions", subtitle: "Custom polos, t-shirts & jerseys for your team" },
  { image: "/images/slider_branding.png", heading: "Complete Branding Solutions", subtitle: "End-to-end corporate branding since 2012" },
];

const stats = [
  { value: "500+", label: "Clients" },
  { value: "10K+", label: "Delivered" },
  { value: "50+", label: "Categories" },
  { value: "Pan India", label: "Delivery" },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative">
      {/* Hero Slider */}
      <div className="relative h-[100vh] lg:h-[calc(100vh-120px)] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].heading}
              fill
              className="object-cover"
              priority={current === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-main w-full">
            <div className="max-w-xl lg:max-w-2xl mx-auto lg:mx-0 lg:mr-16 text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="font-heading font-extrabold text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                    {slides[current].heading}
                  </h1>
                  <p className="mt-4 text-white/70 text-base md:text-lg max-w-md mx-auto lg:ml-0">
                    {slides[current].subtitle}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button href="/products" size="lg" className="!bg-accent !text-white hover:!bg-accent/90">
                      Explore Collection
                    </Button>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold hover:bg-white/25 transition-all duration-300"
                    >
                      <Send size={16} />
                      Send Inquiry
                    </Link>
                    <Link
                      href="/catalog"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      <Download size={16} />
                      Download Catalogue
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating Stats - Bottom Left */}
        <div className="absolute bottom-8 left-6 lg:bottom-12 lg:left-10 hidden md:flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-[16px] px-6 py-4 border border-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-heading font-extrabold text-white text-lg lg:text-xl">{stat.value}</p>
              <p className="text-white/60 text-[10px] uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-10 flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
            suppressHydrationWarning
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
            suppressHydrationWarning
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="bg-charcoal py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-sm font-heading font-semibold text-white/80 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Explore our Corporate Gifts Collections!
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
