"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const companies = [
  "Infosys", "Wipro", "Tech Mahindra", "HCL", "Reliance", "Tata Group",
  "Mahindra", "Bajaj", "Adani", "L&T", "Godrej", "ITC", "HDFC",
  "ICICI Bank", "Axis Bank", "Airtel", "Vedanta", "JSW", "Apollo",
  "Max Healthcare", "Oberoi", "ITC Hotels", "Hero", "Maruti",
];

export function TrustedBy() {
  return (
    <section className="section-spacing bg-cream overflow-hidden">
      <div className="container-main">
        <SectionHeader
          title="Companies That Trust Print Dekho"
          description="Partnering with India's leading brands for premium corporate gifting solutions"
        />
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mt-10">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...companies, ...companies].map((company, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-8 text-lg md:text-xl font-heading font-bold text-secondary/20 hover:text-secondary/50 transition-colors duration-300 select-none"
            >
              {company}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 - Reverse */}
      <div className="relative mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {[...companies.slice(12), ...companies.slice(0, 12), ...companies.slice(12), ...companies.slice(0, 12)].map((company, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-8 text-lg md:text-xl font-heading font-bold text-secondary/20 hover:text-secondary/50 transition-colors duration-300 select-none"
            >
              {company}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
