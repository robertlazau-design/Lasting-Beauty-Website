import { motion } from 'motion/react';

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
      {/* Layered gradient background */}
      <div className="absolute inset-0">
        {/* Base warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ece7e1] via-[#f5efe9] to-[#f5efe9]" />

        {/* Radial warmth in center */}
        <div className="absolute inset-0 bg-radial from-[#e5dfd6]/60 via-transparent to-transparent" />

        {/* Soft accent glow — top right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#d2c7ba] rounded-full opacity-25 blur-[120px]" />

        {/* Soft accent glow — bottom left */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#c5bcb1] rounded-full opacity-20 blur-[140px]" />

        {/* Subtle mocha accent — center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#8c7768] rounded-full opacity-[0.07] blur-[100px]" />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-[15%] right-[10%] w-[1px] h-40 bg-gradient-to-b from-transparent via-[#8c7768] to-transparent hidden sm:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-[20%] left-[8%] w-[1px] h-32 bg-gradient-to-b from-transparent via-[#c5bcb1] to-transparent hidden sm:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2, delay: 0.9 }}
        className="absolute top-[25%] left-[15%] w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8c7768] to-transparent hidden lg:block"
      />

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
