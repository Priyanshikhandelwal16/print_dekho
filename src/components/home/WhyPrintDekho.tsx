"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    title: "Bulk Manufacturing",
    description: "Large-scale production capabilities with MOQ as low as 50 pieces. Equipped for orders of any size.",
    image: "/images/inhouse.png",
  },
  {
    title: "Premium Quality",
    description: "Rigorous 3-stage quality checks ensuring every product meets corporate standards.",
    image: "/images/quality-assure.png",
  },
  {
    title: "Corporate Branding",
    description: "Advanced printing, embroidery, sublimation & engraving for lasting brand impressions.",
    image: "/images/slider_branding.png",
  },
  {
    title: "Fast Turnaround",
    description: "7-12 day delivery on standard orders. Express options available for urgent requirements.",
    image: "/images/service.png",
  },
  {
    title: "Dedicated Account Manager",
    description: "A single point of contact who understands your brand and manages every detail.",
    image: "/images/slider_welcome_kit.png",
  },
  {
    title: "Pan India Delivery",
    description: "Reliable logistics network ensuring safe delivery to any location across India.",
    image: "/images/kit_after.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function WhyPrintDekho() {
  return (
    <section className="section-spacing bg-stone">
      <div className="container-main">
        <SectionHeader
          label="WHY CHOOSE US"
          title="Why Companies Choose Print Dekho"
          description="Since 2012, we've been delivering premium corporate gifting solutions trusted by 500+ brands across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col h-full bg-white rounded-[22px] overflow-hidden border border-border/50 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden flex-shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-start">
                <h3 className="font-heading font-bold text-lg md:text-xl text-secondary">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
