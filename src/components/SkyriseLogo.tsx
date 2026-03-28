const SkyriseLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    {/* Icon mark — overlapping circles with cutout */}
    <svg viewBox="0 0 48 48" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top arc */}
      <path
        d="M24 4C13 4 4 13 4 24c0 5.5 2.2 10.5 5.8 14.2C13.5 34.5 18.4 32 24 32c5.6 0 10.5 2.5 14.2 6.2C41.8 34.5 44 29.5 44 24 44 13 35 4 24 4Z"
        fill="hsl(245 58% 51%)"
      />
      {/* Bottom arc */}
      <path
        d="M24 16c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10Z"
        fill="hsl(245 58% 51%)"
      />
      {/* White bridge cutout */}
      <ellipse cx="24" cy="26" rx="4.5" ry="4.5" fill="white" />
      <rect x="19.5" y="22" width="9" height="4" fill="white" />
    </svg>
    <span
      className="font-semibold tracking-tight"
      style={{
        color: "hsl(245 58% 51%)",
        fontSize: "inherit",
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      Skyrise
    </span>
  </div>
);

export default SkyriseLogo;
