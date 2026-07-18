import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Loader } from "@/components/ui/Loader";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Print Dekho — Premium Corporate Gifting & Branding Solutions",
  description:
    "India's leading corporate gifting company since 2012. Premium customized merchandise, employee welcome kits, promotional products & branding solutions for bulk orders.",
  keywords: [
    "corporate gifting",
    "custom merchandise",
    "branding solutions",
    "employee kits",
    "promotional products",
    "bulk orders",
    "Print Dekho",
  ],
  authors: [{ name: "Print Dekho" }],
  openGraph: {
    title: "Print Dekho — Premium Corporate Gifting & Branding Solutions",
    description:
      "India's leading corporate gifting company since 2012. Premium customized merchandise, employee welcome kits & branding solutions.",
    type: "website",
    locale: "en_IN",
    siteName: "Print Dekho",
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body bg-ivory antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Loader />
        <ScrollProgress />
        <Header />
        <main id="main-content" className="min-h-screen pb-[72px] lg:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
