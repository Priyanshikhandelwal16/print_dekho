"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const confettiDots = [
  { color: "#FF5E13", x: -60, y: -40, delay: 0.3, size: 10 },
  { color: "#C8A96A", x: 80, y: -60, delay: 0.5, size: 8 },
  { color: "#FF5E13", x: -90, y: 30, delay: 0.7, size: 6 },
  { color: "#C8A96A", x: 70, y: 50, delay: 0.4, size: 12 },
];

export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-ivory section-spacing">
      <div className="container-main text-center">
        <div className="max-w-lg mx-auto relative">
          {/* Confetti dots */}
          {confettiDots.map((dot, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.8],
                y: [0, dot.y - 20, dot.y, dot.y + 30],
                x: [0, dot.x * 0.5, dot.x, dot.x * 1.1],
              }}
              transition={{
                duration: 2.5,
                delay: dot.delay,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
              className="absolute top-1/3 left-1/2 rounded-full pointer-events-none"
              style={{
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
              }}
            />
          ))}

          {/* Checkmark animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
          >
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </motion.svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-heading font-bold text-2xl md:text-3xl text-charcoal"
          >
            Thank You! Your Inquiry Has Been Received
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-4 text-muted text-base md:text-lg max-w-md mx-auto"
          >
            Our team will review your requirements and get back to you within 24 hours.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8"
          >
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
