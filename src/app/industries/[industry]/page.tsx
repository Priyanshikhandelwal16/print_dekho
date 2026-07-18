"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Building2, PhoneCall, Mail } from "lucide-react";

const industryData: Record<
  string,
  {
    name: string;
    subtitle: string;
    description: string;
    headerImage: string;
    whyCrucial: string[];
    recommendedProducts: { name: string; category: string; image: string }[];
  }
> = {
  it: {
    name: "IT & Technology",
    subtitle: "Modern Brand Swag for Tech Teams",
    description: "IT companies require high-quality, practical, and design-forward tech merchandise. From daily standups to hackathons and employee onboarding, our IT gifting collections keep teams motivated and brands synchronized.",
    headerImage: "/images/inhouse.png",
    whyCrucial: [
      "Boosts remote worker connection and company culture.",
      "Voted high-value utility by developers and designers.",
      "High-grade laptop backpacks protect expensive tech assets."
    ],
    recommendedProducts: [
      { name: "Executive Onboarding Kit", category: "WELCOME KITS", image: "/images/slider_welcome_kit.png" },
      { name: "Water-Resistant Laptop Backpack", category: "BAGS", image: "/images/new-bags-(2).jpeg" },
      { name: "Vacuum Insulated Stainless Steel Bottle", category: "DRINKWARE", image: "/images/slider_drinkware.png" },
      { name: "Metallic Premium Ballpoint Pen", category: "STATIONERY", image: "/images/cp9.jpeg" }
    ]
  },
  healthcare: {
    name: "Healthcare & Pharmaceuticals",
    subtitle: "Professional Uniforms & Doctor Appreciation Kits",
    description: "Healthcare settings demand clean, hygienic, and extremely durable customized items. We provide clinic branding, medical staff apparel, and premium doctor appreciation gift sets.",
    headerImage: "/images/quality-assure.png",
    whyCrucial: [
      "Comfortable medical scrubs and lab coats for long shifts.",
      "Appreciation sets build loyalty among specialist doctors and staff.",
      "GST-invoiced hospital-branded merchandise for events."
    ],
    recommendedProducts: [
      { name: "Executive Gift Set (Diary, Pen & Flask)", category: "STATIONERY", image: "/images/slider_gifts.png" },
      { name: "Classic Ceramic Coffee Mug", category: "DRINKWARE", image: "/images/cup.jpeg" },
      { name: "Premium Corporate Polo Shirt", category: "APPAREL", image: "/images/slider_apparel.png" },
      { name: "Custom Printed Corporate Hamper", category: "HAMPERS", image: "/images/kit_after.png" }
    ]
  },
  education: {
    name: "Education & Universities",
    subtitle: "Campus Swag & Alumni Keepsakes",
    description: "Build deep campus spirit and alumni connection. We specialize in bulk university apparel, student welcome kits, and premium convocation gifts.",
    headerImage: "/images/slider_apparel.png",
    whyCrucial: [
      "Inspires campus pride among students, faculty, and alumni.",
      "Premium quality hoodies and tees for college fests and fests.",
      "Custom branded notebooks and folders for academic success."
    ],
    recommendedProducts: [
      { name: "Sleek Laptop Backpack", category: "BAGS", image: "/images/new-bags-(2).jpeg" },
      { name: "Soft Cotton Crewneck T-shirt", category: "APPAREL", image: "/images/round.jpeg" },
      { name: "Classic Leatherette Bound Notebook", category: "STATIONERY", image: "/images/diary.jpeg" },
      { name: "Designer Coffee Mug", category: "DRINKWARE", image: "/images/designer-mug.jpeg" }
    ]
  },
  hotels: {
    name: "Hotels & Hospitality",
    subtitle: "Guest Welcome Kits & Staff Uniforms",
    description: "First impressions are vital in the hospitality sector. We design executive guest amenities, customized keychains, and high-quality staff attire to match your hotel's aesthetic.",
    headerImage: "/images/slider_branding.png",
    whyCrucial: [
      "Sharp, tailored uniforms present a clean, professional image.",
      "Branded guest amenities add a touch of luxury to the stay.",
      "Custom keychains and desk folders maintain consistent corporate identity."
    ],
    recommendedProducts: [
      { name: "Premium Bottle & Mug Gift Combo", category: "COMBOS", image: "/images/co-2.jpeg" },
      { name: "Classic Formal Collar Shirt", category: "APPAREL", image: "/images/collar.jpeg" },
      { name: "Sleek Metal Rollerball Pen Set", category: "STATIONERY", image: "/images/cp10.jpeg" },
      { name: "Premium Corrugated Packaging Box", category: "PACKAGING", image: "/images/kit_before.png" }
    ]
  },
  manufacturing: {
    name: "Manufacturing & Engineering",
    subtitle: "Heavy-Duty Branded Gear & Dealer Hampers",
    description: "Durable, high-durability branding for active environments. We provide factory uniforms, branded safety gear, and premium gift sets for distributor networks and dealerships.",
    headerImage: "/images/inhouse.png",
    whyCrucial: [
      "High-durability embroidery stands up to harsh industrial wear.",
      "Dealer incentive kits strengthen business relationships.",
      "Certified manufacturing and branding ensures robust quality."
    ],
    recommendedProducts: [
      { name: "Double-walled Insulated Bottle", category: "DRINKWARE", image: "/images/slider_drinkware.png" },
      { name: "Premium Corporate Polo Shirt", category: "APPAREL", image: "/images/polo-1.webp" },
      { name: "Heavy-Duty Backpack", category: "BAGS", image: "/images/cp7.jpeg" },
      { name: "Luxury Corporate Gift Set", category: "COMBOS", image: "/images/slider_gifts.png" }
    ]
  },
  startups: {
    name: "Startups & Scaleups",
    subtitle: "Vibrant Swag & Launch Merchandise",
    description: "Celebrate milestones, funding rounds, and product launches. Our low MOQs and quick turnaround allow fast-growing startups to create amazing custom gear.",
    headerImage: "/images/kit_after.png",
    whyCrucial: [
      "Perfect for onboarding new hires quickly in high-growth phases.",
      "Fun, modern swag designs that employees love to share on social media.",
      "Flexible quantities prevent excessive cash locked in inventory."
    ],
    recommendedProducts: [
      { name: "Premium Welcome Kit (Custom)", category: "WELCOME KITS", image: "/images/kit_after.png" },
      { name: "Soft Cotton Crewneck", category: "APPAREL", image: "/images/rn1.webp" },
      { name: "Branded Travel Duffle Bag", category: "BAGS", image: "/images/cp7.jpeg" },
      { name: "Vacuum Insulated Stainless Steel Bottle", category: "DRINKWARE", image: "/images/slider_drinkware.png" }
    ]
  }
};

export default function IndustryPage() {
  const params = useParams();
  const industrySlug = params.industry as string;

  const industry = industryData[industrySlug] || {
    name: industrySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    subtitle: "Custom Gifting Solutions",
    description: "We customize premium corporate gifting solutions tailored specifically to the operational and marketing needs of this industry.",
    headerImage: "/images/gift1.jpeg",
    whyCrucial: [
      "Delivers high-quality customized brand materials.",
      "Helps increase employee engagement and client retention.",
      "Full logistics support covering delivery across India."
    ],
    recommendedProducts: [
      { name: "Executive Welcome Kit", category: "WELCOME KITS", image: "/images/slider_welcome_kit.png" },
      { name: "Branded Steel Bottle", category: "DRINKWARE", image: "/images/slider_drinkware.png" },
      { name: "Premium Laptop Bag", category: "BAGS", image: "/images/new-bags-(2).jpeg" },
      { name: "Custom Corporate Polo Shirt", category: "APPAREL", image: "/images/slider_apparel.png" }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                Industry Solutions
              </span>
              <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
                {industry.name} Gifting
              </h1>
              <p className="mt-5 text-[0.95rem] text-muted leading-relaxed max-w-lg">
                {industry.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Request Industry Catalog
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] rounded-[26px] overflow-hidden shadow-2xl border border-border/40">
                <Image
                  src={industry.headerImage}
                  alt={industry.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Gifting Matters Section */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[300px] md:h-[400px] rounded-[26px] overflow-hidden border border-border/40"
            >
              <Image
                src="/images/quality-assure.jpg"
                alt="Corporate Gifting Benefits"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Industry Relevance</span>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-secondary mt-2">
                Why Custom Gifting Matters in {industry.name}
              </h2>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                Branded merchandise is not just a giveaway; it is a critical touchpoint that represents your company's values, standard of work, and culture.
              </p>

              <div className="mt-8 space-y-4">
                {industry.whyCrucial.map((point, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="Curated Collection"
            title="Recommended Products"
            description={`Our most popular and highest-rated items for the ${industry.name} sector.`}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12">
            {industry.recommendedProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group block"
              >
                <div className="relative h-[240px] md:h-[300px] rounded-[24px] overflow-hidden bg-cream border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-750 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4 px-1">
                  <span className="text-[9px] font-bold tracking-widest text-accent/80 uppercase">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-heading font-bold text-sm text-secondary group-hover:text-accent transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Industry Consultation - CTA */}
      <section className="section-spacing bg-charcoal">
        <div className="container-main max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            
            <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] text-white">
              Consult with an Industry Expert
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto leading-relaxed">
              Let us help you design the perfect gifting program tailored to your company's timelines, standards, and budget.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-6 text-white/80 text-sm justify-center w-full">
              <a href="tel:+917665467878" className="flex items-center justify-center gap-2 hover:text-accent transition-colors">
                <PhoneCall size={16} className="text-accent" /> +91 76654 67878
              </a>
              <a href="mailto:printdekhojpr@gmail.com" className="flex items-center justify-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} className="text-accent" /> printdekhojpr@gmail.com
              </a>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start Bulk Project
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Contact Office
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
