"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Scissors, Printer, Zap, Sun, Flame, Sparkles, FileText, CheckCircle2 } from "lucide-react";

const brandingMethods = [
  {
    icon: Scissors,
    title: "Embroidery",
    subtitle: "Premium & Raised Texture",
    description: "Perfect for polo t-shirts, caps, jackets, and bags. Provides a premium, high-quality raised look that is extremely durable and professional.",
    bestFor: "Polo Shirts, Hoodies, Caps, Backpacks",
    limitations: "Small text (<5mm) and complex color gradients.",
    image: "/images/inhouse.png"
  },
  {
    icon: Printer,
    title: "Screen Printing",
    subtitle: "Vibrant & Cost-Effective",
    description: "Ideal for large bulk orders. Layers ink directly onto the fabric surface. Offers bold, bright, long-lasting colors.",
    bestFor: "Round Neck T-Shirts, Tote Bags, Cotton Apparel",
    limitations: "High setup cost for low quantities; gradient designs.",
    image: "/images/slider_apparel.png"
  },
  {
    icon: Zap,
    title: "Laser Engraving",
    subtitle: "Sleek & Permanent",
    description: "Permanently etches your logo into metal, wood, or leather surfaces. Extremely clean, precise, and never fades or peels.",
    bestFor: "Steel Bottles, Flasks, Metal Pens, Keychains",
    limitations: "Single color only (reveals the material underneath).",
    image: "/images/slider_drinkware.png"
  },
  {
    icon: Sun,
    title: "UV Printing",
    subtitle: "Full Color & Photo Quality",
    description: "Instantly cures ink using UV light, allowing high-resolution full-color prints on plastics, wood, acrylics, and hard surfaces.",
    bestFor: "Tech Accessories, Mugs, Diaries, Desk Organizers",
    limitations: "Mainly for flat surfaces.",
    image: "/images/quality-assure.png"
  },
  {
    icon: Flame,
    title: "Heat Transfer (DTF)",
    subtitle: "Highly Detailed Prints",
    description: "Transfers full-color digital designs onto fabric using heat and pressure. Excellent for high-detail illustrations and multi-color graphics.",
    bestFor: "Sports Jerseys, Custom Tees, Multi-color logos",
    limitations: "Slightly less breathable than screen printing.",
    image: "/images/kit_after.png"
  }
];

const fileFormats = [
  { ext: "AI / CDR / EPS", name: "Vector Files (Highly Recommended)", desc: "These can be infinitely scaled without losing quality. Required for engraving, embroidery digitizing, and screen printing." },
  { ext: "PDF", name: "Vector PDF", desc: "Ensure text is converted to outlines or paths so fonts load correctly on all computers." },
  { ext: "PNG", name: "High-Resolution PNG", desc: "Must be transparent background with at least 300 DPI. Best for full-color digital or UV printing." },
  { ext: "JPG / JPEG", name: "Standard Image", desc: "Not ideal for branding. If used, it must be clean, high-resolution, and might require design recreation." }
];

export default function BrandingGuidePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Logo & Print Specifications
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Branding & Customization Guide
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto leading-relaxed">
              We employ advanced, in-house printing and embroidery technologies to replicate your logo exactly. Learn about our branding techniques and artwork guidelines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <SectionHeader
            label="Techniques"
            title="Our Branding Methods"
            description="We select and execute the optimal branding process tailored to the material of your chosen product."
          />

          <div className="space-y-16 mt-12">
            {brandingMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Text Content */}
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{method.subtitle}</span>
                      <h3 className="font-heading font-bold text-xl text-secondary">{method.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted leading-relaxed">{method.description}</p>
                  
                  <div className="mt-6 space-y-2 border-t border-border/60 pt-4">
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold text-secondary flex-shrink-0">Best For:</span>
                      <span className="text-muted">{method.bestFor}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold text-secondary flex-shrink-0">Note:</span>
                      <span className="text-muted">{method.limitations}</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative h-[280px] md:h-[320px] rounded-[22px] overflow-hidden border border-border/40 shadow-sm ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <Image
                    src={method.image}
                    alt={method.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Artwork Guidelines</span>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-secondary mt-2">
                Artwork & Logo Specifications
              </h2>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                To guarantee clean, sharp, and pixel-perfect printing/embroidery of your logo, we request you to share artwork meeting the following parameters. Our design team is happy to assist if you require file conversion.
              </p>

              <div className="mt-8 space-y-4">
                {fileFormats.map((format, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-border/40">
                    <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-secondary flex items-center gap-2">
                        {format.name} <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded-md">{format.ext}</span>
                      </h4>
                      <p className="text-[11px] text-muted mt-1 leading-relaxed">{format.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Colors & Pantone */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-10 bg-white rounded-[26px] border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-secondary mt-4">Pantone Color Matching</h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                We use the standard **Pantone Matching System (PMS)** to ensure color consistency across print methods and materials.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2.5 text-xs text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Specify your exact PMS color codes when sending your design assets.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Allows consistency across fabrics (shirts), metals (bottles), and paper (boxes).</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Complimentary mockup preview provided for approval prior to production.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted font-heading font-semibold">Have questions about artwork formats?</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href="/contact" size="sm">Talk to Designer</Button>
                  <Button href="/bulk-inquiry" variant="secondary" size="sm">Get Mockup Setup</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-charcoal">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] text-white">
              Ready to See Your Brand on Merchandise?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto leading-relaxed">
              Submit your logo, select the products, and our design team will construct a complimentary digital mockup in 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get Free Digital Mockups
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Contact Sales Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
