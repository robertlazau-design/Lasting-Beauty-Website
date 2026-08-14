import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Users, DollarSign, Heart } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'All Hair Types Welcome',
    description: 'Ages 5 and up, all hair textures. Whether natural, relaxed, or straight — you\'re welcome in the chair.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'Same pricing for kids and adults. No hidden fees, no surprises — just straightforward service.',
  },
  {
    icon: Heart,
    title: 'Natural Hair Specialist',
    description: 'Years of expertise in braids, cornrows, and protective styling with a focus on hair health and deep conditioning.',
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-section"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#ece7e1] relative overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#d2c7ba] rounded-full opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e5dfd6] rounded-full opacity-25 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1px] bg-[#8c7768] mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#332f2c] tracking-[0.06em] mb-3"
          >
            WHY LASTING BEAUTY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[11px] uppercase tracking-[0.3em] text-[#8c7768] font-medium"
          >
            More than a style — an experience
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="group bg-white/70 backdrop-blur-sm border border-[#e5dfd6] rounded-2xl p-8 lg:p-10 text-center hover:shadow-[0_8px_40px_rgba(140,119,104,0.1)] hover:border-[#c5bcb1] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-[#f5efe9] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#e5dfd6] group-hover:bg-[#8c7768] group-hover:border-[#8c7768] transition-all duration-500">
                <feature.icon className="w-7 h-7 text-[#8c7768] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl text-[#332f2c] mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6d6259] leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social portfolio banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 bg-gradient-to-r from-[#f5efe9] via-white/80 to-[#f5efe9] border border-[#e5dfd6] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-semibold block mb-1">
              Follow Along On Social • @braids_by_lastingbeauty
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-[#332f2c]">
              See Recent Hair Transformations
            </h4>
            <p className="text-xs text-[#6d6259] mt-1 font-light">
              Watch behind-the-scenes client videos, styling tutorials, and daily inspiration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.tiktok.com/@braids_by_lastingbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#332f2c] text-white hover:bg-[#8c7768] rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm"
              title="TikTok @braids_by_lastingbeauty"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/>
              </svg>
              <span>TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/braids_by_lastingbeauty/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#8c7768] text-white hover:bg-[#726155] rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm"
              title="Instagram @braids_by_lastingbeauty"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
