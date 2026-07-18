import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs — Print Dekho",
  description:
    "Frequently asked questions about Print Dekho's corporate gifting services, bulk order process, customization options, delivery timelines, and pricing.",
  openGraph: {
    title: "FAQs — Print Dekho",
    description:
      "Frequently asked questions about corporate gifting services, bulk orders, customization, and delivery.",
    url: "https://printdekho.com/faq",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
