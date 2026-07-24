"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Menu, X, ChevronDown, ChevronRight, Gift, ShoppingBag, Coffee, Shirt, Watch, Palette, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

import { useSiteData } from "@/lib/useSiteData";

export function Header() {
  const { data } = useSiteData();
  const phone = data?.siteSettings?.phone || "+91 76654 67878";
  const email = data?.siteSettings?.email || "printdekhojpr@gmail.com";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fix: lock body scroll when mobile menu is open using position:fixed trick
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
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
    <div className="sticky top-0 z-50">
      {/* Top Bar — desktop only */}
      <div className={`hidden lg:block text-xs transition-all duration-300 ${scrolled ? "bg-charcoal/95 backdrop-blur-md" : "bg-charcoal"} text-white/80`}>
        <div className="container-main flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} /> {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} /> {email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-white/10 border border-white/20 text-white/90 text-xs font-semibold hover:bg-white/20 transition-all duration-200"
            >
              <Send size={11} />
              Send Inquiry
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-all duration-200"
            >
              <Download size={11} />
              Download Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-main flex items-center justify-between h-[70px] lg:h-[80px]">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Print Dekho"
              width={200}
              height={65}
              style={{ width: "auto", height: "58px" }}
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

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-[22px] shadow-2xl shadow-black/10 border border-border p-8"
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                      >
                        <div className="grid grid-cols-4 gap-6">
                          <div className="col-span-3 grid grid-cols-3 gap-6">
                            {megaMenuCategories.map((cat) => (
                              <div key={cat.name}>
                                <Link
                                  href={cat.href}
                                  className="flex items-center gap-2 font-heading font-semibold text-sm text-secondary hover:text-accent transition-colors mb-3"
                                >
                                  <cat.icon size={16} className="text-accent" />
                                  {cat.name}
                                </Link>
                                <ul className="space-y-1.5">
                                  {cat.items.map((item) => (
                                    <li key={item}>
                                      <Link href={cat.href} className="text-xs text-muted hover:text-accent transition-colors">
                                        {item}
                                      </Link>
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
            {/* Contact Us — highlighted */}
            <Link
              href="/contact"
              className="ml-1 px-4 py-2 text-sm font-semibold text-accent border border-accent/30 rounded-[10px] hover:bg-accent hover:text-white transition-all duration-200"
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="/bulk-inquiry" size="sm">
              Bulk Inquiry
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2"
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ✅ Mobile Menu — fixed overlay, no page scroll bleed */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={closeMobile}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-40 h-full w-[85vw] max-w-[360px] bg-white lg:hidden flex flex-col shadow-2xl"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 flex-shrink-0">
                <Image src="/images/logo.png" alt="Print Dekho" width={130} height={42} style={{ width: "auto", height: "38px" }} />
                <button onClick={closeMobile} className="p-2 text-muted hover:text-secondary" suppressHydrationWarning>
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable nav content */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                  {navLinks.map((link) =>
                    link.hasMega ? (
                      <div key={link.name}>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="w-full flex items-center justify-between py-3.5 px-5 text-base font-heading font-semibold text-secondary border-b border-border/40 hover:bg-stone/50 transition-colors"
                          suppressHydrationWarning
                        >
                          {link.name}
                          <ChevronDown size={17} className={`transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-stone/30"
                            >
                              <div className="pl-8 py-2 space-y-1">
                                {megaMenuCategories.map((cat) => (
                                  <Link
                                    key={cat.name}
                                    href={cat.href}
                                    onClick={closeMobile}
                                    className="flex items-center gap-3 py-2.5 text-sm text-muted hover:text-accent transition-colors"
                                  >
                                    <cat.icon size={15} className="text-accent flex-shrink-0" />
                                    {cat.name}
                                    <ChevronRight size={13} className="ml-auto opacity-40" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMobile}
                        className="flex items-center py-3.5 px-5 text-base font-heading font-semibold text-secondary border-b border-border/40 hover:bg-stone/50 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex items-center py-3.5 px-5 text-base font-heading font-semibold text-accent border-b border-border/40 hover:bg-accent/5 transition-colors"
                  >
                    Contact Us
                  </Link>
                </nav>

                {/* CTA buttons inside drawer */}
                <div className="px-5 py-6 space-y-3">
                  <Button href="/bulk-inquiry" size="lg" className="w-full" onClick={closeMobile}>
                    Bulk Inquiry
                  </Button>
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[16px] border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/5 transition-colors"
                  >
                    <Send size={15} />
                    Send Inquiry
                  </Link>
                  <Link
                    href="/catalog"
                    onClick={closeMobile}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[16px] border border-border text-muted text-sm font-semibold hover:bg-stone transition-colors"
                  >
                    <Download size={15} />
                    Download Catalogue
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
