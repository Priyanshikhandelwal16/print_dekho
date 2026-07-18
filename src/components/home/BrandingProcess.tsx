"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { number: "01", title: "Requirement", description: "Share your brand guidelines, quantity & timeline" },
  { number: "02", title: "Product Selection", description: "Choose from 500+ premium product options" },
  { number: "03", title: "Brand Mockup", description: "Get digital previews with your branding" },
  { number: "04", title: "Approval", description: "Review, refine & approve the final design" },
  { number: "05", title: "Production", description: "Manufacturing with strict quality standards" },
  { number: "06", title: "Quality Check", description: "3-stage inspection for every product" },
  { number: "07", title: "Packaging", description: "Premium branded packaging solutions" },
  { number: "08", title: "Delivery", description: "Safe Pan India doorstep delivery" },
];

export function BrandingProcess() {
  return (
    <section className="section-spacing bg-cream">
      <div className="container-main">
        <SectionHeader
          label="OUR PROCESS"
          title="How We Turn Products Into Brand Experiences"
          description="A streamlined 8-step process ensuring quality, consistency, and timely delivery every time"
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block mt-16 relative">
          {/* Connecting Line */}
          <div className="absolute top-[36px] left-0 right-0 h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-accent origin-left"
            />
          </div>

          <div className="grid grid-cols-8 gap-4 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                {/* Circle */}
                <div className="w-[72px] h-[72px] mx-auto rounded-full bg-white border-2 border-accent/30 flex items-center justify-center relative z-10 shadow-sm">
                  <span className="font-heading font-extrabold text-accent text-lg">
                    {step.number}
                  </span>
                </div>
                <h4 className="mt-4 font-heading font-bold text-xs text-secondary">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden mt-12 relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full bg-accent origin-top"
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-5 relative"
              >
                {/* Circle */}
                <div className="absolute -left-8 w-8 h-8 rounded-full bg-white border-2 border-accent/40 flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="font-heading font-bold text-accent text-[10px]">
                    {step.number}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-heading font-bold text-sm text-secondary">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
