"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Menu, X, ChevronDown, ChevronRight,
  Gift, ShoppingBag, Coffee, Shirt, Watch, Palette, Send, Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteData } from "@/lib/useSiteData";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products", hasMega: true },
  { name: "Industries", href: "/industries" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
];

const megaMenuCategories = [
  { name: "Corporate Kits", href: "/products/corporate-kits", icon: Gift, items: ["Welcome Kits", "Onboarding Kits", "Festival Hampers", "Award Kits"] },
  { name: "Bags", href: "/products/bags", icon: ShoppingBag, items: ["Laptop Bags", "Tote Bags", "Backpacks", "Duffle Bags"] },
  { name: "Drinkware", href: "/products/drinkware", icon: Coffee, items: ["Mugs", "Bottles", "Tumblers", "Sippers"] },
  { name: "Apparel", href: "/products/apparel", icon: Shirt, items: ["Polo T-Shirts", "Round Neck", "Collar Shirts", "Jerseys"] },
  { name: "Accessories", href: "/products/accessories", icon: Watch, items: ["Diaries", "Pens", "Keychains", "Tech Accessories"] },
  { name: "Branding", href: "/products/branding", icon: Palette, items: ["Logo Printing", "Embroidery", "Sublimation", "Engraving"] },
];

export function Header() {
  const { data } = useSiteData();
  const phone = data?.siteSettings?.phone || "+91 76654 67878";
  const email = data?.siteSettings?.email || "printdekhojpr@gmail.com";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── Fixed Header Wrapper ─────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar (desktop only) */}
        <div className="hidden lg:block bg-charcoal text-white/80 text-xs">
          <div className="container-main flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={12} /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={12} /> {email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-white/10 border border-white/20 text-white/90 text-xs font-semibold hover:bg-white/20 transition-all">
                <Send size={11} /> Send Inquiry
              </Link>
              <Link href="/catalog" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-all">
                <Download size={11} /> Download Catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <header className="bg-white shadow-sm border-b border-border/40">
          <div className="container-main flex items-center justify-between h-[64px] lg:h-[76px]">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Print Dekho"
              width={200}
              height={65}
              style={{ width: "auto", height: "52px" }}
              priority
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                  ref={megaRef}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary/80 hover:text-accent transition-colors rounded-lg"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-[22px] shadow-2xl shadow-black/10 border border-border p-8"
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                      >
                        <div className="grid grid-cols-4 gap-6">
                          <div className="col-span-3 grid grid-cols-3 gap-6">
                            {megaMenuCategories.map((cat) => (
                              <div key={cat.name}>
                                <Link href={cat.href} className="flex items-center gap-2 font-heading font-semibold text-sm text-secondary hover:text-accent transition-colors mb-3">
                                  <cat.icon size={16} className="text-accent" /> {cat.name}
                                </Link>
                                <ul className="space-y-1.5">
                                  {cat.items.map((item) => (
                                    <li key={item}>
                                      <Link href={cat.href} className="text-xs text-muted hover:text-accent transition-colors">{item}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="col-span-1 relative overflow-hidden rounded-[16px]">
                            <Image src="/images/slider_welcome_kit.png" alt="Corporate Gifting" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex flex-col justify-end p-4">
                              <p className="text-white text-xs font-semibold">New Arrivals</p>
                              <p className="text-white/70 text-[10px] mt-1">Premium Corporate Kits 2025</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-secondary/80 hover:text-accent transition-colors rounded-lg"
                >
                  {link.name}
                </Link>
              )
            )}
            <Link href="/contact" className="ml-1 px-4 py-2 text-sm font-semibold text-accent border border-accent/30 rounded-[10px] hover:bg-accent hover:text-white transition-all duration-200">
              Contact Us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="/bulk-inquiry" size="sm">Bulk Inquiry</Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-secondary"
            aria-label="Open menu"
            suppressHydrationWarning
          >
            <Menu size={26} />
          </button>
        </div>
        </header>
      </div>

      {/* Spacer to push content below fixed header */}
      <div className="h-[64px] lg:h-[113px]" aria-hidden="true" />

      {/* ── Mobile Menu ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark backdrop — covers full screen */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
              onClick={closeMobile}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-[340px] bg-white flex flex-col lg:hidden shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 h-[64px] border-b border-border/60 flex-shrink-0">
                <Image src="/images/logo.png" alt="Print Dekho" width={120} height={40} style={{ width: "auto", height: "36px" }} />
                <button
                  onClick={closeMobile}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-stone text-secondary hover:bg-border transition-colors"
                  suppressHydrationWarning
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable nav */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav className="py-2">
                  {navLinks.map((link) =>
                    link.hasMega ? (
                      <div key={link.name}>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="w-full flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-secondary border-b border-border/40 hover:bg-stone/40 transition-colors"
                          suppressHydrationWarning
                        >
                          {link.name}
                          <ChevronDown size={16} className={`text-muted transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden bg-stone/20"
                            >
                              {megaMenuCategories.map((cat) => (
                                <Link
                                  key={cat.name}
                                  href={cat.href}
                                  onClick={closeMobile}
                                  className="flex items-center gap-3 px-7 py-3 text-sm text-muted hover:text-accent border-b border-border/20 transition-colors"
                                >
                                  <cat.icon size={15} className="text-accent flex-shrink-0" />
                                  {cat.name}
                                  <ChevronRight size={13} className="ml-auto opacity-30" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMobile}
                        className="flex items-center px-5 py-4 text-[15px] font-semibold text-secondary border-b border-border/40 hover:bg-stone/40 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex items-center px-5 py-4 text-[15px] font-semibold text-accent border-b border-border/40 hover:bg-accent/5 transition-colors"
                  >
                    Contact Us
                  </Link>
                </nav>

                {/* CTA buttons */}
                <div className="px-5 py-6 space-y-3">
                  <Button href="/bulk-inquiry" size="lg" className="w-full" onClick={closeMobile}>
                    Bulk Inquiry
                  </Button>
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/5 transition-colors"
                  >
                    <Send size={14} /> Send Inquiry
                  </Link>
                  <Link
                    href="/catalog"
                    onClick={closeMobile}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] border border-border text-muted text-sm font-semibold hover:bg-stone transition-colors"
                  >
                    <Download size={14} /> Download Catalogue
                  </Link>
                </div>

                {/* Contact info at bottom */}
                <div className="px-5 pb-8 pt-2 border-t border-border/40">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 py-3 text-sm text-muted hover:text-accent transition-colors">
                    <Phone size={15} className="text-accent" /> {phone}
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-3 py-3 text-sm text-muted hover:text-accent transition-colors border-t border-border/40">
                    <Mail size={15} className="text-accent" /> {email}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
