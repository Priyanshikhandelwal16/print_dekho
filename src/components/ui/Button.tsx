"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading font-semibold transition-all duration-300 ease-out active:scale-[0.96]";

  const variants = {
    primary:
      "bg-[#1B1B1B] text-white hover:bg-accent hover:shadow-lg hover:shadow-accent/20",
    secondary:
      "bg-transparent border border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white",
    ghost:
      "text-accent hover:text-accent/80 underline underline-offset-4 decoration-accent/40 hover:decoration-accent",
    outline:
      "bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs gap-1.5",
    md: "px-7 py-3 text-sm gap-2",
    lg: "px-9 py-4 text-[0.9rem] gap-2.5",
  };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    "rounded-[16px]",
    className,
    disabled && "opacity-50 pointer-events-none"
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
          {icon && <span className="ml-1">{icon}</span>}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      suppressHydrationWarning
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}
