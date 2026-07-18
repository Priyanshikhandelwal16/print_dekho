"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, FileText, BookOpen, Palette, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CataloguePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you, ${formData.name}! Your catalogue download request has been received. We'll send it to ${formData.email} shortly.`
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const features = [
    {
      icon: <Package className="w-5 h-5 text-accent" />,
      text: "50+ product categories with detailed images",
    },
    {
      icon: <Palette className="w-5 h-5 text-accent" />,
      text: "Customization & branding options explained",
    },
    {
      icon: <FileText className="w-5 h-5 text-accent" />,
      text: "MOQ details, pricing guides & lead times",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-accent" />,
      text: "Corporate kit combinations & festival hampers",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-cream pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-heading font-semibold text-xs uppercase tracking-[0.15em] text-accent mb-4">
                Free Download
              </span>
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-charcoal text-balance leading-tight">
                Download Our Product Catalogue
              </h1>
              <p className="mt-6 text-muted text-base md:text-lg max-w-lg leading-relaxed">
                Get instant access to our comprehensive product catalogue featuring
                50+ categories, MOQ information, branding options, and everything
                you need to plan your next corporate gifting project.
              </p>

              <div className="mt-8 space-y-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    {feature.icon}
                    <span className="text-sm text-charcoal/70">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 bg-white rounded-[22px] shadow-sm border border-border/40"
              >
                <h2 className="font-heading font-bold text-xl text-charcoal mb-2">
                  Get Instant Access
                </h2>
                <p className="text-sm text-muted mb-8">
                  Fill in your details and download the catalogue right away.
                </p>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone border border-border/50 rounded-xl text-sm text-charcoal placeholder:text-muted/60 transition-all duration-300"
                      placeholder="Your full name"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone border border-border/50 rounded-xl text-sm text-charcoal placeholder:text-muted/60 transition-all duration-300"
                      placeholder="you@company.com"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone border border-border/50 rounded-xl text-sm text-charcoal placeholder:text-muted/60 transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone border border-border/50 rounded-xl text-sm text-charcoal placeholder:text-muted/60 transition-all duration-300"
                      placeholder="Your company name"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<Download className="w-4 h-4" />}
                    className="w-full"
                  >
                    Download Catalogue
                  </Button>
                </div>

                <p className="mt-4 text-xs text-muted text-center">
                  Free download • No spam • Instant access
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
