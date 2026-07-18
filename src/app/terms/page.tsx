"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <>
      {/* Hero — cream */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Legal
            </span>
            <h1 className="font-heading font-extrabold text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight text-secondary">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-[0.95rem] text-muted max-w-xl mx-auto">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content — white */}
      <section className="section-spacing bg-white">
        <div className="container-main max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-sm max-w-none"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">1. General</h2>
                <p className="text-sm text-muted leading-relaxed">
                  These Terms and Conditions govern your use of the Print Dekho website and services. By placing an order with Print Dekho, you agree to these terms. Print Dekho is a B2B corporate gifting and branded merchandise company based in Jaipur, Rajasthan.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">2. Orders & Pricing</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />All prices are quoted in Indian Rupees (INR) and are exclusive of GST unless stated otherwise.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Prices are valid for the quoted quantity and timeline. Changes in quantity or specifications may affect pricing.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Orders are confirmed only after advance payment is received and mockup is approved.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Minimum Order Quantity (MOQ) applies to all products. MOQ varies by product category.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">3. Payment Terms</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Standard payment: 50% advance + 50% before dispatch.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Credit terms may be available for repeat clients based on mutual agreement.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Payment accepted via Bank Transfer (NEFT/RTGS/IMPS), UPI, and company cheques.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />GST invoice provided for all orders.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">4. Production & Delivery</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Standard production time: 7–10 working days from mockup approval and advance payment.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Rush orders (4–5 working days) available subject to product availability.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Shipping charges are additional unless included in the quotation.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Delivery timelines are estimates and may vary due to logistics or unforeseen circumstances.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">5. Design & Branding</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Digital mockups are provided for approval before production. Production begins only after written approval.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Color variations of ±5–10% may occur between screen display and actual product due to printing process.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Client is responsible for ensuring logo files provided are correct and authorized for use.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">6. Quality & Returns</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />We maintain strict quality standards. Defective items are replaced at no extra cost.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Claims for defects must be reported within 48 hours of delivery with photographic evidence.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Returns are not accepted for correctly produced items matching the approved mockup.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />A tolerance of ±3% in quantity is standard for bulk manufacturing orders.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">7. Intellectual Property</h2>
                <p className="text-sm text-muted leading-relaxed">
                  All logos, designs, and brand assets provided by the client remain the intellectual property of the client. Print Dekho uses these materials solely for the purpose of fulfilling the order. We may use project photographs in our portfolio with client permission.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">8. Cancellation</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Orders can be cancelled before production begins with a full refund of the advance.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Once production has started, cancellation charges may apply based on work completed.</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Custom/personalized orders cannot be cancelled once production begins.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">9. Limitation of Liability</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Print Dekho&apos;s liability is limited to the value of the specific order in question. We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">10. Contact</h2>
                <p className="text-sm text-muted leading-relaxed">
                  For questions regarding these Terms & Conditions:
                </p>
                <div className="mt-3 p-5 bg-stone rounded-[16px] border border-border">
                  <p className="text-sm text-secondary font-semibold">Print Dekho</p>
                  <p className="text-sm text-muted mt-1">Email: printdekhojpr@gmail.com</p>
                  <p className="text-sm text-muted">Phone: +91 76654 67878</p>
                  <p className="text-sm text-muted">Location: Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
