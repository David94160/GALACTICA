type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconAtom({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTerminal({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9.5 10 12.5 7 15.5" />
      <path d="M12.5 15.5H17" />
    </svg>
  );
}

export function IconBrackets({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 4H5v16h3" />
      <path d="M16 4h3v16h-3" />
      <path d="M9.5 9.5h5" />
      <path d="M9.5 13h3" />
    </svg>
  );
}

export function IconRadical({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M2.5 13.5h2.8L8 20l4.4-15.5H21.5" />
      <path d="M14.5 17.5 18 14" />
      <path d="M18 17.5 14.5 14" />
    </svg>
  );
}

export function IconNodes({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="5.5" cy="6" r="2.3" />
      <circle cx="18.5" cy="6" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.8 6h8.4" />
      <path d="M6.6 8.1 10.8 16" />
      <path d="M17.4 8.1 13.2 16" />
    </svg>
  );
}

export function IconMolecule({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5 18.5 7.25v7.5L12 18.5 5.5 14.75v-7.5Z" />
      <circle cx="12" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="14.75" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="7.25" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 18.5V21" />
    </svg>
  );
}

export function IconHelix({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 3c-4 4-4 6 0 9s4 5 0 9" />
      <path d="M16 3c4 4 4 6 0 9s-4 5 0 9" />
      <path d="M7 5.5h10" />
      <path d="M8.5 12h7" />
      <path d="M7 18.5h10" />
    </svg>
  );
}

export function IconIBeam({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5.5v13" />
      <path d="M8.5 5.5h7" />
      <path d="M8.5 18.5h7" />
      <path d="M4 12h3.5" strokeDasharray="1.5 2.4" />
      <path d="M16.5 12H20" strokeDasharray="1.5 2.4" />
    </svg>
  );
}

export function IconBubble({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h14a1.6 1.6 0 0 1 1.6 1.6v9a1.6 1.6 0 0 1-1.6 1.6H10.2L5.8 20v-3.8H5A1.6 1.6 0 0 1 3.4 14.6v-9A1.6 1.6 0 0 1 5 4Z" />
      <circle cx="8.6" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="10" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPage({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4" />
      <path d="M9 12h7" />
      <path d="M9 15.5h5" />
    </svg>
  );
}

export function IconCompress({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 5h16" />
      <path d="M4 9.5h12" />
      <path d="M4 14h8" />
      <path d="M4 19h5" />
      <path d="M14 16.5 17 19.5 20 16.5" />
    </svg>
  );
}

export function IconGem({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3 19 9.5 12 21 5 9.5Z" />
      <path d="M5 9.5h14" />
      <path d="M12 3 9.2 9.5 12 21l2.8-11.5Z" />
    </svg>
  );
}

export function IconFlask({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9.5 3h5" />
      <path d="M10.3 3v5.2L4.9 19a2 2 0 0 0 1.8 2.9h10.6a2 2 0 0 0 1.8-2.9L13.7 8.2V3" />
      <path d="M7.3 15h9.4" />
      <circle cx="11" cy="18" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCopy({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="9" y="9" width="11" height="11" rx="1.6" />
      <path d="M15 5.6V5a1.6 1.6 0 0 0-1.6-1.6H5A1.6 1.6 0 0 0 3.4 5v8.4A1.6 1.6 0 0 0 5 15h.6" />
    </svg>
  );
}

export function IconCheck({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 12.8 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function IconPlay({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M8.5 5.5v13l10.5-6.5Z" fill="currentColor" />
    </svg>
  );
}

export function IconRotate({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 3.5v4.6h4.6" />
    </svg>
  );
}

export function IconCode({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 6.5 3 12l5 5.5" />
      <path d="m16 6.5 5 5.5-5 5.5" />
      <path d="m13.2 4.5-2.4 15" />
    </svg>
  );
}

export function IconFace({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="9" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8.5 14.2c1.1 1.5 5.9 1.5 7 0" />
    </svg>
  );
}

export function IconSpark({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m12 3 1.9 5.6L19.5 10.5 13.9 12.4 12 18l-1.9-5.6L4.5 10.5 10.1 8.6Z" />
      <path d="M18.5 16.5v4" />
      <path d="M16.5 18.5h4" />
    </svg>
  );
}

export function IconBook({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19.5v15H6A2 2 0 0 0 4 20Z" />
      <path d="M4 4.5v15A1.5 1.5 0 0 0 5.5 21h14" />
      <path d="M8 7.5h7" />
      <path d="M8 11h5" />
    </svg>
  );
}

export function IconDownload({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5v11" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export function IconCpu({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" />
      <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3" />
      <path d="M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
    </svg>
  );
}

export function IconGpu({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="6.5" width="18" height="10.5" rx="1.6" />
      <circle cx="8.8" cy="11.75" r="2.5" />
      <circle cx="8.8" cy="11.75" r="0.8" fill="currentColor" stroke="none" />
      <path d="M14.5 9.5h4M14.5 12h4M14.5 14.5h2.5" />
      <path d="M6 17v2.5M10 17v2.5M14 17v2.5M18 17v2.5" />
    </svg>
  );
}

export function IconAlert({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4 21 19.5H3Z" />
      <path d="M12 10.2v4" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChart({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 4 4 5-6" />
    </svg>
  );
}

export function IconTarget({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconUsers({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M15 20c0-2.2 1.3-4 3-4s3 1.8 3 4" />
    </svg>
  );
}

export function IconTrend({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
}

export function IconShield({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconRocket({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2c-2 4-2 8 0 12s4 6 6 8" />
      <path d="M12 2c2 4 2 8 0 12s-4 6-6 8" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8 14l-3 3M16 14l3 3" />
    </svg>
  );
}

export function IconMemory({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M20 4l2 2-2 2" />
    </svg>
  );
}

export function IconPower({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChat({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSearch({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconLearn({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function IconLayout({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

export function IconNetwork({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4" />
      <path d="M12 11l-5.5 6.5" />
      <path d="M12 11l5.5 6.5" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGlobe({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
