import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Kits — Print Dekho",
  description:
    "Premium corporate gift kits for employee onboarding, festivals, and client appreciation. Fully customizable welcome kits with branded merchandise.",
  openGraph: {
    title: "Corporate Kits — Print Dekho",
    description:
      "Premium corporate gift kits for employee onboarding, festivals, and client appreciation. Fully customizable.",
    url: "https://printdekho.com/corporate-kits",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function CorporateKitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
