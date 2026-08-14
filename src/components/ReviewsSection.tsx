import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceTargetSelection } from './ServiceMatcher';

/* ── Review Data ── */
interface Review {
  name: string;
  rating: number;
  text: string;
  serviceTag: string;
  target: ServiceTargetSelection;
}

const reviews: Review[] = [
  {
    name: 'Eviana Lopez',
    rating: 5,
    text: "I came to Marissa wanting a full transformation to bring my curls back to life. I was honestly so nervous but also really excited, and she completely exceeded my expectations. Not only did she fully deliver on my hair, but she also took the time to educate me on how to care for my curls and keep them healthy. I left feeling so much more confident and empowered. Marissa truly knows what she's doing, and I couldn't recommend her enough!",
    serviceTag: 'Curl Transformation',
    target: { categoryId: 'silk-press', styleId: 'curl-transformation', variationId: 'curl-def' },
  },
  {
    name: 'Kyree Thames',
    rating: 5,
    text: "Best of the best with braids! I always enjoy my time with Marissa. Even while braiding my hair, she manages to heal and transform it, leaving it looking amazing every single time!",
    serviceTag: 'Knotless Braids',
    target: { categoryId: 'braids', styleId: 'knotless', variationId: 'knotless-medium' },
  },
  {
    name: 'Mikyla Ruiz',
    rating: 5,
    text: "The silk press came out perfect on my hair. She used great products, would definitely recommend and will be going back in the future!",
    serviceTag: 'Classic Silk Press',
    target: { categoryId: 'silk-press', styleId: 'silk-press-classic', variationId: 'sp-natural' },
  },
  {
    name: 'Natalie Kiyah',
    rating: 5,
    text: "Wow! My son got his hair braided by her for Kindergarten and she was super patient with him and the braids are FANTASTIC. Will return & highly recommend.",
    serviceTag: "Men's & Kids Cornrows",
    target: { categoryId: 'maintenance', styleId: 'mens-braids', variationId: 'mens-cornrows' },
  },
  {
    name: 'Jennifer Tikhomirov',
    rating: 5,
    text: "Received a scalp treatment from Marissa, she was amazing, friendly, and kind. My hair had never felt better, it was so soft after. I loved everything about it, and it was very relaxing. Definitely recommend, and will be coming back!!!",
    serviceTag: 'Scalp Detox & Treatment',
    target: { categoryId: 'maintenance', styleId: 'wash-treat', variationId: 'scalp-treatment' },
  },
  {
    name: 'Taysha',
    rating: 5,
    text: "Marissa is the best! I always love my hair. She provides such a clean, professional, and welcoming space!",
    serviceTag: 'Boho Knotless Braids',
    target: { categoryId: 'braids', styleId: 'boho', variationId: 'boho-m-waist' },
  },
  {
    name: 'Kim',
    rating: 5,
    text: "Marissa is amazing!!!! She is so nice, walks you through everything, the products to use, she is so patient and kind and you can tell she really loves what she is doing. My son got a curl transformation and she helped us know what we need to keep this look long term and how to care for his hair and so much more. If I could give her 10 stars I would. I definitely recommend her!!!!!",
    serviceTag: 'Curl Transformation & Care',
    target: { categoryId: 'silk-press', styleId: 'curl-transformation', variationId: 'curl-def' },
  },
  {
    name: 'Joel Shungu',
    rating: 5,
    text: "Marissa was incredible. She creates a space for you to be comfortable. You're not just getting your hair done, you're getting an experience.\n\n10/10 recommend!",
    serviceTag: 'Knotless Box Braids',
    target: { categoryId: 'braids', styleId: 'knotless', variationId: 'knotless-smedium' },
  },
  {
    name: 'Benay Tatom',
    rating: 5,
    text: "Had a great time! Scalp Treatment was a 10/10",
    serviceTag: 'Scalp Detox Treatment',
    target: { categoryId: 'maintenance', styleId: 'wash-treat', variationId: 'scalp-treatment' },
  },
  {
    name: 'Ashley',
    rating: 5,
    text: "Marissa is the best!! Loved her!!! Best decision, trusting her with my curls!! 💖",
    serviceTag: 'Curl Definition & Hydration',
    target: { categoryId: 'silk-press', styleId: 'curl-transformation', variationId: 'curl-def' },
  },
  {
    name: 'Nikieta',
    rating: 5,
    text: "Highly recommend Marissa is amazing and it's easy to see she cares about her clients and the work she does.",
    serviceTag: 'Straight Back Cornrows',
    target: { categoryId: 'braids', styleId: 'straight-back', variationId: 'sb-6' },
  },
  {
    name: 'Azan',
    rating: 5,
    text: "Loved the full experience as a first timer! Clean studio, super gentle hands, and flawless results.",
    serviceTag: 'Knotless Braids',
    target: { categoryId: 'braids', styleId: 'knotless', variationId: 'knotless-medium' },
  },
  {
    name: 'Josh',
    rating: 5,
    text: "Great service and product! Clean lines, painless braiding, and great conversation.",
    serviceTag: "Men's Box Braids / Twists",
    target: { categoryId: 'maintenance', styleId: 'mens-braids', variationId: 'mens-box' },
  },
  {
    name: 'Vianey Campos',
    rating: 5,
    text: "I really loved and enjoy her job! The best braiding specialist in the valley.",
    serviceTag: 'Boho Knotless Braids',
    target: { categoryId: 'braids', styleId: 'boho', variationId: 'boho-s-mid' },
  },
];

/* ── Stars Component ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 text-[#d4a745] fill-[#d4a745]"
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   REVIEWS CAROUSEL WITH SERVICE DEEP-LINKS
   ════════════════════════════════════════════ */

interface ReviewsSectionProps {
  onSelectService?: (target: ServiceTargetSelection) => void;
}

export function ReviewsSection({ onSelectService }: ReviewsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Intersection observer for scroll-reveal
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

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(((index % reviews.length) + reviews.length) % reviews.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance every 6.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const review = reviews[current];

  // Get initials for the avatar
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleBookThisStyle = (target: ServiceTargetSelection) => {
    if (onSelectService) {
      onSelectService(target);
    }
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Slide variants
  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#ece7e1] relative overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#d2c7ba] rounded-full opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#e5dfd6] rounded-full opacity-25 blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-14">
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
            CLIENT LOVE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[11px] uppercase tracking-[0.3em] text-[#8c7768] font-medium"
          >
            Real reviews from real clients
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Review card */}
          <div className="bg-white/70 backdrop-blur-md border border-[#e5dfd6] rounded-3xl p-7 sm:p-10 lg:p-12 min-h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
            {/* Decorative quotes */}
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#e5dfd6] rotate-180 opacity-60 pointer-events-none" />
            <Quote className="absolute bottom-6 right-6 w-10 h-10 text-[#e5dfd6] opacity-60 pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center w-full"
              >
                {/* Top service badge & rating */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                  <Stars count={review.rating} />
                  <button
                    onClick={() => handleBookThisStyle(review.target)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8c7768]/15 hover:bg-[#8c7768] text-[#8c7768] hover:text-white rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all group active:scale-95"
                    title={`Click to view & book ${review.serviceTag}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Style: {review.serviceTag}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Review text */}
                <p className="mt-2 mb-8 text-base sm:text-lg text-[#332f2c] leading-relaxed font-light max-w-2xl whitespace-pre-line">
                  "{review.text}"
                </p>

                {/* Reviewer info + Action CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md pt-4 border-t border-[#e5dfd6]/70 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8c7768] flex items-center justify-center text-white text-xs font-semibold tracking-wider">
                      {initials}
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-[#332f2c] tracking-wide">
                        {review.name}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-[#8c7768] font-medium">
                        Verified Client
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookThisStyle(review.target)}
                    className="px-4 py-2 bg-[#332f2c] hover:bg-[#8c7768] text-[#f5efe9] text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Book This Look</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-[#d2c7ba] flex items-center justify-center text-[#8c7768] hover:bg-[#8c7768] hover:text-white hover:border-[#8c7768] transition-all duration-300 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`rounded-full transition-all duration-400 ${
                    i === current
                      ? 'w-6 h-2 bg-[#8c7768]'
                      : 'w-2 h-2 bg-[#d2c7ba] hover:bg-[#b9ada2]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-[#d2c7ba] flex items-center justify-center text-[#8c7768] hover:bg-[#8c7768] hover:text-white hover:border-[#8c7768] transition-all duration-300 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Review counter */}
          <p className="text-center mt-4 text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium">
            {current + 1} of {reviews.length} reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
