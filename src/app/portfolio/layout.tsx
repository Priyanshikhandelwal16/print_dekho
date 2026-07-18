import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Print Dekho",
  description:
    "View our portfolio of corporate gifting projects. See how we've helped India's top brands with customized merchandise, welcome kits, and promotional products.",
  openGraph: {
    title: "Portfolio — Print Dekho",
    description:
      "Our portfolio of corporate gifting projects for India's top brands. Customized merchandise and promotional products.",
    url: "https://printdekho.com/portfolio",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
