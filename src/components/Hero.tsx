import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { COMPANY_INFO } from "../lib/constants";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-950 via-brick-dark to-stone-900 border-b border-stone-850"
    >
      {/* Brick texture overlay */}
      <div className="absolute inset-0 brick-texture-overlay opacity-30 pointer-events-none" />

      {/* Abstract light burst accent */}
      <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brick-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brick-light/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col justify-center items-center z-10">
        
        {/* Established Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-brick-light text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3 h-3 text-brick-light animate-pulse" />
          <span>ESTD. {COMPANY_INFO.established} · {COMPANY_INFO.hindiName} · PRAYAGRAJ</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight text-white mb-6 leading-tight max-w-4xl"
        >
          {COMPANY_INFO.tagline.split("from")[0]} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brick-light via-orange-400 to-amber-300 font-bold italic">
            from the Heart
          </span>{" "}
          of Prayagraj
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl mb-10 leading-relaxed font-sans"
        >
          <strong>{COMPANY_INFO.name}</strong> ({COMPANY_INFO.hindiTagline}) manufactures premium Class-I red clay blocks and eco-friendly concrete substitutes. Sourced from organic plains silt and fired under strict quality laboratory parameters.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("products")}
            className="group flex items-center justify-center gap-2 bg-brick-primary hover:bg-brick-light text-white font-bold tracking-widest uppercase text-xs py-4 px-8 rounded shadow-lg hover:shadow-orange-950/20 active:scale-[0.98] transition-all duration-200"
            id="hero-explore-btn"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("calculator")}
            className="flex items-center justify-center bg-transparent hover:bg-white/5 text-stone-200 hover:text-white font-bold tracking-widest uppercase text-xs py-4 px-8 rounded border border-stone-600 hover:border-stone-400 active:scale-[0.98] transition-all duration-200"
            id="hero-calculator-btn"
          >
            Price Estimator
          </button>
        </motion.div>

        {/* Down Arrow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex [@media(max-height:750px)]:hidden flex-col items-center gap-1.5 cursor-pointer text-stone-400 hover:text-white transition-colors"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-xs font-mono tracking-widest uppercase opacity-75">SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-brick-light" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
