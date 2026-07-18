"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
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
              Privacy Policy
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
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">1. Introduction</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Print Dekho (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services for corporate gifting and branded merchandise.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">2. Information We Collect</h2>
                <p className="text-sm text-muted leading-relaxed mb-3">We may collect the following information:</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Personal information: name, email address, phone number, company name</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Business information: company logo, branding requirements, order details</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Communication data: messages sent through our contact forms</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />Technical data: IP address, browser type, device information</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">3. How We Use Your Information</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />To process and fulfill your orders</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />To communicate with you about your orders and inquiries</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />To create custom mockups and design proofs</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />To improve our website and services</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />To send relevant product updates (with your consent)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">4. Data Protection</h2>
                <p className="text-sm text-muted leading-relaxed">
                  We implement appropriate security measures to protect your personal information. Your company logos and branding materials are stored securely and used only for the purpose of fulfilling your orders. We do not share your design files or brand assets with any third party.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">5. Third-Party Sharing</h2>
                <p className="text-sm text-muted leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing your orders, such as logistics partners for delivery.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">6. Cookies</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some site functionality.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">7. Your Rights</h2>
                <p className="text-sm text-muted leading-relaxed">
                  You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at printdekhojpr@gmail.com.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-xl text-secondary mb-3">8. Contact Us</h2>
                <p className="text-sm text-muted leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us:
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
