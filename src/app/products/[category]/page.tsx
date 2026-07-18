"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Printer, Scissors, Zap, Sun, Flame } from "lucide-react";

const categoryData: Record<
  string,
  {
    name: string;
    description: string;
    products: { name: string; image: string }[];
  }
> = {
  "corporate-gift-kits": {
    name: "Corporate Gift Kits",
    description: "Curated branded kits for employees, clients, dealers & events. Fully customizable with your company branding, packaging, and messaging.",
    products: [
      { name: "Executive Welcome Kit", image: "/images/slider_gifts.png" },
      { name: "Premium Swag Box", image: "/images/slider_welcome_kit.png" },
      { name: "Classic Employee Kit (Plain)", image: "/images/kit_before.png" },
      { name: "Custom Branded Welcome Kit", image: "/images/kit_after.png" },
      { name: "Elite Corporate Gift Set", image: "/images/slider_branding.png" },
      { name: "Modern Onboarding Kit", image: "/images/cp3.jpeg" },
      { name: "Deluxe Office Combo Box", image: "/images/cp4.jpeg" },
      { name: "Workspace Essentials Hamper", image: "/images/cp5.jpeg" },
      { name: "Smart Tech Onboarding Kit", image: "/images/cp6.jpeg" }
    ]
  },
  "welcome-kits": {
    name: "Employee Welcome Kits",
    description: "Employee onboarding kits with branded essentials — bags, bottles, diaries, apparel & more.",
    products: [
      { name: "New Hire Welcome Kit", image: "/images/slider_welcome_kit.png" },
      { name: "Employee Onboarding Swag Set", image: "/images/kit_after.png" },
      { name: "Executive Welcome Package", image: "/images/slider_gifts.png" },
      { name: "Basic Joining Kit", image: "/images/kit_before.png" },
      { name: "Eco-Friendly Welcome Hamper", image: "/images/cp3.jpeg" }
    ]
  },
  "bags": {
    name: "Bags & Backpacks",
    description: "Laptop bags, travel backpacks, tote bags & duffle bags with embroidery, screen print & patch branding.",
    products: [
      { name: "Water-Resistant Laptop Backpack", image: "/images/new-bags-(2).jpeg" },
      { name: "Custom Printed Tote Bag", image: "/images/printed-bags.jpeg" },
      { name: "Premium Travel Duffle Bag", image: "/images/cp7.jpeg" },
      { name: "Executive Slim Laptop Sleeve", image: "/images/cp8.jpeg" }
    ]
  },
  "drinkware": {
    name: "Drinkware & Bottles",
    description: "Premium steel bottles, coffee mugs & vacuum flasks.",
    products: [
      { name: "Vacuum Insulated Stainless Steel Bottle", image: "/images/slider_drinkware.png" },
      { name: "Classic Ceramic Coffee Mug", image: "/images/cup.jpeg" },
      { name: "Designer Matte Finish Mug", image: "/images/designer-mug.jpeg" },
      { name: "Custom Branded Photo Mug", image: "/images/printed-mug.webp" }
    ]
  },
  "apparel": {
    name: "Corporate Apparel",
    description: "T-shirts, polo tees, collar shirts, round necks & uniforms with screen printing, sublimation, and embroidery options.",
    products: [
      { name: "Premium Corporate Polo Shirt", image: "/images/slider_apparel.png" },
      { name: "Classic Fit Polo Tee", image: "/images/polo-1.webp" },
      { name: "Pique Cotton Polo", image: "/images/polo-2.webp" },
      { name: "Modern Athleisure Polo", image: "/images/polo-3.webp" },
      { name: "Contrast Collar Polo", image: "/images/polo-4.webp" },
      { name: "Sporty Dry-Fit Polo", image: "/images/polo-5.webp" },
      { name: "Executive Formal Collar Shirt", image: "/images/collar.jpeg" },
      { name: "Oxford Cotton Office Shirt", image: "/images/collar-1.webp" },
      { name: "Premium Cotton Business Shirt", image: "/images/collar-2.webp" },
      { name: "Micro-Striped Collar Shirt", image: "/images/collar-3.webp" },
      { name: "Casual Round Neck Tee", image: "/images/round.jpeg" },
      { name: "Classic Round Neck Tee", image: "/images/round-2.jpeg" },
      { name: "Soft Cotton Crewneck", image: "/images/rn1.webp" },
      { name: "Comfy Round Neck Swag Tee", image: "/images/rn2.webp" },
      { name: "Printed Promotional Round Neck", image: "/images/rn3.webp" },
      { name: "Custom Tailored Casual Shirt", image: "/images/t-shirt.jpeg" }
    ]
  },
  "sports-jerseys": {
    name: "Sports Jerseys",
    description: "Custom sublimated team jerseys for corporate sports events, marathons, tournaments & employee leagues.",
    products: [
      { name: "Sublimated Corporate Cricket Jersey", image: "/images/sports-jersey.jpg" },
      { name: "Pro Team Soccer Jersey", image: "/images/jersey.jpeg" },
      { name: "Custom Football Kit Jersey", image: "/images/jersey1.jpeg" },
      { name: "Dry-Fit Athletic Jersey (Yellow/Green)", image: "/images/j2.jpeg" },
      { name: "Breathable Sports Tee (Red)", image: "/images/j3.jpeg" },
      { name: "Dynamic Team Jersey (Blue/Orange)", image: "/images/j4.jpeg" },
      { name: "Activewear Performance Jersey (Green)", image: "/images/j5.jpeg" },
      { name: "Corporate Marathon Runner Tee", image: "/images/j6.jpeg" },
      { name: "Sublimated Football Club Jersey", image: "/images/j7.jpeg" },
      { name: "Elite Dry-Fit T-Shirt (Grey)", image: "/images/j8.jpeg" },
      { name: "Corporate Sports Tournament Jersey", image: "/images/j9.jpeg" },
      { name: "Champion Series Team Jersey", image: "/images/j10.jpeg" }
    ]
  },
  "stationery": {
    name: "Stationery & Diaries",
    description: "Executive diaries, premium notebooks, branded pens & desk accessories with logo debossing.",
    products: [
      { name: "Executive Gift Set (Diary, Pen & Flask)", image: "/images/slider_gifts.png" },
      { name: "Classic Leatherette Bound Notebook", image: "/images/diary.jpeg" },
      { name: "Metallic Premium Ballpoint Pen", image: "/images/cp9.jpeg" },
      { name: "Sleek Metal Rollerball Pen Set", image: "/images/cp10.jpeg" }
    ]
  },
  "promotional": {
    name: "Promotional T-Shirts",
    description: "Event t-shirts, campaign wear, marathon tees & promotional apparel printed in bulk.",
    products: [
      { name: "Event Promotional Tee (White)", image: "/images/pt-1.jpeg" },
      { name: "Branded Campaign T-Shirt (Orange)", image: "/images/pt-2.jpeg" },
      { name: "Giveaway Round Neck Tee (Black)", image: "/images/pt-3.jpeg" },
      { name: "Standard Promo T-Shirt (Blue)", image: "/images/pt2.webp" },
      { name: "Marathon Supporter Tee (Red)", image: "/images/pt3.webp" },
      { name: "Bulk Advertising Tee (Yellow)", image: "/images/pt4.webp" }
    ]
  },
  "combo-sets": {
    name: "Premium Combos",
    description: "Luxury combo gift sets including bottles, mugs, bags, diaries & more in premium packaging.",
    products: [
      { name: "Premium Bottle & Mug Gift Combo", image: "/images/co-2.jpeg" },
      { name: "Executive Diary, Pen & Keychain Set", image: "/images/co-3.jpeg" },
      { name: "Metal Flask & Cup Gift Set", image: "/images/co-4.jpeg" },
      { name: "Elite Wallet & Belt Gift Combo", image: "/images/co-5.jpeg" },
      { name: "Smart Workspace Combo (Unbranded)", image: "/images/kit_before.png" },
      { name: "Custom Branded Office Swag Combo", image: "/images/kit_after.png" }
    ]
  },
  "festival-hampers": {
    name: "Festival Hampers",
    description: "Seasonal & festival gifting hampers for Diwali, Christmas, New Year & other occasions.",
    products: [
      { name: "Diwali Sweets & Dry Fruits Gourmet Box", image: "/images/slider_branding.png" },
      { name: "Festive Celebration Gift Box", image: "/images/slider_gifts.png" },
      { name: "New Year Premium Corporate Hamper", image: "/images/kit_after.png" },
      { name: "Traditional Indian Sweet Hamper Set", image: "/images/co-2.jpeg" },
      { name: "Premium Winter Holiday Gift Box", image: "/images/co-3.jpeg" }
    ]
  },
  "branding": {
    name: "Branding Services",
    description: "High-quality corporate branding solutions: logo printing, embroidery, sublimation, and laser engraving for a wide range of surfaces.",
    products: [
      { name: "Custom Screen Printing Service", image: "/images/slider_branding.png" },
      { name: "Premium Raised Embroidery Service", image: "/images/inhouse.png" },
      { name: "Precision Laser Engraving Service", image: "/images/slider_drinkware.png" },
      { name: "High-Definition UV Printing Service", image: "/images/quality-assure.png" },
      { name: "Full-Color Sublimation Branding Service", image: "/images/kit_after.png" }
    ]
  }
};

const brandingOptions = [
  { icon: Scissors, title: "Embroidery", description: "Premium raised branding on polo tees, caps & bags." },
  { icon: Printer, title: "Screen Printing", description: "Ideal for bulk orders. Vibrant colors on fabric & apparel." },
  { icon: Zap, title: "Laser Engraving", description: "Permanent, elegant branding on bottles, pens & metal items." },
  { icon: Sun, title: "UV Printing", description: "Full-color photo-quality print on hard surfaces & drinkware." },
  { icon: Flame, title: "Heat Transfer", description: "Full-color detailed prints on fabric with DTF & vinyl press." },
];

export default function CategoryPage() {
  const params = useParams();
  const rawSlug = params.category as string;
  
  // Mappings/Aliases to prevent 404s or fallback issues
  let slug = rawSlug;
  if (rawSlug === "corporate-kits") slug = "corporate-gift-kits";
  if (rawSlug === "accessories") slug = "stationery";
  if (rawSlug === "hampers") slug = "festival-hampers";
  
  const category = categoryData[slug] || {
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    description: "Explore our range of customizable corporate gifting products.",
    products: [
      { name: "Premium Onboarding Kit", image: "/images/gift1.jpeg" },
      { name: "Custom Thermal Bottle", image: "/images/gift2.jpeg" },
      { name: "Executive Notebook Set", image: "/images/cp1.jpeg" },
      { name: "Branded Desk Organizer", image: "/images/cp2.jpeg" }
    ]
  };

  return (
    <>
      {/* Hero — cream */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Product Category
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              {category.name}
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Gallery — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {category.products.map((product, i) => {
              const name = product.name;
              const img = product.image;
              
              return (
                <motion.div
                  key={`${slug}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-[360px] lg:h-[420px] rounded-[24px] overflow-hidden border border-border/40 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 bg-stone"
                >
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-750"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/10 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5" />
                  
                  {/* Model Number Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-secondary/80 backdrop-blur-md text-[9px] font-bold tracking-wider text-gold rounded-full uppercase">
                    Model {1000 + i + 1}
                  </div>

                  {/* Hover Information Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-10 flex flex-col gap-1.5 text-white">
                    <p className="text-xs font-semibold text-gold tracking-wider uppercase">Premium Gifting</p>
                    <h3 className="font-heading font-extrabold text-sm text-white line-clamp-1">{name}</h3>
                    <p className="text-[10px] text-white/70">MOQ: 50 Pieces</p>
                    <a
                      href="/bulk-inquiry"
                      className="mt-2 py-2 text-center bg-accent text-white text-[10px] font-heading font-bold uppercase rounded-[10px] tracking-wider hover:bg-accent/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-sm"
                      suppressHydrationWarning
                    >
                      Quick Quote
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Branding Options — stone */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="Customization"
            title="Branding Options Available"
            description="Choose from multiple branding techniques for your products."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {brandingOptions.map((option, i) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 bg-white rounded-[22px] border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/5">
                  <option.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-sm text-secondary">{option.title}</h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ & Lead Time — ivory */}
      <section className="section-spacing bg-ivory">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 bg-white rounded-[22px] border border-border"
            >
              <h3 className="font-heading font-bold text-base text-secondary">Minimum Order Quantity</h3>
              <p className="mt-2 text-sm text-muted">MOQ starts from 50 units for most products. Custom packaging available from 100+ units.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-7 bg-white rounded-[22px] border border-border"
            >
              <h3 className="font-heading font-bold text-base text-secondary">Lead Time</h3>
              <p className="mt-2 text-sm text-muted">Standard orders: 7–10 working days. Rush orders (subject to availability): 4–5 working days.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-7 bg-white rounded-[22px] border border-border"
            >
              <h3 className="font-heading font-bold text-base text-secondary">Sample Available</h3>
              <p className="mt-2 text-sm text-muted">Physical samples available before bulk production. Sample charges adjusted in final invoice.</p>
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
              Need {category.name} in Bulk?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Get a custom quote with mockup support, branding options, and best pricing for your order quantity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Send Bulk Inquiry
              </Button>
              <Button href="/products" variant="ghost" size="lg">
                Browse All Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
