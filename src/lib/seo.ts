import type { Metadata } from "next";

export function generateMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} — Print Dekho`,
    description,
    openGraph: {
      title: `${title} — Print Dekho`,
      description,
      url: `https://printdekho.com${path}`,
      siteName: "Print Dekho",
      type: "website",
    },
  };
}
