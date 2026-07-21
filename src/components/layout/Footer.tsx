"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const productLinks = [
  { name: "Corporate Kits", href: "/products/corporate-kits" },
  { name: "Bags & Backpacks", href: "/products/bags" },
  { name: "Drinkware", href: "/products/drinkware" },
  { name: "Apparel", href: "/products/apparel" },
  { name: "Stationery", href: "/products/stationery" },
  { name: "Gift Hampers", href: "/products/hampers" },
];

const industryLinks = [
  { name: "IT & Technology", href: "/industries/it" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Education", href: "/industries/education" },
  { name: "Hotels", href: "/industries/hotels" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Startups", href: "/industries/startups" },
];

const resourceLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Catalogue", href: "/catalog" },
  { name: "Branding Guide", href: "/branding-guide" },
  { name: "MOQ Info", href: "/moq" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Bulk Inquiry", href: "/bulk-inquiry" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

import { useSiteData } from "@/lib/useSiteData";

export function Footer() {
  const { data } = useSiteData();
  const phone = data?.siteSettings?.phone || "+91 76654 67878";
  const email = data?.siteSettings?.email || "printdekhojpr@gmail.com";
  const address = data?.siteSettings?.address || "Jaipur, Rajasthan, India";
  return (
    <footer className="bg-charcoal pt-20 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Print Dekho"
                width={150}
                height={48}
                style={{ width: "auto", height: "38px" }}
              />
            </Link>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
              India&apos;s premium corporate gifting company since 2012. We transform ordinary products into powerful brand experiences for 500+ companies across India.
            </p>

            <div className="mt-6 space-y-3">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-accent transition-colors">
                <Phone size={15} /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-accent transition-colors">
                <Mail size={15} /> {email}
              </a>
              <p className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="flex-shrink-0 mt-0.5" /> {address}
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-white/80 text-sm font-heading font-semibold mb-3">Stay Updated</p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                  suppressHydrationWarning
                />
                <button
                  className="w-10 h-10 rounded-[12px] bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors"
                  aria-label="Subscribe"
                  suppressHydrationWarning
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Industries</h4>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-bold text-white text-sm mb-5 mt-8">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social (real icons) */}
            <div className="mt-8">
              <h4 className="font-heading font-bold text-white text-sm mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                {[
                  {
                    name: "Instagram",
                    href: "https://instagram.com/printdekho",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    )
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/printdekho",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    )
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/printdekho",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    )
                  },
                  {
                    name: "Twitter",
                    href: "https://twitter.com/printdekho",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    )
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-accent hover:border-accent hover:text-white hover:scale-105 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © 2025 Print Dekho. All rights reserved. Founded by Rohit Jain.
          </p>
          <p className="text-white/30 text-xs">
            Premium Corporate Gifting & Branding Solutions — Jaipur, India
          </p>
        </div>
      </div>
    </footer>
  );
}
