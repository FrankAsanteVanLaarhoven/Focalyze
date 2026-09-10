
import React from 'react';

interface FocalyzeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const FocalyzeLogo: React.FC<FocalyzeLogoProps> = ({
  size = 32,
  className = '',
  showText = true,
  textClassName = 'text-xl font-bold text-adhd-primary',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Focalyze logo mark"
      >
        <defs>
          <linearGradient id="focalyze-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect width="48" height="48" rx="12" fill="url(#focalyze-grad)" />

        {/* Focus ring outer */}
        <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="2.5" strokeOpacity="0.35" fill="none" />

        {/* Focus ring inner */}
        <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.5" strokeOpacity="0.6" fill="none" />

        {/* Centre dot — the focal point */}
        <circle cx="24" cy="24" r="3" fill="white" />

        {/* Four alignment marks — north, south, east, west */}
        <line x1="24" y1="7"  x2="24" y2="11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="24" y1="37" x2="24" y2="41" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="7"  y1="24" x2="11" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="37" y1="24" x2="41" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className={textClassName}>
          Focalyze
        </span>
      )}
    </div>
  );
};

export default FocalyzeLogo;
