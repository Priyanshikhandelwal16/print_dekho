"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="section-spacing bg-charcoal relative overflow-hidden">
      {/* Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
            Ready to Build Your Brand with Premium Corporate Gifting?
          </h2>
          <p className="mt-5 text-white/50 text-sm md:text-base max-w-xl mx-auto">
            Get started with India&apos;s most trusted corporate gifting partner. From 50 to 50,000 pieces, we deliver excellence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" className="!bg-accent !text-white hover:!bg-accent/90">
              Request Bulk Quote
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="!border-white/30 !text-white hover:!bg-white hover:!text-charcoal">
              Talk to Expert
            </Button>
            <Button href="/catalog" variant="ghost" size="lg" className="!text-white/70 hover:!text-white !decoration-white/30">
              Download Catalogue
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
