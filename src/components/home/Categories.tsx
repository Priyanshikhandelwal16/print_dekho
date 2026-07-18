"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const categories = [
  { name: "Corporate Kits", count: "120+ Products", image: "/images/slider_welcome_kit.png", span: "lg:col-span-8" },
  { name: "Drinkware", count: "85+ Products", image: "/images/slider_drinkware.png", span: "lg:col-span-4" },
  { name: "Bags", count: "60+ Products", image: "/images/new-bags-(2).jpeg", span: "lg:col-span-4" },
  { name: "Apparel", count: "200+ Products", image: "/images/slider_apparel.png", span: "lg:col-span-8" },
  { name: "Sports Jerseys", count: "50+ Designs", image: "/images/sports-jersey.jpg", span: "lg:col-span-4" },
  { name: "Stationery", count: "70+ Products", image: "/images/slider_gifts.png", span: "lg:col-span-4" },
  { name: "Gift Hampers", count: "40+ Combos", image: "/images/slider_branding.png", span: "lg:col-span-4" },
  { name: "Promotional", count: "90+ Products", image: "/images/pt-1.jpeg", span: "lg:col-span-4" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export function Categories() {
  return (
    <section className="section-spacing bg-ivory">
      <div className="container-main">
        <SectionHeader
          label="EXPLORE COLLECTION"
          title="Product Categories"
          description="Browse our extensive range of premium corporate gifting products"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mt-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={`col-span-1 md:col-span-1 ${cat.span}`}
            >
              <Link href="/products" className="group relative block h-[360px] lg:h-[460px] rounded-[26px] overflow-hidden border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-2xl transition-all duration-500">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-750 group-hover:scale-104"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-heading font-extrabold text-white text-xl lg:text-2xl group-hover:text-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {cat.count}
                    </p>
                  </div>
                </div>

                {/* Top corner accent */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
