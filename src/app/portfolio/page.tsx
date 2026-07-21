"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const filterCategories = ["All", "Corporate Kits", "Apparel", "Drinkware", "Bags", "Events"];

const portfolioItems = [
  { image: "/images/image-gallery-1.jpeg", category: "Corporate Kits", title: "Employee Welcome Kit" },
  { image: "/images/image-gallery-2.jpeg", category: "Events", title: "Annual Summit Merchandise" },
  { image: "/images/image-gallery-3.jpeg", category: "Corporate Kits", title: "Festival Gift Set" },
  { image: "/images/image-gallery-4.jpeg", category: "Corporate Kits", title: "Executive Appreciation Kit" },
  { image: "/images/image-gallery-5.jpeg", category: "Events", title: "Product Launch Event" },
  { image: "/images/image-gallery-6.jpeg", category: "Corporate Kits", title: "Dealer Conference Kit" },
  { image: "/images/slider_apparel.png", category: "Apparel", title: "Corporate Polo Collection" },
  { image: "/images/polo-3.webp", category: "Apparel", title: "Team Uniform Branding" },
  { image: "/images/collar-1.webp", category: "Apparel", title: "Executive Collar Shirts" },
  { image: "/images/sports-jersey.jpg", category: "Events", title: "Corporate Tournament Jerseys" },
  { image: "/images/slider_drinkware.png", category: "Drinkware", title: "Premium Steel Bottles" },
  { image: "/images/designer-mug.jpeg", category: "Drinkware", title: "Designer Coffee Mugs" },
  { image: "/images/cup.jpeg", category: "Drinkware", title: "Branded Tumblers" },
  { image: "/images/new-bags-(2).jpeg", category: "Bags", title: "Laptop Backpacks" },
  { image: "/images/printed-bags.jpeg", category: "Bags", title: "Tote Bags Collection" },
  { image: "/images/slider_welcome_kit.png", category: "Corporate Kits", title: "Premium Client Gift" },
  { image: "/images/slider_branding.png", category: "Corporate Kits", title: "Holiday Season Hamper" },
  { image: "/images/co-2.jpeg", category: "Events", title: "Award Ceremony Gifts" },
];

import { useSiteData } from "@/lib/useSiteData";

export default function PortfolioPage() {
  const { data } = useSiteData();
  const portfolioItems = data?.portfolio || [];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item: any) => item.category === activeFilter);

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
              Our Portfolio
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Our Work
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              Browse our recent projects — from curated corporate kits to branded event merchandise delivered across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-[16px] text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-secondary text-white shadow-lg"
                    : "bg-stone text-muted hover:bg-cream border border-border"
                }`}
                suppressHydrationWarning
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item: any, i: number) => (
              <motion.div
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative break-inside-avoid rounded-[22px] overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`relative ${i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-64" : "h-72"} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/50 lg:bg-charcoal/0 lg:group-hover:bg-charcoal/60 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 text-center px-6">
                      <p className="font-heading font-bold text-white text-sm md:text-base lg:text-lg">{item.title}</p>
                      <p className="mt-2 text-white/70 text-xs md:text-sm">View Project</p>
                    </div>
                  </div>
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
              Want Your Brand Featured Here?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Let us create stunning branded merchandise that makes your company stand out.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Talk to Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
