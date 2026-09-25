import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warn" | "success" | "quiet";
  className?: string;
}) {
  const tones = {
    neutral: "bg-secondary text-secondary-foreground border-border",
    accent: "bg-accent text-accent-foreground border-primary/25",
    warn: "bg-warn-soft text-warn-foreground border-warn/35",
    success: "bg-success-soft text-success-foreground border-success/35",
    quiet: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "success";
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_10px_24px_-16px_var(--primary)]",
    success: "bg-success text-primary-foreground hover:brightness-110",
    outline: "border border-input bg-card text-foreground hover:bg-secondary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <pre
      className={cn("code-surface overflow-x-auto p-4 text-[13px] leading-relaxed", className)}
    >
      {children}
    </pre>
  );
}

export function ResultTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | null)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full font-mono text-[12.5px]">
        <thead className="bg-secondary/70">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 text-left font-medium text-muted-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2">
                  {cell === null ? (
                    <span className="text-warn-foreground/70">NULL</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SectionHead({
  label,
  title,
  sub,
}: {
  label?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      {label && <p className="rule-label mb-2">{label}</p>}
      <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}
