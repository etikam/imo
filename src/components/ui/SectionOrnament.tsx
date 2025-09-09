import React from 'react';

interface SectionOrnamentProps {
  variant?: 'rings' | 'corners';
  className?: string;
}

export const SectionOrnament: React.FC<SectionOrnamentProps> = ({ variant = 'rings', className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden>
      {variant === 'rings' ? (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" fill="none">
          <circle cx="600" cy="140" r="230" stroke="rgba(99,102,241,0.18)" strokeWidth="1" />
          <circle cx="600" cy="140" r="300" stroke="rgba(168,85,247,0.14)" strokeWidth="1" />
          <circle cx="600" cy="140" r="380" stroke="rgba(59,130,246,0.10)" strokeWidth="1" />
          <circle cx="600" cy="140" r="460" stroke="rgba(59,130,246,0.06)" strokeWidth="1" />
          {/* Small accents */}
          <rect x="588" y="-4" width="24" height="24" rx="6" transform="rotate(45 588 -4)" fill="rgba(99,102,241,0.18)" />
          <rect x="104" y="132" width="16" height="16" rx="4" transform="rotate(45 104 132)" fill="rgba(168,85,247,0.16)" />
          <rect x="1064" y="132" width="16" height="16" rx="4" transform="rotate(45 1064 132)" fill="rgba(59,130,246,0.16)" />
        </svg>
      ) : (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" fill="none">
          {/* Corner arcs */}
          <path d="M0 140 C 0 62, 62 0, 140 0" stroke="rgba(99,102,241,0.18)" strokeWidth="2" />
          <path d="M1200 140 C 1200 62, 1138 0, 1060 0" stroke="rgba(168,85,247,0.18)" strokeWidth="2" />
          <path d="M0 460 C 0 538, 62 600, 140 600" stroke="rgba(59,130,246,0.18)" strokeWidth="2" />
          <path d="M1200 460 C 1200 538, 1138 600, 1060 600" stroke="rgba(99,102,241,0.14)" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

export default SectionOrnament;


