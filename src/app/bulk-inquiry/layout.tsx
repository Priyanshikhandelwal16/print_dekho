import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Inquiry — Print Dekho",
  description:
    "Submit a bulk order inquiry for corporate gifts and branded merchandise. Get competitive pricing for large quantities with Print Dekho's dedicated team.",
  openGraph: {
    title: "Bulk Inquiry — Print Dekho",
    description:
      "Submit a bulk order inquiry for corporate gifts. Competitive pricing for large quantities.",
    url: "https://printdekho.com/bulk-inquiry",
    siteName: "Print Dekho",
    type: "website",
  },
};

export default function BulkInquiryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
