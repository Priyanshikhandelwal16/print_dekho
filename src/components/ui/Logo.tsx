"use client";

interface LogoProps {
  variant?: "default" | "white";
  showTagline?: boolean;
  className?: string;
}

export function Logo({ variant = "default", showTagline = false, className = "" }: LogoProps) {
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span className="font-heading font-extrabold text-[1.35rem] leading-none">
        {variant === "white" ? (
          <>Print<span className="text-accent">Dekho</span></>
        ) : (
          <>
            <span className="text-secondary">Print</span>
            <span className="text-accent">Dekho</span>
          </>
        )}
      </span>
      {showTagline && (
        <span className={`text-[9px] italic mt-0.5 ${variant === "white" ? "text-white/40" : "text-muted"}`}>
          See The Print, Feel The Shine
        </span>
      )}
    </div>
  );
}
