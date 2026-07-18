"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border/50 px-4 py-3 safe-area-bottom">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Call */}
        <a
          href="tel:+917665467878"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-charcoal text-white text-xs font-heading font-semibold transition-all active:scale-95"
        >
          <Phone size={14} />
          Call
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917665467878?text=Hi%20Print%20Dekho%2C%20I%20need%20a%20quote%20for%20corporate%20gifting"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-accent text-white text-xs font-heading font-semibold transition-all active:scale-95"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>

        {/* Bulk Inquiry */}
        <a
          href="/bulk-inquiry"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-charcoal text-white text-xs font-heading font-semibold transition-all active:scale-95"
        >
          <FileText size={14} />
          Inquiry
        </a>
      </div>
    </div>
  );
}
