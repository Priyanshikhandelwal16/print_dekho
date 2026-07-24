"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteData } from "@/lib/useSiteData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { data } = useSiteData();
  const blogs = data?.blogs || [];

  const blog = blogs.find((b: any) => b.id === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center py-20">
          <h1 className="font-heading font-extrabold text-3xl text-secondary mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted mb-8">
            The article you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button href="/blog" variant="primary" size="lg" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  // Other blogs for "more posts" section
  const relatedBlogs = blogs
    .filter((b: any) => b.id !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero with image */}
      <section className="relative pt-24 lg:pt-32 bg-charcoal overflow-hidden">
        {blog.image && (
          <div className="absolute inset-0">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/80 to-charcoal" />
          </div>
        )}

        <div className="relative container-main pb-16 lg:pb-20">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Category badge */}
            <span className="inline-block px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-[11px] font-bold text-accent uppercase tracking-wider mb-5">
              <Tag className="inline w-3 h-3 mr-1" />
              {blog.category}
            </span>

            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              {blog.title}
            </h1>

            <p className="mt-5 text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
              {blog.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white">
        <div className="container-main max-w-3xl py-14 lg:py-20">
          {/* Cover image (full width) */}
          {blog.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[16/9] rounded-[22px] overflow-hidden shadow-xl border border-border/40 mb-12"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </motion.div>
          )}

          {/* Blog body content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {blog.content ? (
              <div className="prose prose-lg max-w-none">
                {blog.content.split("\n").map((paragraph: string, i: number) =>
                  paragraph.trim() ? (
                    <p
                      key={i}
                      className="text-[1rem] text-muted leading-relaxed mb-5"
                    >
                      {paragraph}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-[22px]">
                <p className="text-muted text-sm">
                  Full article content will appear here once added from the admin panel.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* More Articles */}
      {relatedBlogs.length > 0 && (
        <section className="section-spacing bg-stone">
          <div className="container-main">
            <h2 className="font-heading font-extrabold text-2xl text-secondary mb-8">
              More Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((blog: any, i: number) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/blog/${blog.id}`}
                    className="group bg-white rounded-[22px] overflow-hidden border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2.5 py-0.5 bg-accent/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                        {blog.category}
                      </span>
                      <h3 className="mt-3 font-heading font-bold text-sm text-secondary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
                        <span>{blog.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {blog.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/bulk-inquiry" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
              <Button href="/blog" variant="ghost" size="lg">
                More Articles
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
