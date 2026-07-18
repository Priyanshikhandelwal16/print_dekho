"use client";

import { motion } from "framer-motion";
import {
  Monitor, Heart, GraduationCap, Hotel, Factory, Landmark,
  Building2, ShoppingCart, HardHat, Home, Car, Rocket,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const industries = [
  { name: "IT & Technology", icon: Monitor, clients: "80+" },
  { name: "Healthcare", icon: Heart, clients: "45+" },
  { name: "Education", icon: GraduationCap, clients: "60+" },
  { name: "Hotels & Hospitality", icon: Hotel, clients: "35+" },
  { name: "Manufacturing", icon: Factory, clients: "50+" },
  { name: "Finance & Banking", icon: Landmark, clients: "40+" },
  { name: "Government", icon: Building2, clients: "25+" },
  { name: "Retail & E-commerce", icon: ShoppingCart, clients: "55+" },
  { name: "Construction", icon: HardHat, clients: "30+" },
  { name: "Real Estate", icon: Home, clients: "35+" },
  { name: "Automobile", icon: Car, clients: "20+" },
  { name: "Startups", icon: Rocket, clients: "70+" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
  }),
};

export function Industries() {
  return (
    <section className="section-spacing bg-charcoal">
      <div className="container-main">
        <SectionHeader
          label="INDUSTRIES WE SERVE"
          title="Trusted Across Every Sector"
          description="From startups to enterprises, we deliver premium corporate gifting solutions for every industry"
          dark
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="group relative bg-white/5 border border-white/10 rounded-[18px] p-6 hover:bg-accent hover:border-accent/50 transition-all duration-500 cursor-default"
            >
              <industry.icon
                size={28}
                className="text-white/60 group-hover:text-white transition-colors duration-300"
              />
              <h3 className="mt-4 font-heading font-semibold text-sm text-white/90 group-hover:text-white transition-colors">
                {industry.name}
              </h3>
              <p className="mt-1 text-xs text-white/40 group-hover:text-white/80 transition-colors">
                {industry.clients} Clients
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
