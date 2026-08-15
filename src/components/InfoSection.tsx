import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Clock, MapPin, AlertCircle, HelpCircle, FileText, CheckCircle, ExternalLink } from 'lucide-react';

/* ── Accordion Item ── */
function AccordionItem({
  title,
  icon: Icon,
  children,
  isOpen,
  onToggle,
  delay = 0,
  isVisible,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white/60 backdrop-blur-sm border border-[#e5dfd6] rounded-2xl overflow-hidden hover:border-[#c5bcb1] transition-colors duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f5efe9] rounded-full flex items-center justify-center border border-[#e5dfd6] group-hover:bg-[#8c7768] group-hover:border-[#8c7768] transition-all duration-400 shrink-0">
            <Icon className="w-4.5 h-4.5 text-[#8c7768] group-hover:text-white transition-colors duration-400" />
          </div>
          <span className="font-serif text-lg sm:text-xl text-[#332f2c] tracking-wide">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-[#8c7768]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
              <div className="h-[1px] bg-[#e5dfd6] mb-6" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── FAQ Sub-Item ── */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#e5dfd6]/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-[#332f2c] pr-4 leading-relaxed">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-[#c5bcb1] group-hover:text-[#8c7768] transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-[#6d6259] leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Policy Bullet ── */
function PolicyBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#6d6259] leading-relaxed font-light">
      <span className="w-1.5 h-1.5 rounded-full bg-[#c5bcb1] shrink-0 mt-2" />
      <span>{children}</span>
    </li>
  );
}

/* ── Requirement Bullet ── */
function RequirementBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#6d6259] leading-relaxed font-light">
      <CheckCircle className="w-4 h-4 text-[#8c7768] shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

/* ── Business Hours Data ── */
const businessHours = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: 'Closed' },
  { day: 'Wednesday', hours: 'Closed' },
  { day: 'Thursday', hours: '11 AM – 6 PM' },
  { day: 'Friday', hours: '8 AM – 6 PM' },
  { day: 'Saturday', hours: '9 AM – 4 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

/* ── FAQ Data ── */
const faqItems = [
  {
    question: 'Do you offer box braids / knotless?',
    answer: (
      <>
        No, I recommend my knotless braider{' '}
        <span className="font-medium text-[#8c7768]">@braidsbyberry</span>. You
        can find her on Instagram or TikTok.
      </>
    ),
  },
  {
    question: 'Do you braid kids hair?',
    answer: 'Yes, ages 5 and up.',
  },
  {
    question: 'Is there specific pricing for kids?',
    answer: 'No, all prices are the same for kids and adults.',
  },
  {
    question: 'Do you braid straight hair?',
    answer: 'Yes, all hair types are welcome.',
  },
  {
    question: 'Do you offer cuts / curly cuts?',
    answer: 'Not currently — will be offering in early 2027.',
  },
  {
    question: 'Do you offer locs, sew-ins, or wig installs?',
    answer: (
      <>
        No, I recommend checking out{' '}
        <span className="font-medium text-[#8c7768]">@hairhaven</span>. You can
        find the salon on Instagram and TikTok.
      </>
    ),
  },
  {
    question: 'Do you color hair?',
    answer: (
      <>
        No, I recommend checking out{' '}
        <span className="font-medium text-[#8c7768]">@thehaircollective</span>.
        There are many stylists there that do. You can find them on Instagram.
      </>
    ),
  },
  {
    question: 'Is hair included in your extended length services?',
    answer: 'Yes, only synthetic hair — not human hair.',
  },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

export function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePanel = (panel: string) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
    if (panel !== 'faq') setOpenFaq(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section
      id="info-section"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#f5efe9] relative overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-[#d2c7ba] rounded-full opacity-15 blur-[100px]" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#e5dfd6] rounded-full opacity-20 blur-[120px]" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-12">
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
            GOOD TO KNOW
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[11px] uppercase tracking-[0.3em] text-[#8c7768] font-medium max-w-md mx-auto"
          >
            Everything you need before booking your appointment
          </motion.p>
        </div>

        {/* Accordion panels */}
        <div className="flex flex-col gap-4">
          {/* ── Requirements ── */}
          <AccordionItem
            title="Before Your Visit"
            icon={AlertCircle}
            isOpen={openPanel === 'requirements'}
            onToggle={() => togglePanel('requirements')}
            delay={0.3}
            isVisible={isVisible}
          >
            <ul className="flex flex-col gap-4">
              <RequirementBullet>
                Hair must be <span className="font-medium text-[#332f2c]">4 inches or longer</span> for braiding services.
              </RequirementBullet>
              <RequirementBullet>
                Please <span className="font-medium text-[#332f2c]">do not bring children</span> to the salon unless they have a scheduled appointment and are receiving the service.
              </RequirementBullet>
              <RequirementBullet>
                All appointments include prep work — wash, blow dry, and detangle. If your hair is matted or knotted, you'll need to book a{' '}
                <span className="font-medium text-[#332f2c]">detangle consultation</span> as a separate appointment.
              </RequirementBullet>
              <RequirementBullet>
                Please come with your hair <span className="font-medium text-[#332f2c]">mostly detangled</span>. 15 minutes of detangling is included in the service. If it takes longer, it becomes a separate detangle appointment. Arriving with severely tangled hair will require rescheduling with a 50% charge.
              </RequirementBullet>
              <RequirementBullet>
                Arrive with your hair in its <span className="font-medium text-[#332f2c]">natural state</span> — down, bun, ponytail, or 3-strand braid. No other styles (cornrows, twists, singles, etc.).
              </RequirementBullet>
              <RequirementBullet>
                If you struggle with severe scalp build-up, please book a{' '}
                <span className="font-medium text-[#332f2c]">deep wash</span> to ensure a clean scalp and quality results.
              </RequirementBullet>
              <RequirementBullet>
                Please complete the <span className="font-medium text-[#332f2c]">form + waiver</span> after booking. All appointments remain pending until the form is reviewed and accepted.
              </RequirementBullet>
            </ul>
          </AccordionItem>

          {/* ── FAQ ── */}
          <AccordionItem
            title="Frequently Asked"
            icon={HelpCircle}
            isOpen={openPanel === 'faq'}
            onToggle={() => togglePanel('faq')}
            delay={0.4}
            isVisible={isVisible}
          >
            <div className="flex flex-col">
              {faqItems.map((item, i) => (
                <FaqItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaq === i}
                  onToggle={() => toggleFaq(i)}
                />
              ))}
            </div>
          </AccordionItem>

          {/* ── Business Hours (always-visible card) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/60 backdrop-blur-sm border border-[#e5dfd6] rounded-2xl px-6 sm:px-8 py-6 sm:py-7"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#e5dfd6]/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f5efe9] rounded-full flex items-center justify-center border border-[#e5dfd6] shrink-0">
                  <Clock className="w-4.5 h-4.5 text-[#8c7768]" />
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-xl text-[#332f2c] tracking-wide block">
                    Hours & Location
                  </span>
                  <div className="flex items-start gap-1 text-xs text-[#8c7768] font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>12930 SE 162nd Ave., Suite 109, Happy Valley, OR 97086</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=12930+SE+162nd+Ave%2C+Suite+109%2C+Happy+Valley%2C+OR+97086"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#8c7768] hover:bg-[#726155] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm active:scale-95 shrink-0 self-start sm:self-auto"
                title="Open in Google Maps"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-0">
              {businessHours.map((item) => {
                const isToday = item.day === today;
                const isClosed = item.hours === 'Closed';
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2.5 border-b border-[#e5dfd6]/50 last:border-b-0 ${
                      isToday ? 'bg-[#f5efe9]/80 -mx-3 px-3 rounded-lg' : ''
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isToday
                          ? 'font-semibold text-[#332f2c]'
                          : 'font-light text-[#6d6259]'
                      }`}
                    >
                      {item.day}
                      {isToday && (
                        <span className="ml-2 text-[9px] uppercase tracking-widest text-[#8c7768] font-semibold bg-[#8c7768]/10 px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        isClosed
                          ? 'text-[#c5bcb1] font-light'
                          : isToday
                          ? 'font-semibold text-[#332f2c]'
                          : 'font-medium text-[#6d6259]'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Cancellation Policy ── */}
          <AccordionItem
            title="Cancellation Policy"
            icon={FileText}
            isOpen={openPanel === 'cancellation'}
            onToggle={() => togglePanel('cancellation')}
            delay={0.6}
            isVisible={isVisible}
          >
            <ul className="flex flex-col gap-4">
              <PolicyBullet>
                Cards are stored on file and charged after the appointment is completed. <span className="font-medium text-[#332f2c]">Cash is accepted too.</span>
              </PolicyBullet>
              <PolicyBullet>
                A <span className="font-medium text-[#332f2c]">24-hour notice</span> is required when cancelling, otherwise a 50% charge applies.
              </PolicyBullet>
              <PolicyBullet>
                If you reschedule within the 24-hour mark, you will not be charged. The reschedule limit is{' '}
                <span className="font-medium text-[#332f2c]">1 time per appointment</span> before being charged.
              </PolicyBullet>
              <PolicyBullet>
                Deposits are <span className="font-medium text-[#332f2c]">non-refundable</span> unless the stylist has to cancel on you.
              </PolicyBullet>
              <PolicyBullet>
                Appointments remain pending until the deposit and form are completed. If not completed within{' '}
                <span className="font-medium text-[#332f2c]">3 hours</span>, the appointment is cancelled.
              </PolicyBullet>
              <PolicyBullet>
                <span className="font-medium text-[#332f2c]">No-show</span> appointments result in a 100% charge of the service.
              </PolicyBullet>
              <PolicyBullet>
                There is a <span className="font-medium text-[#332f2c]">10-minute grace period</span>. After 10 minutes, a $10 late fee applies. After 20 minutes, the appointment is cancelled with a 100% charge — unless you communicate and reschedule.
              </PolicyBullet>
              <PolicyBullet>
                Please arrive with prepped hair as described in the requirements. If detangling exceeds 15 minutes, the appointment will be rescheduled with a 50% charge.
              </PolicyBullet>
            </ul>
          </AccordionItem>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10 text-xs text-[#8c7768] tracking-wide font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <span>Questions? Reach out before booking — I'm happy to help ✨</span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/braids_by_lastingbeauty/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#332f2c] underline decoration-[#8c7768] hover:text-[#8c7768] transition-colors"
            >
              DM on Instagram
            </a>
            <span>•</span>
            <a
              href="https://www.tiktok.com/@braids_by_lastingbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#332f2c] underline decoration-[#8c7768] hover:text-[#8c7768] transition-colors"
            >
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
