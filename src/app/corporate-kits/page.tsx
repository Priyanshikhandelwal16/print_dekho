"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Gift, Briefcase, Award, Users, PartyPopper, Laptop } from "lucide-react";

const kitTypes = [
  {
    icon: Users,
    title: "Employee Welcome Kit",
    image: "/images/slider_welcome_kit.png",
    items: ["Branded T-Shirt", "Steel Bottle", "Diary & Pen", "Laptop Bag", "Welcome Card"],
    moq: "50 units",
  },
  {
    icon: Briefcase,
    title: "Joining Kit",
    image: "/images/kit_after.png",
    items: ["Polo T-Shirt", "ID Card Holder", "Notebook", "Coffee Mug", "Tote Bag"],
    moq: "50 units",
  },
  {
    icon: Award,
    title: "Executive Kit",
    image: "/images/slider_gifts.png",
    items: ["Premium Bottle", "Leather Diary", "Metal Pen Set", "Wireless Charger", "Gift Box"],
    moq: "25 units",
  },
  {
    icon: Gift,
    title: "Dealer Kit",
    image: "/images/cp3.jpeg",
    items: ["Branded Bag", "Polo Shirt", "Steel Flask", "Certificate", "Premium Packaging"],
    moq: "100 units",
  },
  {
    icon: PartyPopper,
    title: "Festival Kit",
    image: "/images/slider_branding.png",
    items: ["Dry Fruits Box", "Branded Mug", "Scented Candle", "Greeting Card", "Festival Packaging"],
    moq: "50 units",
  },
  {
    icon: Laptop,
    title: "Work-From-Home Kit",
    image: "/images/cp5.jpeg",
    items: ["Laptop Stand", "Mouse Pad", "Coffee Mug", "Stationery Set", "Branded Box"],
    moq: "50 units",
  },
];

const kitItems = [
  { name: "Steel Bottles", image: "/images/slider_drinkware.png" },
  { name: "T-Shirts", image: "/images/round.jpeg" },
  { name: "Diaries", image: "/images/diary.jpeg" },
  { name: "Bags", image: "/images/new-bags-(2).jpeg" },
  { name: "Mugs", image: "/images/cup.jpeg" },
  { name: "Polo Tees", image: "/images/slider_apparel.png" },
];

import { useSiteData } from "@/lib/useSiteData";

const iconMap: Record<string, any> = {
  "Employee Welcome Kit": Users,
  "Joining Kit": Briefcase,
  "Executive Kit": Award,
  "Dealer Kit": Gift,
  "Festival Kit": PartyPopper,
  "Work-From-Home Kit": Laptop,
};

export default function CorporateKitsPage() {
  const { data } = useSiteData();
  const kits = data?.corporateKits || [];

  const kitTypes = kits.map((kit: any) => ({
    ...kit,
    icon: iconMap[kit.title] || Gift,
  }));

  return (
    <>
      {/* Hero — cream */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                Corporate Kits
              </span>
              <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
                Curated Corporate Kits
              </h1>
              <p className="mt-5 text-[0.95rem] text-muted leading-relaxed max-w-lg">
                Ready-to-brand kit combinations for every corporate need — from employee onboarding to executive gifting. Each kit is fully customizable with your logo, colors, and packaging.
              </p>
              <div className="mt-8">
                <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Get Kit Pricing
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] rounded-[26px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/gift2.jpeg"
                  alt="Curated corporate gift kit"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold/20 rounded-[22px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kit Types — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <SectionHeader
            label="Kit Types"
            title="Choose Your Kit Category"
            description="Pre-designed kit combinations — or create your own custom kit."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kitTypes.map((kit: any, i: number) => (
              <motion.div
                key={kit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-stone rounded-[22px] border border-border overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 lg:h-64 overflow-hidden">
                  <Image
                    src={kit.image}
                    alt={kit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/5">
                      <kit.icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-secondary">{kit.title}</h3>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {(kit.items || []).map((item: any) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted">
                        <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted">MOQ: {kit.moq}</span>
                    <span className="text-xs font-semibold text-accent">Customize →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit Builder — stone */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="Build Your Kit"
            title="What Goes in a Corporate Kit?"
            description="Mix and match products to create the perfect branded kit for your team."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {kitItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group text-center"
              >
                <div className="relative aspect-[3/4] rounded-[22px] overflow-hidden border border-border bg-white group-hover:border-accent/30 group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 16vw"
                  />
                </div>
                <p className="mt-3 font-heading font-semibold text-xs text-secondary">{item.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-6 bg-white rounded-[22px] border border-border text-center"
          >
            <p className="text-sm text-muted">
              <span className="font-semibold text-secondary">Can&apos;t find what you need?</span> We create fully custom kits with any combination of products. Share your requirements and we&apos;ll curate the perfect kit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before/After Branding — ivory */}
      <section className="section-spacing bg-ivory">
        <div className="container-main">
          <SectionHeader
            label="Branding"
            title="Before & After Branding"
            description="See how your brand transforms plain products into powerful corporate gifts."
          />

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative aspect-video rounded-[22px] overflow-hidden border border-border bg-white shadow-sm transition-all duration-300 group-hover:border-secondary/20 group-hover:shadow-md">
                <Image
                  src="/images/kit_before.png"
                  alt="Welcome kit before branding"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="50vw"
                />
              </div>
              <p className="mt-4 font-heading font-bold text-sm text-muted uppercase tracking-wider">Before Branding (Plain Kit)</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative aspect-video rounded-[22px] overflow-hidden border border-accent/20 bg-white shadow-md transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-lg">
                <Image
                  src="/images/kit_after.png"
                  alt="Welcome kit after branding with company logo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="50vw"
                />
              </div>
              <p className="mt-4 font-heading font-bold text-sm text-accent uppercase tracking-wider">After Branding (Branded Kit) ✓</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA — charcoal */}
      <section className="section-spacing bg-charcoal">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] text-white">
              Ready to Create Your Custom Corporate Kit?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Share your requirements and get a complete kit proposal with pricing, mockups, and timeline.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get Kit Proposal
              </Button>
              <Button href="/products" variant="ghost" size="lg">
                Browse Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
