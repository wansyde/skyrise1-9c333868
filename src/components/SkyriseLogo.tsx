const SkyriseLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 44 44" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="skyrise-clip">
          <rect x="0" y="0" width="44" height="44" />
        </clipPath>
      </defs>
      <g clipPath="url(#skyrise-clip)">
        {/* Top half-donut (C opening down-right) */}
        {/* Outer arc top */}
        <path
          d="M22 2 A14 14 0 1 0 22 30 L22 22 A6 6 0 1 1 22 10 Z"
          fill="hsl(245 58% 51%)"
        />
        {/* Bottom half-donut (C opening up-left) */}
        <path
          d="M22 42 A14 14 0 1 0 22 14 L22 22 A6 6 0 1 1 22 34 Z"
          fill="hsl(245 58% 51%)"
        />
        {/* White gap - horizontal bridge to create the S separation */}
        <rect x="16" y="19" width="12" height="6" rx="3" fill="white" />
      </g>
    </svg>
    <span
      style={{
        color: "hsl(245 58% 51%)",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        fontSize: "inherit",
      }}
    >
      Skyrise
    </span>
  </div>
);

export default SkyriseLogo;
