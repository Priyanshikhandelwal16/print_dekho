"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const projects = [
  { image: "/images/image-gallery-1.jpeg", title: "Tech Company Welcome Kits", height: "h-64 md:h-80" },
  { image: "/images/image-gallery-2.jpeg", title: "Hotel Chain Branded Merchandise", height: "h-72 md:h-96" },
  { image: "/images/image-gallery-3.jpeg", title: "Startup Onboarding Packages", height: "h-56 md:h-72" },
  { image: "/images/image-gallery-4.jpeg", title: "Corporate Event Giveaways", height: "h-72 md:h-96" },
  { image: "/images/image-gallery-5.jpeg", title: "Festival Gift Hampers", height: "h-60 md:h-80" },
  { image: "/images/image-gallery-6.jpeg", title: "Premium Award Kits", height: "h-64 md:h-72" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function Portfolio() {
  return (
    <section className="section-spacing bg-ivory">
      <div className="container-main">
        <SectionHeader
          label="OUR WORK"
          title="Featured Projects"
          description="A glimpse into the premium corporate gifting solutions we've delivered for brands across India"
        />

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 mt-12 space-y-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="break-inside-avoid"
            >
              <div className={`group relative ${project.height} rounded-[22px] overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/50 lg:bg-charcoal/0 lg:group-hover:bg-charcoal/60 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 text-center px-6">
                    <p className="font-heading font-bold text-white text-sm md:text-base lg:text-lg">{project.title}</p>
                    <p className="mt-2 text-white/70 text-xs md:text-sm">View Project</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
