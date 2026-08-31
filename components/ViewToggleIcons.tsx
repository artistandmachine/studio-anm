/** List/grid icons for ViewToggle, inlined (not <img>-sourced) so their
 * stroke can take the current text color via currentColor — same pattern
 * as ThemeIcons. */

export function ListIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-hidden="true">
      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}

export function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="2" y="9" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="9" width="5" height="5" stroke="currentColor" />
    </svg>
  );
}
