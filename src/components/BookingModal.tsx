import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check, DollarSign, Clock, ShieldCheck } from 'lucide-react';

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
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset states and set timeout fallback when modal opens
  useEffect(() => {
    if (isOpen) {
      setIframeError(false);
      setIframeLoading(true);
      setCopied(false);

      // Some browsers block iframe loads silently without triggering onError.
      // If still loading after 6s, allow user to directly click open.
      const timer = setTimeout(() => {
        setIframeLoading(false);
      }, 5500);

      return () => clearTimeout(timer);
    }
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

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoading(false);
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
            className="fixed inset-0 bg-[#2a2522]/65 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 z-[101] flex flex-col bg-[#fcfbf9] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#e5dfd6]"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e5dfd6] bg-white/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-[#8c7768] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold tracking-wider">LB</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base sm:text-lg text-[#332f2c] truncate">
                    {serviceName}
                  </h3>
                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-[#8c7768] uppercase tracking-[0.12em] font-medium">
                    <span>GlossGenius Secure Checkout</span>
                    {price && <span>• ${price}</span>}
                    {duration && <span>• {duration}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Copy link button */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-semibold text-[#8c7768] hover:text-[#332f2c] hover:bg-[#e5dfd6]/50 rounded-full transition-all duration-200"
                  title="Copy booking link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy Link</span>
                    </>
                  )}
                </button>

                {/* Open externally in browser button */}
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-semibold bg-[#8c7768] text-white hover:bg-[#726155] rounded-full transition-all duration-200 shadow-sm"
                  title="Open in browser"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in Browser</span>
                </a>

                {/* Close modal */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e5dfd6]/50 text-[#8c7768] hover:text-[#332f2c] transition-all duration-200"
                  aria-label="Close booking"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-header notice */}
            <div className="bg-[#f5efe9] px-4 py-2 text-[10px] sm:text-[11px] text-[#6d6259] border-b border-[#e5dfd6] flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8c7768]" />
                <span>$25 deposit applied to service • Wash, condition & prep included</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[#8c7768] font-medium shrink-0">
                Happy Valley, OR • Suite 109
              </span>
            </div>

            {/* Iframe View & Fallbacks */}
            <div className="flex-1 relative overflow-hidden bg-white">
              {/* Loading State */}
              {iframeLoading && !iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fcfbf9] z-10 p-6 text-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8c7768] animate-pulse" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c5bcb1] animate-pulse delay-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e5dfd6] animate-pulse delay-400" />
                  </div>
                  <p className="text-xs text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-3">
                    Connecting to GlossGenius...
                  </p>
                  <p className="text-xs text-[#a3968e] max-w-xs">
                    Taking longer than expected? You can open the booking page directly in your browser.
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-5 py-2 bg-[#8c7768] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#726155] transition-all"
                  >
                    Open Directly →
                  </a>
                </div>
              )}

              {/* Error / CSP blocked Fallback */}
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fcfbf9] p-8 text-center">
                  <div className="w-16 h-16 bg-[#ece7e1] rounded-full flex items-center justify-center mb-5 border border-[#e5dfd6]">
                    <ExternalLink className="w-7 h-7 text-[#8c7768]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#332f2c] mb-2">
                    Ready to Book {serviceName}!
                  </h3>
                  <p className="text-sm text-[#6d6259] font-light mb-8 max-w-md leading-relaxed">
                    Tap below to complete your booking securely on GlossGenius with 1-tap Apple Pay, Google Pay, or Card.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#8c7768] text-white font-medium tracking-[0.15em] text-xs py-4 rounded-full hover:bg-[#726155] transition-all shadow-md active:scale-95 uppercase"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open GlossGenius Booking
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e5dfd6] text-[#332f2c] font-medium tracking-[0.15em] text-xs py-4 rounded-full hover:border-[#8c7768] transition-all active:scale-95 uppercase"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Iframe */
                <iframe
                  ref={iframeRef}
                  src={bookingUrl}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={`Book ${serviceName} on GlossGenius`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-modals"
                  allow="payment"
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
