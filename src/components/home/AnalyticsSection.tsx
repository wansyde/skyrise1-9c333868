import { motion } from "framer-motion";
import { Globe2, Users, BarChart3 } from "lucide-react";

const demographics = [
  { label: "25–34", pct: 38 },
  { label: "35–44", pct: 29 },
  { label: "45–54", pct: 18 },
  { label: "55+", pct: 15 },
];

const mediaAffinity = [
  { label: "SVOD", pct: 72 },
  { label: "Radio", pct: 61 },
  { label: "Gaming", pct: 48 },
  { label: "Social", pct: 42 },
  { label: "Messaging", pct: 35 },
];

const brandLogos = ["British Airways", "Chanel", "Porsche", "Bentley", "Aston Martin"];

const AnalyticsSection = () => (
  <section className="px-5 sm:px-8 mt-10">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-lg font-semibold mb-6 tracking-tight"
    >
      Analytics & Data
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-5 sm:p-8"
    >
      {/* Audience Size */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Globe2 className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <span className="text-xs text-muted-foreground block">Global Audience Size</span>
          <span className="text-3xl font-bold tabular-nums">3.10m</span>
          <span className="text-xs text-muted-foreground ml-2">5.5% of population</span>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 bg-secondary/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {[
              { top: "18%", left: "22%", size: 10, color: "hsl(var(--chart-3))" },
              { top: "28%", left: "35%", size: 14, color: "hsl(var(--destructive))" },
              { top: "32%", left: "48%", size: 18, color: "hsl(var(--chart-3))" },
              { top: "25%", left: "55%", size: 8, color: "hsl(var(--destructive))" },
              { top: "40%", left: "42%", size: 12, color: "hsl(var(--chart-3))" },
              { top: "50%", left: "50%", size: 20, color: "hsl(var(--chart-3))" },
              { top: "45%", left: "58%", size: 10, color: "hsl(var(--destructive))" },
              { top: "55%", left: "45%", size: 8, color: "hsl(var(--chart-3))" },
              { top: "35%", left: "62%", size: 6, color: "hsl(var(--destructive))" },
              { top: "60%", left: "52%", size: 14, color: "hsl(var(--chart-3))" },
              { top: "48%", left: "38%", size: 6, color: "hsl(var(--destructive))" },
              { top: "42%", left: "30%", size: 10, color: "hsl(var(--chart-3))" },
            ].map((dot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.85 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                className="absolute rounded-full"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: dot.size,
                  height: dot.size,
                  backgroundColor: dot.color,
                  boxShadow: `0 0 ${dot.size}px ${dot.color}`,
                }}
              />
            ))}
            <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
              Global Reach Map
            </div>
          </div>
        </div>
      </div>

      {/* Demographics & Media Affinity */}
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm font-medium">Demographics</span>
          </div>
          <div className="space-y-3">
            {demographics.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="tabular-nums font-medium">{d.pct}%</span>
                </div>
                <div className="progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="progress-fill"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm font-medium">Media Affinity</span>
          </div>
          <div className="space-y-3">
            {mediaAffinity.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="tabular-nums font-medium">{m.pct}%</span>
                </div>
                <div className="progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="progress-fill"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="mt-8 pt-6 border-t border-border">
        <span className="text-xs text-muted-foreground mb-4 block">Featured Brands</span>
        <div className="flex items-center gap-8 overflow-x-auto pb-1">
          {brandLogos.map((name) => (
            <span
              key={name}
              className="text-[11px] font-semibold text-muted-foreground/50 whitespace-nowrap uppercase tracking-[0.2em] hover:text-muted-foreground transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default AnalyticsSection;
