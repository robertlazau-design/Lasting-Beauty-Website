import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface StickyBookingBarProps {
  onOpenBooking?: () => void;
}

export function StickyBookingBar({ onOpenBooking }: StickyBookingBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const servicesSection = document.getElementById('services');
      
      // Determine if services section is currently in view
      let inServicesView = false;
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        // If the services section takes up a significant portion of the screen
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          inServicesView = true;
        }
      }

      // Show if scrolled past hero (350px) AND not currently actively interacting with the matcher
      if (scrollY > 350 && !inServicesView) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md pointer-events-auto"
        >
          <div className="bg-[#2a2522]/95 backdrop-blur-md text-[#f5efe9] border border-[#8c7768]/60 shadow-[0_10px_35px_rgba(0,0,0,0.3)] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3">
            {/* Left label & status */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 relative" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wider uppercase truncate">
                  Accepting Appointments
                </p>
                <p className="text-[9px] text-[#c5bcb1] tracking-wide truncate">
                  Happy Valley, OR (Suite 109) • Ages 5+
                </p>
              </div>
            </div>

            {/* Right CTA */}
            <button
              onClick={handleClick}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#8c7768] hover:bg-[#a38e7d] text-white rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 shrink-0 group"
            >
              <span>Find Your Style</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
