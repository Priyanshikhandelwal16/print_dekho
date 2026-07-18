import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve — Print Dekho",
  description:
    "Print Dekho serves IT, BFSI, healthcare, education, real estate, hospitality, and more with tailored corporate gifting and branding solutions for every industry.",
  openGraph: {
    title: "Industries We Serve — Print Dekho",
    description:
      "Tailored corporate gifting solutions for IT, BFSI, healthcare, education, real estate, and hospitality industries.",
    url: "https://printdekho.com/industries",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
