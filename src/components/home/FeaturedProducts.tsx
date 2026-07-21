"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useSiteData } from "@/lib/useSiteData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function FeaturedProducts() {
  const { data } = useSiteData();
  const products = (data?.products || []).slice(0, 6);

  return (
    <section className="section-spacing bg-stone">
      <div className="container-main">
        <SectionHeader
          label="BEST SELLERS"
          title="Popular Products"
          description="Our most requested corporate gifting products, loved by brands across India"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-12">
          {products.map((product: any, i: number) => (
            <motion.div
              key={product.id || product.name || i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="w-full max-w-[400px] sm:max-w-none mx-auto"
            >
              <Link href={product.categorySlug ? `/products/${product.categorySlug}` : "/products"} className="group block">
                <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-[24px] overflow-hidden bg-cream border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all duration-500">
                  <Image
                    src={product.image || "/images/slider_gifts.png"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-750 group-hover:scale-104"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4 px-1">
                  <span className="text-[9px] font-bold tracking-widest text-accent/80 uppercase">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-heading font-bold text-sm lg:text-base text-secondary group-hover:text-accent transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <Button href="/products" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            View All Products & Categories
          </Button>
        </div>
      </div>
    </section>
  );
}
