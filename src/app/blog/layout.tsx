import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Print Dekho",
  description:
    "Read insights on corporate gifting trends, branding strategies, and tips for choosing the perfect customized merchandise for your team and clients.",
  openGraph: {
    title: "Blog — Print Dekho",
    description:
      "Insights on corporate gifting trends, branding strategies, and tips for choosing customized merchandise.",
    url: "https://printdekho.com/blog",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
