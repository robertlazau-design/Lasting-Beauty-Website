import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  Clock,
  ShieldCheck,
  Sparkles,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
  serviceName: string;
  price?: number;
  duration?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
  serviceName,
  price,
  duration,
}: BookingModalProps) {
  const [copied, setCopied] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHasOpened(false);
      setCopied(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = bookingUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenBooking = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    setHasOpened(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#2a2522]/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-lg bg-gradient-to-b from-[#fcfbf9] to-[#f5efe9] rounded-3xl shadow-2xl border border-[#e5dfd6] overflow-hidden">
              {/* Decorative blurs */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#d2c7ba] rounded-full opacity-25 blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#e5dfd6] rounded-full opacity-30 blur-[60px] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#e5dfd6] hover:bg-[#e5dfd6] text-[#8c7768] hover:text-[#332f2c] transition-all duration-200"
                aria-label="Close booking"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative z-10 px-6 sm:px-8 pt-8 pb-6 sm:pb-8">
                {/* Header badge */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8c7768]/12 rounded-full mb-4"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8c7768]" />
                    <span className="text-[10px] text-[#8c7768] uppercase tracking-[0.15em] font-semibold">
                      Secure Checkout via GlossGenius
                    </span>
                  </motion.div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#332f2c] tracking-wide mb-1">
                    {serviceName}
                  </h3>
                  <p className="text-[11px] text-[#8c7768] uppercase tracking-[0.2em] font-medium">
                    Lasting Beauty • Happy Valley, OR
                  </p>
                </div>

                {/* Price & Duration */}
                {(price || duration) && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {price && (
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#e5dfd6]/80 flex flex-col items-center shadow-sm">
                        <div className="bg-[#f5efe9] p-2 rounded-full mb-2 border border-[#e5dfd6]">
                          <DollarSign className="w-4 h-4 text-[#8c7768]" />
                        </div>
                        <span className="text-[9px] text-[#8c7768] uppercase tracking-widest font-semibold mb-0.5">
                          Total Price
                        </span>
                        <span className="font-serif text-xl text-[#332f2c] font-medium">
                          ${price}
                        </span>
                      </div>
                    )}
                    {duration && (
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#e5dfd6]/80 flex flex-col items-center shadow-sm">
                        <div className="bg-[#f5efe9] p-2 rounded-full mb-2 border border-[#e5dfd6]">
                          <Clock className="w-4 h-4 text-[#8c7768]" />
                        </div>
                        <span className="text-[9px] text-[#8c7768] uppercase tracking-widest font-semibold mb-0.5">
                          Est. Duration
                        </span>
                        <span className="font-serif text-xl text-[#332f2c] font-medium">
                          {duration}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* What's included */}
                <div className="bg-white/70 rounded-2xl p-4 border border-[#e5dfd6]/80 mb-6 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#8c7768]" />
                    <span className="text-xs font-semibold text-[#332f2c] font-serif">What's Included</span>
                  </div>
                  <div className="space-y-2 text-[12px] text-[#6d6259]">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                      <span>Complimentary shampoo, deep condition, blow-dry & detangle</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                      <span><strong className="text-[#332f2c]">$25 non-refundable deposit</strong> required at checkout (applied to your balance)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                      <span>Pick your preferred date & time on GlossGenius</span>
                    </div>
                  </div>
                </div>

                {/* Payment methods note */}
                <div className="flex items-center justify-center gap-3 mb-6 text-[10px] text-[#a3968e] uppercase tracking-wider font-medium">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Apple Pay • Google Pay • Card • Cash</span>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleOpenBooking}
                  className="block w-full bg-[#8c7768] text-white font-medium tracking-[0.2em] text-xs py-4 sm:py-5 rounded-full hover:bg-[#726155] transition-all shadow-lg hover:shadow-[0_4px_25px_rgba(140,119,104,0.4)] active:scale-[0.97] duration-200 uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{hasOpened ? 'Open GlossGenius Again' : 'Choose Date & Book'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Success state after opening */}
                <AnimatePresence>
                  {hasOpened && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center mt-3 text-[11px] text-emerald-700 font-medium tracking-wide"
                    >
                      ✓ GlossGenius opened in a new tab — complete your booking there
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Secondary actions */}
                <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[#8c7768] uppercase tracking-[0.12em] font-semibold">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 hover:text-[#332f2c] transition-colors py-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <span className="text-[#d2c7ba]">•</span>

                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#332f2c] transition-colors py-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Direct Link</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
