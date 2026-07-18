"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, MoveHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const checkpoints = [
  "Transform plain products into branded merchandise",
  "Consistent brand identity across all touchpoints",
  "Premium finish that reflects company values",
];

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="section-spacing bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Comparison Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              ref={containerRef}
              className="relative h-[350px] md:h-[450px] rounded-[26px] overflow-hidden select-none"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
            >
              {/* After Image (background) */}
              <Image
                src="/images/kit_after.png"
                alt="Branded Welcome Kit"
                fill
                className="object-cover animate-pulse-slow"
              />

              {/* Before Image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src="/images/kit_before.png"
                  alt="Plain Welcome Kit"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
                  <MoveHorizontal size={20} className="text-charcoal" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                After
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeader
              label="BRANDING IMPACT"
              title="From Generic Products to Brand Experiences"
              description="We transform ordinary products into powerful brand assets. Your logo, colors, and identity — expertly applied to create lasting impressions that strengthen company culture and client relationships."
              align="left"
            />

            <div className="space-y-4 mt-8">
              {checkpoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-accent" />
                  </div>
                  <p className="text-sm text-secondary/80 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
