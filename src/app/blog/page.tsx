"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock } from "lucide-react";

const categories = ["All", "Corporate Gifting", "Branding Tips", "Industry Trends", "Product Guides"];

const blogs = [
  {
    title: "Top 10 Corporate Gift Ideas for Employee Appreciation in 2024",
    excerpt: "Discover the most impactful corporate gift ideas that boost employee morale and strengthen team bonds. From premium kits to personalized merchandise.",
    image: "/images/slider_welcome_kit.png",
    category: "Corporate Gifting",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "How to Choose the Right Branding Technique for Your Products",
    excerpt: "Screen printing vs embroidery vs laser engraving — learn which branding technique works best for different corporate merchandise categories.",
    image: "/images/slider_gifts.png",
    category: "Branding Tips",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "Why Custom Corporate Apparel Boosts Brand Visibility",
    excerpt: "Studies show branded apparel increases brand recall by 85%. Here's how to create a corporate wardrobe strategy that works.",
    image: "/images/slider_apparel.png",
    category: "Industry Trends",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "The Complete Guide to Sports Jersey Customization",
    excerpt: "From fabric selection to sublimation design — everything you need to know about ordering custom team jerseys for corporate events.",
    image: "/images/jersey1.jpeg",
    category: "Product Guides",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "Drinkware Trends: What's Hot in Corporate Gifting",
    excerpt: "Steel bottles, smart mugs, and eco-friendly tumblers — explore the latest drinkware trends for employee and client gifting.",
    image: "/images/slider_drinkware.png",
    category: "Corporate Gifting",
    date: "Nov 12, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "Building a Diverse Corporate Gift Strategy for Pan-India Teams",
    excerpt: "How leading companies create inclusive gifting programs that resonate with employees across cultures, regions, and preferences.",
    image: "/images/slider_branding.png",
    category: "Industry Trends",
    date: "Nov 5, 2024",
    readTime: "5 min read",
    featured: false,
  },
];

import { useSiteData } from "@/lib/useSiteData";

export default function BlogPage() {
  const { data } = useSiteData();
  const blogs = data?.blogs || [];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((b: any) => b.category === activeCategory);

  const featured = filteredBlogs.find((b: any) => b.featured) || filteredBlogs[0];
  const gridBlogs = filteredBlogs.filter((b: any) => b !== featured);

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
              Our Blog
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Insights for Corporate Buyers
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              Expert tips, product guides, and industry trends to help you make smarter corporate gifting decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Featured — white */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-[16px] text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-secondary text-white shadow-lg"
                    : "bg-stone text-muted hover:bg-cream border border-border"
                }`}
                suppressHydrationWarning
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Blog */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              className="group grid lg:grid-cols-2 gap-8 bg-stone rounded-[22px] overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-300 mb-12 cursor-pointer"
            >
              <div className="relative h-64 lg:h-full min-h-[280px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1 bg-accent/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-heading font-bold text-xl lg:text-2xl text-secondary leading-tight group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridBlogs.map((blog: any, i: number) => (
              <motion.div
                key={blog.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-stone rounded-[22px] overflow-hidden border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-2.5 py-0.5 bg-accent/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <h3 className="mt-3 font-heading font-bold text-base text-secondary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{blog.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-[11px] text-muted">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Your Corporate Gifting Project?
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 max-w-md mx-auto">
              Get expert guidance on choosing the right products and branding for your company.
            </p>
            <div className="mt-8">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
