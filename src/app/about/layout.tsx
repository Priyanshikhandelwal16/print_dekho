import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Print Dekho",
  description:
    "Founded in 2012 by Rohit Jain in Jaipur, Print Dekho has grown into India's trusted corporate gifting partner. Learn about our journey, values, and commitment to quality.",
  openGraph: {
    title: "About Us — Print Dekho",
    description:
      "Founded in 2012 by Rohit Jain in Jaipur, Print Dekho has grown into India's trusted corporate gifting partner.",
    url: "https://printdekho.com/about",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
