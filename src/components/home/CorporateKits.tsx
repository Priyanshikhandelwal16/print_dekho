"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const kitContents = [
  "Branded Laptop Bag",
  "Custom T-Shirt / Polo",
  "Personalized Diary & Pen Set",
  "Branded Water Bottle",
  "Custom ID Card Holder",
  "Welcome Letter with Company Branding",
  "Branded Stickers & Accessories",
  "Premium Packaging Box",
];

export function CorporateKits() {
  return (
    <section className="section-spacing bg-cream">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[450px] lg:h-[580px] rounded-[26px] overflow-hidden group shadow-lg">
              <Image
                src="/images/slider_welcome_kit.png"
                alt="Employee Welcome Kit"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 right-4 lg:right-8 bg-white rounded-[18px] shadow-xl shadow-black/10 p-5 max-w-[220px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">Employee Welcome Kit</p>
                  <p className="text-[11px] text-muted">Starting ₹899/kit</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3.5 h-3.5 text-gold fill-gold" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-[10px] text-muted ml-1">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeader
              label="SIGNATURE PRODUCT"
              title="Complete Employee Welcome Kits"
              description="Make every new hire feel valued from day one with fully customized welcome kits that reflect your company culture and brand identity."
              align="left"
            />

            <div className="space-y-3 mt-8">
              {kitContents.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-accent" />
                  </div>
                  <span className="text-sm text-secondary/80">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/products/corporate-kits" size="lg">
                Customize Your Kit
              </Button>
              <Button variant="secondary" href="/contact" size="lg">
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
