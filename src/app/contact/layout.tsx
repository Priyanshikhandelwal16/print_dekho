import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Print Dekho",
  description:
    "Get in touch with Print Dekho for corporate gifting solutions. Based in Jaipur, we serve clients across India. Call, WhatsApp, or visit us for bulk order inquiries.",
  openGraph: {
    title: "Contact Us — Print Dekho",
    description:
      "Get in touch with Print Dekho for corporate gifting solutions. Based in Jaipur, serving clients across India.",
    url: "https://printdekho.com/contact",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
