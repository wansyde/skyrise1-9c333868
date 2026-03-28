const SkyriseLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top circle */}
      <circle cx="20" cy="15" r="13" fill="hsl(245 58% 51%)" />
      {/* Bottom circle */}
      <circle cx="20" cy="25" r="13" fill="hsl(245 58% 51%)" />
      {/* White arch cutout - top opening (bridge in upper circle) */}
      <path
        d="M13 20 a7 7 0 0 1 14 0"
        fill="white"
      />
      {/* White arch cutout - bottom opening (bridge in lower circle) */}
      <path
        d="M13 20 a7 7 0 0 0 14 0"
        fill="white"
      />
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
