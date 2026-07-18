"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Corporate Gift Kits",
    slug: "corporate-gift-kits",
    description: "Curated branded kits for employees, clients, dealers & events.",
    image: "/images/slider_gifts.png",
    count: "120+ Products",
    span: "lg:col-span-2",
  },
  {
    name: "Employee Welcome Kits",
    slug: "welcome-kits",
    description: "Onboarding kits with branded essentials for new hires.",
    image: "/images/kit_after.png",
    count: "80+ Products",
    span: "lg:col-span-1",
  },
  {
    name: "Drinkware & Bottles",
    slug: "drinkware",
    description: "Premium steel bottles, coffee mugs & vacuum flasks.",
    image: "/images/slider_drinkware.png",
    count: "60+ Products",
    span: "lg:col-span-1",
  },
  {
    name: "Bags & Backpacks",
    slug: "bags",
    description: "Laptop bags, tote bags, duffle bags & travel backpacks.",
    image: "/images/new-bags-(2).jpeg",
    count: "45+ Products",
    span: "lg:col-span-2",
  },
  {
    name: "Corporate Apparel",
    slug: "apparel",
    description: "Polo tees, collar shirts, round necks & uniforms.",
    image: "/images/slider_apparel.png",
    count: "80+ Products",
    span: "lg:col-span-2",
  },
  {
    name: "Sports Jerseys",
    slug: "sports-jerseys",
    description: "Custom sublimated jerseys for corporate events & tournaments.",
    image: "/images/sports-jersey.jpg",
    count: "50+ Designs",
    span: "lg:col-span-1",
  },
  {
    name: "Stationery & Diaries",
    slug: "stationery",
    description: "Executive diaries, branded pens & desk accessories.",
    image: "/images/slider_gifts.png",
    count: "35+ Products",
    span: "lg:col-span-1",
  },
  {
    name: "Promotional T-Shirts",
    slug: "promotional",
    description: "Event t-shirts, campaign wear & marathon tees.",
    image: "/images/pt-1.jpeg",
    count: "40+ Designs",
    span: "lg:col-span-1",
  },
  {
    name: "Combo Sets",
    slug: "combo-sets",
    description: "Luxury gift sets with bottles, mugs, bags & more.",
    image: "/images/co-2.jpeg",
    count: "30+ Sets",
    span: "lg:col-span-1",
  },
  {
    name: "Festival Hampers",
    slug: "festival-hampers",
    description: "Seasonal & festival gifting hampers for Diwali, Christmas & New Year.",
    image: "/images/slider_branding.png",
    count: "25+ Hampers",
    span: "lg:col-span-1",
  },
];

export default function ProductsPage() {
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
              Our Products
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Explore Our Corporate Gifting Solutions
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              50+ product categories, all customizable with your company branding. From welcome kits to event merchandise — everything under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <SectionHeader
            label="Categories"
            title="Browse All Product Categories"
            description="Find the perfect corporate gifting solution for every occasion."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full max-w-[400px] sm:max-w-none mx-auto ${cat.span}`}
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="group block h-full relative rounded-[26px] overflow-hidden border border-border/40 hover:border-accent/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-[380px] lg:h-[480px] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-750"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                    
                    {/* Floating Count Tag */}
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider text-accent uppercase shadow-sm">
                      {cat.count}
                    </div>

                    {/* Bottom Drawer (Glassmorphic) */}
                    <div className="absolute bottom-4 left-4 right-4 p-5 rounded-[20px] bg-secondary/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 group-hover:bg-secondary/60 group-hover:translate-y-[-4px]">
                      <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-gold transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-white/80 line-clamp-2 leading-relaxed font-light">{cat.description}</p>
                      
                      <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-gold group-hover:text-white transition-colors duration-300">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
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
              Need Custom Branding? Get a Bulk Quote
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Share your requirements and get a custom quote with best pricing within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Send Bulk Inquiry
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
