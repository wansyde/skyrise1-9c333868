import { motion } from "framer-motion";
import heroHome from "@/assets/hero-home.jpg";

const HeroSection = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden"
  >
    <motion.img
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      src={heroHome}
      alt="Luxury automotive campaign"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground mb-3"
      >
        Luxury Car Manufacturer Brand
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
      >
        3X CONVERSION
        <br />
        <span className="text-primary">UPLIFT</span>
      </motion.h1>
    </div>
  </motion.section>
);

export default HeroSection;
