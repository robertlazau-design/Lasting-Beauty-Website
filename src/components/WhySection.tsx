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
      </div>
    </section>
  );
}
