import { motion } from "framer-motion";
import analysisCar from "@/assets/analysis-car.jpg";
import carOwners from "@/assets/car-owners.jpg";

const editorialBlocks = [
  {
    image: analysisCar,
    alt: "Luxury car in-depth analysis",
    title: "In-depth analysis",
    subtitle: "Put effective audience design at your fingertips",
    body: "An evidence-based shortcut for marketers to understand audiences, win customers, and make smarter media investments with where+when®.",
  },
  {
    image: carOwners,
    alt: "Connecting real car owners",
    title: "Connecting real car owners",
    subtitle: "Real-world data meets predictive AI",
    body: "This powerful platform combines high-quality real-world time and location data with expert market analysis and predictive AI.",
  },
];

const EditorialSection = () => (
  <section className="px-5 sm:px-8 mt-12 mb-10 space-y-14">
    {editorialBlocks.map((block, idx) => (
      <motion.article
        key={block.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <motion.div
            whileInView={{ scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="h-[240px] sm:h-[320px] overflow-hidden"
          >
            <img
              src={block.image}
              alt={block.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
        <div className="mt-5">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-primary"
          >
            {block.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-sm font-medium text-foreground/80 mt-1.5"
          >
            {block.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-xl"
          >
            {block.body}
          </motion.p>
        </div>
      </motion.article>
    ))}
  </section>
);

export default EditorialSection;
