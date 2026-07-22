"use client";

import { useState } from "react";
import { KeyRound, ShieldAlert, CheckCircle2, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function ChangePasswordManager() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passcodes do not match.");
      return;
    }

    if (newPassword.length < 4) {
      setError("New passcode must be at least 4 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Admin passcode changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Failed to update passcode.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading font-extrabold text-xl text-secondary">Security Settings</h2>
        <p className="text-muted text-xs mt-1">Manage and update your administrator access passcode.</p>
      </div>

      <div className="max-w-md bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Current Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current passcode"
                className="w-full pl-11 pr-11 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/60 hover:text-secondary cursor-pointer focus:outline-none"
              >
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">
              New Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new passcode"
                className="w-full pl-11 pr-11 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/60 hover:text-secondary cursor-pointer focus:outline-none"
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Confirm New Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new passcode"
                className="w-full pl-11 pr-11 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/60 hover:text-secondary cursor-pointer focus:outline-none"
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Success & Error Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100 text-red-600 text-xs font-semibold"
            >
              <ShieldAlert size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 text-xs font-semibold"
            >
              <CheckCircle2 size={14} className="flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Action Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-[16px] text-xs"
          >
            <Save size={14} />
            {loading ? "Updating Passcode..." : "Change Passcode"}
          </Button>
        </form>
      </div>
    </div>
  );
}
