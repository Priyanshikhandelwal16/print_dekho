import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Print Dekho",
  description:
    "Explore our wide range of corporate gifting products including bags, drinkware, apparel, stationery, sports jerseys, combo sets, and festival hampers. Bulk orders welcome.",
  openGraph: {
    title: "Products — Print Dekho",
    description:
      "Explore our wide range of corporate gifting products. Bags, drinkware, apparel, stationery and more. Bulk orders welcome.",
    url: "https://printdekho.com/products",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
