"use client";

/**
 * The small uppercase label ("Work", "About", "2026"...) that pins in
 * place while its sibling content scrolls past. Matches the Figma
 * sticky-header pattern, but the pin *duration* comes from the real
 * height of the sibling column (via CSS grid/flex + `sticky`) instead
 * of Figma's fixed pixel spacers — those were sized to the mockup's
 * placeholder copy and would drift the moment real content changes
 * length. The visual result is identical.
 */
export default function StickyLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`sticky top-22.5 ${className}`}>
      <p className="text-label whitespace-nowrap text-on-surface">
        {children}
      </p>
    </div>
  );
}
