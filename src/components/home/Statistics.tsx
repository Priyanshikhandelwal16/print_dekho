"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 10000, suffix: "+", label: "Orders Delivered" },
  { value: 50, suffix: "+", label: "Product Categories" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 0, suffix: "", label: "Pan India", display: "Pan India" },
  { value: 12, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || display) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, display]);

  if (display) {
    return <span ref={ref} className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-gold">{display}</span>;
  }

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="section-spacing bg-charcoal relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} display={stat.display} />
              <p className="mt-2 text-white/50 text-xs md:text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
