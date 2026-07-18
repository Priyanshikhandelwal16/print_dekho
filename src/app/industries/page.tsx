"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Monitor, Heart, GraduationCap, Hotel, Factory, Landmark, Building2, ShoppingBag, HardHat, Home, Car, Rocket } from "lucide-react";

const industries = [
  { icon: Monitor, title: "IT & Technology", description: "Branded merchandise for tech teams, hackathons, onboarding kits & client gifting.", clients: "120+" },
  { icon: Heart, title: "Healthcare", description: "Hospital branding, doctor appreciation kits, staff uniforms & event merchandise.", clients: "45+" },
  { icon: GraduationCap, title: "Education", description: "University merchandise, alumni kits, convocation gifts & branded stationery.", clients: "60+" },
  { icon: Hotel, title: "Hotels & Hospitality", description: "Guest welcome kits, staff uniforms, branded amenities & conference merchandise.", clients: "35+" },
  { icon: Factory, title: "Manufacturing", description: "Safety gear branding, dealer gifts, employee milestone awards & event kits.", clients: "55+" },
  { icon: Landmark, title: "Finance & Banking", description: "Premium client gifts, executive kits, branded portfolios & achievement awards.", clients: "40+" },
  { icon: Building2, title: "Government", description: "Event merchandise, conference kits, appreciation awards & printed materials.", clients: "25+" },
  { icon: ShoppingBag, title: "Retail & E-Commerce", description: "Packaging solutions, brand merchandise, loyalty gifts & promotional items.", clients: "50+" },
  { icon: HardHat, title: "Construction", description: "Safety branded gear, site uniforms, milestone gifts & team merchandise.", clients: "30+" },
  { icon: Home, title: "Real Estate", description: "Client closing gifts, broker kits, project launch merchandise & branded stationery.", clients: "45+" },
  { icon: Car, title: "Automobile", description: "Dealer gifts, showroom branding, customer delivery kits & team uniforms.", clients: "35+" },
  { icon: Rocket, title: "Startups", description: "Employee swag, investor kits, launch merchandise & branded culture items.", clients: "80+" },
];

export default function IndustriesPage() {
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
              Who We Serve
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Industries We Serve
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              From IT giants to startups, we serve 500+ businesses across 12+ industries with customized branded merchandise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <SectionHeader
            label="Industries"
            title="Tailored Solutions for Every Sector"
            description="We understand the unique gifting needs of each industry."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 bg-stone rounded-[22px] border border-border hover:border-accent/30 hover:shadow-lg hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                  <industry.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-base text-secondary">{industry.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{industry.description}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-semibold text-accent">{industry.clients} Clients Served</span>
                </div>
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
              Don&apos;t See Your Industry? We Still Got You.
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              We customize solutions for any industry. Tell us your requirements and we&apos;ll craft the perfect gifting strategy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
