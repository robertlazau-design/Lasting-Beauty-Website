import { motion } from 'motion/react';
import heroBg from '../../assets/hero-bg.png';

export function Hero() {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Lasting Beauty salon"
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5efe9]/90 via-[#f5efe9]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5efe9] via-transparent to-[#f5efe9]/40" />
        <div className="absolute inset-0 bg-[#f5efe9]/10" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-20 h-[1px] bg-[#8c7768] mb-8"
        />

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.1em] text-[#332f2c] leading-none mb-1"
        >
          BRAIDED
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="block font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8c7768] -mt-2 sm:-mt-4 rotate-[-2deg] tracking-wide"
        >
          for Lasting Beauty
        </motion.span>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6d6259] font-medium max-w-lg leading-relaxed"
        >
          Precision braids, clean parts & healthy hair transformations in Happy Valley, OR — for ages 5+
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onClick={scrollToServices}
          className="mt-10 px-10 py-4 border-2 border-[#332f2c] text-[#332f2c] text-xs uppercase tracking-[0.25em] font-semibold rounded-full hover:bg-[#332f2c] hover:text-[#f5efe9] transition-all duration-400 active:scale-95 hover:shadow-[0_4px_20px_rgba(51,47,44,0.2)]"
        >
          Explore Services
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#8c7768] font-medium">Scroll</span>
        <div className="animate-scroll-indicator">
          <svg className="w-5 h-5 text-[#8c7768]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
