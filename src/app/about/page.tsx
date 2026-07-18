"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, ShieldCheck, Palette, Heart, Users, Package, Clock } from "lucide-react";

const timeline = [
  { year: "2012", title: "Founded", description: "Print Dekho established as a small printing unit in Jaipur, Rajasthan by Rohit Jain." },
  { year: "2014", title: "First Enterprise Client", description: "Secured our first large enterprise client and invested in advanced printing machinery." },
  { year: "2017", title: "Product Expansion", description: "Expanded product range to 50+ categories with in-house embroidery and sublimation units." },
  { year: "2019", title: "500+ Clients", description: "Crossed 500 corporate clients across IT, Healthcare, Education & Manufacturing sectors." },
  { year: "2020", title: "Pan India Delivery", description: "Established pan-India delivery network covering all major cities and states." },
  { year: "2022", title: "Premium Segment", description: "Launched luxury corporate gifting line with premium packaging and executive kits." },
  { year: "2024", title: "10,000+ Projects", description: "Crossed the milestone of 10,000 successful corporate gifting projects delivered." },
];

const stats = [
  { value: "12+", label: "Years Experience", icon: Clock },
  { value: "500+", label: "Clients Served", icon: Users },
  { value: "10K+", label: "Orders Delivered", icon: Package },
];

const values = [
  { icon: Sparkles, title: "Innovation", description: "We constantly explore new products, materials, and branding techniques to keep your merchandise fresh and relevant." },
  { icon: ShieldCheck, title: "Quality", description: "Multi-point quality checks at every stage — from raw materials to final packaging — ensure flawless delivery every time." },
  { icon: Palette, title: "Customization", description: "Every product is tailored to your brand — colors, logos, packaging, and messaging crafted to your exact specifications." },
  { icon: Heart, title: "Trust", description: "12+ years of on-time delivery and transparent communication have made us a long-term partner for 500+ companies." },
];

export default function AboutPage() {
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
                About Print Dekho
              </span>
              <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
                Building Brand Experiences Since 2012
              </h1>
              <p className="mt-5 text-[0.95rem] text-muted leading-relaxed max-w-lg">
                Print Dekho is Jaipur&apos;s leading B2B corporate branding and promotional merchandise company. We manufacture and supply customized products in bulk — helping companies create branded merchandise for employees, clients, dealers, and events.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <p className="font-heading font-extrabold text-xl md:text-2xl text-secondary">{stat.value}</p>
                    <p className="text-[11px] text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Get In Touch
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] rounded-[26px] overflow-hidden shadow-2xl group border border-border/40">
                <Image
                  src="/images/inhouse.png"
                  alt="Print Dekho in-house production facility"
                  fill
                  className="object-cover transition-transform duration-750 group-hover:scale-103"
                  sizes="50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/5 rounded-[22px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto lg:mx-0 group w-full max-w-[320px] lg:max-w-none"
            >
              <div className="relative w-full h-[480px] lg:w-[400px] lg:h-[600px] rounded-[26px] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-border">
                <Image
                  src="/images/CEO-Image.jpeg"
                  alt="Mr. Rohit Jain — Founder & CEO, Print Dekho"
                  fill
                  className="object-cover transition-transform duration-750 group-hover:scale-102"
                  sizes="(max-width: 1024px) 320px, 400px"
                  priority
                />
              </div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 bg-gold/15 rounded-[26px] -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                Meet the CEO
              </span>
              <h2 className="font-heading font-extrabold text-[2rem] lg:text-[2.5rem] leading-tight text-secondary">
                Mr. Rohit Jain
              </h2>
              <p className="mt-1 text-sm font-semibold text-accent uppercase tracking-wider">Founder & CEO</p>
              
              <div className="w-16 h-1 bg-accent/30 rounded-full mt-4 mb-6" />

              <p className="text-[0.95rem] text-muted leading-relaxed">
                A visionary leader who embarked on an entrepreneurial journey after earning a BTech degree in 2012. Originally joining the company as a software engineer, their passion for innovation and dedication led them to transition into the role of CEO, founding Print Dekho as a full-time business. This dynamic professional brings a unique blend of technical expertise and business acumen to drive the company&apos;s success.
              </p>
              <p className="mt-4 text-[0.95rem] text-muted leading-relaxed">
                The CEO is not just good with technology; they also have a sharp business mind. Their leadership has been crucial in making Print Dekho successful in a competitive industry. They bring a mix of innovation and smart thinking to the company.
              </p>
              <p className="mt-4 text-[0.95rem] text-muted leading-relaxed">
                Apart from being skilled in technology, the CEO is committed to doing things exceptionally well. Their goal is to keep Print Dekho ahead in the rapidly changing world of printing. With their experience, vision, and hard work, the CEO is steering Print Dekho towards even greater success.
              </p>
              
              <div className="mt-8 p-6 bg-stone/50 border border-border rounded-[22px] relative overflow-hidden">
                <span className="absolute -top-6 -left-2 text-8xl text-secondary/5 font-serif select-none pointer-events-none">“</span>
                <p className="text-sm font-heading font-bold text-secondary italic leading-relaxed relative z-10">
                  &ldquo;Our goal is simple — make every company&apos;s brand look its absolute best on every product we create.&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted font-semibold">— Rohit Jain, Founder & CEO</p>
                  <p className="text-sm font-serif italic text-accent opacity-70 select-none">Rohit Jain</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Journey Timeline — stone */}
      <section className="section-spacing bg-stone">
        <div className="container-main">
          <SectionHeader
            label="Our Journey"
            title="Growing Stronger Every Year"
            description="From a small printing unit to a pan-India corporate gifting powerhouse."
          />

          <div className="relative mt-12">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />
            <div className="space-y-10 lg:space-y-14">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1.5 mt-2 ring-4 ring-stone z-10" />
                  <div className={`ml-10 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <span className="inline-block px-3 py-1 bg-accent/10 rounded-full text-xs font-bold text-accent mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-secondary">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values — ivory */}
      <section className="section-spacing bg-ivory">
        <div className="container-main">
          <SectionHeader
            label="What Drives Us"
            title="Our Core Values"
            description="The principles that guide every project, every order, every relationship."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 bg-white rounded-[22px] border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="mt-5 font-heading font-bold text-base text-secondary">{value.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing — charcoal (dark section) */}
      <section className="section-spacing bg-charcoal">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                In-House Production
              </span>
              <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] leading-tight text-white">
                Made In-House. Delivered On Time.
              </h2>
              <p className="mt-5 text-[0.9rem] text-white/60 leading-relaxed">
                Our in-house manufacturing facility in Jaipur allows us to maintain full control over quality, timelines, and costs. From screen printing and embroidery to sublimation and laser engraving — everything happens under one roof.
              </p>
              <ul className="mt-6 space-y-3">
                {["Full in-house production facility", "Multi-point quality inspection", "10+ branding techniques available", "Capacity for 50,000+ units/month", "Dedicated QC team for every order"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-[26px] overflow-hidden shadow-xl border border-border/40">
                <Image
                  src="/images/quality-assure.png"
                  alt="Print Dekho quality assurance process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA — cream */}
      <section className="section-spacing bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading font-extrabold text-[1.8rem] lg:text-[2.2rem] text-secondary">
              Ready to Start Your Corporate Gifting Project?
            </h2>
            <p className="mt-4 text-[0.95rem] text-muted max-w-lg mx-auto">
              Join 500+ companies who trust Print Dekho for their branded merchandise needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                Explore Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
