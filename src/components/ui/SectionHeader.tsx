"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "mb-10 lg:mb-14",
        align === "center" && "text-center max-w-2xl mx-auto",
        align === "left" && "max-w-xl",
        className
      )}
    >
      {label && (
        <span
          className={clsx(
            "inline-block text-[11px] font-semibold uppercase tracking-[0.2em] mb-3",
            "text-accent"
          )}
        >
          {label}
        </span>
      )}

      <h2
        className={clsx(
          "font-heading font-extrabold leading-[1.1] tracking-tight",
          "text-[1.6rem] md:text-[2.1rem] lg:text-[2.65rem]",
          dark ? "text-white" : "text-secondary"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            "mt-4 text-[0.9rem] md:text-[0.95rem] leading-relaxed",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
