"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, HelpCircle, Check, Info, ShieldCheck, Compass } from "lucide-react";

const moqCategories = [
  { category: "Drinkware & Bottles", moq: "50 Units", details: "Includes custom laser engraving or UV printing.", icon: "Flask" },
  { category: "Corporate Apparel", moq: "50 Units", details: "Applies to Polo Tees, Hoodies, and Jackets with custom embroidery or printing.", icon: "Shirt" },
  { category: "Stationery & Diaries", moq: "50 Units", details: "Custom leather diaries, notebook sets, and premium pens.", icon: "BookOpen" },
  { category: "Employee Welcome Kits", moq: "50 Units", details: "Includes custom layout, assembly, standard branded box, and items.", icon: "Gift" },
  { category: "Custom Packaging Boxes", moq: "100 Units", details: "Full-color customized printing on corrugated boxes.", icon: "Package" },
  { category: "Luxury Combo Gift Sets", moq: "25 Units", details: "Premium curated gift boxes for executives and VIP clients.", icon: "Briefcase" },
  { category: "Promotional Giveaways", moq: "100 - 200 Units", details: "Keychains, standard plastic pens, and custom branded stickers.", icon: "Smile" }
];

const faqs = [
  { q: "Why do you have Minimum Order Quantities (MOQs)?", a: "MOQs are necessary because custom branding involves significant machine setup, ink calibration, screens, plate creation, or embroidery digitization. Spreading these setup costs over a minimum number of items keeps the per-unit price affordable." },
  { q: "Can I order less than the specified MOQ?", a: "For certain premium items or trial corporate kits, we can occasionally accommodate smaller quantities (e.g. 20-30 units). However, the per-unit price will be higher to cover setup charges. Contact us to discuss your project." },
  { q: "How does your product sampling policy work?", a: "We want you to be 100% confident in the quality. We provide physical pre-production samples (branded or unbranded) for a nominal sample fee. Once you approve and place the bulk order, the sample fee is fully adjusted in the final invoice." }
];

export default function MOQPage() {
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
              Ordering Policies
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Minimum Order Quantity (MOQ)
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto leading-relaxed">
              We offer low, flexible MOQs to help companies of all sizes secure premium customized merchandise without excessive inventory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MOQ Table Section */}
      <section className="section-spacing bg-white">
        <div className="container-main max-w-4xl">
          <SectionHeader
            label="MOQ Reference"
            title="Typical MOQs by Category"
            description="Below is the standard minimum quantity required for branded orders. Rates improve at higher volume tiers."
          />

          <div className="mt-10 overflow-hidden rounded-[22px] border border-border/80 shadow-sm bg-white">
            <div className="grid grid-cols-3 bg-stone border-b border-border/80 p-4 text-xs font-bold text-secondary tracking-wider uppercase">
              <div className="col-span-1">Product Category</div>
              <div className="col-span-1 text-center">Minimum Quantity</div>
              <div className="col-span-1">Details</div>
            </div>
            
            <div className="divide-y divide-border/60">
              {moqCategories.map((item, i) => (
                <div key={i} className="grid grid-cols-3 p-4 items-center text-sm">
                  <div className="col-span-1 font-heading font-semibold text-secondary">
                    {item.category}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="inline-block px-3 py-1 bg-accent/15 text-accent text-xs font-bold rounded-full">
                      {item.moq}
                    </span>
                  </div>
                  <div className="col-span-1 text-xs text-muted leading-relaxed">
                    {item.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sampling & Details */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Confidence First</span>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-secondary mt-2">
                Quality Assurance & Sample Policy
              </h2>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                We believe you should see and feel the product quality before committing to bulk manufacturing. Our sample workflow makes it risk-free to build your order.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0 text-accent">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-secondary">1. Order an Unbranded/Branded Sample</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">Select items and get samples shipped to your office in 2-3 business days. Sample fees apply.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0 text-accent">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-secondary">2. Review Quality & Branding</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">Inspect embroidery density, engrave clarity, and fabric feel to ensure everything meets corporate parameters.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0 text-accent">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-secondary">3. Cost Adjusted in Bulk Order</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">Once you proceed with the bulk order, the sample charges are deducted from your final invoice.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-10 bg-white rounded-[26px] border border-border space-y-6"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-accent" />
                <h3 className="font-heading font-extrabold text-lg text-secondary">MOQ Questions</h3>
              </div>

              <div className="space-y-5 divide-y divide-border/60">
                {faqs.map((faq, i) => (
                  <div key={i} className={i > 0 ? "pt-4" : ""}>
                    <h4 className="font-heading font-bold text-xs text-secondary flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      {faq.q}
                    </h4>
                    <p className="text-[11px] text-muted mt-1.5 leading-relaxed pl-5">{faq.a}</p>
                  </div>
                ))}
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
              Have a Custom Quantity in Mind?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto leading-relaxed">
              We always do our best to support smaller trial orders and pilot launches. Get in touch with our sales team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Sales
              </Button>
              <Button href="/bulk-inquiry" variant="ghost" size="lg">
                Submit Bulk Enquiry
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
