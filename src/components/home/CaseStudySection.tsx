import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const CaseStudySection = () => (
  <section className="px-5 sm:px-8 mt-10">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-lg font-semibold mb-6 tracking-tight"
    >
      Campaign Case Study
    </motion.h2>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-card p-6 sm:p-8 space-y-5"
    >
      <motion.p custom={0} variants={fadeUp} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        A luxury car manufacturer wanted to drive leads for its new model with a 10-week Display campaign.
      </motion.p>
      <motion.p custom={1} variants={fadeUp} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Skyrise built a bespoke audience profile consisting of high-net-worth individuals overlapping car enthusiasts and those in-market for a new car — e.g. coutts.com, mclaren.com, autotrader.co.uk, lexus.co.uk — resulting in an audience of over <span className="text-foreground font-semibold tabular-nums">2.5m</span>.
      </motion.p>
      <motion.p custom={2} variants={fadeUp} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Locations and preferred publishers for this HNW audience targeted, supported by strong creative across <span className="text-foreground font-semibold tabular-nums">3.3m</span> impressions resulted in <span className="text-foreground font-semibold">25 leads</span> consisting of 21 test drive form submissions and 4 configurator submissions — <span className="text-primary font-bold">3x improvement</span> in conversions.
      </motion.p>

      <motion.div
        custom={3}
        variants={fadeUp}
        className="grid grid-cols-2 gap-4 pt-4 border-t border-border"
      >
        {[
          { value: "40.7%", label: "Video VTR vs 30% benchmark" },
          { value: "+19%", label: "Attention score above benchmark" },
          { value: "2.5M", label: "Audience reach" },
          { value: "3X", label: "Conversion uplift" },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-3">
            <div className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default CaseStudySection;
