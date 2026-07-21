"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldAlert, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setError(data.message || "Invalid passcode");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] bg-white rounded-[26px] border border-border shadow-2xl p-8 relative z-10"
      >
        <div className="text-center">
          <div className="w-14 h-14 bg-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-secondary">
            Print Dekho Admin
          </h1>
          <p className="text-muted text-xs mt-1.5 leading-relaxed">
            Enter your passcode to access the website management dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
              Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-stone rounded-[16px] border border-border text-sm text-secondary placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/5 transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100 text-red-600 text-xs"
            >
              <ShieldAlert size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5 mt-2 rounded-[16px] text-sm"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
