import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
  serviceName: string;
}

export function BookingModal({ isOpen, onClose, bookingUrl, serviceName }: BookingModalProps) {
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

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIframeError(false);
      setIframeLoading(true);
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / in-app browsers
      const textArea = document.createElement('textarea');
      textArea.value = bookingUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            className="fixed inset-0 bg-[#2a2522]/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-3 sm:inset-4 md:inset-6 lg:inset-10 z-[101] flex flex-col bg-[#f5efe9] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#e5dfd6]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e5dfd6] bg-white/60 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden sm:block w-8 h-8 bg-[#8c7768] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold tracking-wider">LB</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base sm:text-lg text-[#332f2c] truncate">
                    {serviceName}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-[#8c7768] uppercase tracking-[0.15em] font-medium truncate">
                    Booking on GlossGenius
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-semibold text-[#8c7768] hover:text-[#332f2c] hover:bg-[#e5dfd6]/50 rounded-full transition-all duration-300"
                  title="Copy booking link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy Link</span>
                    </>
                  )}
                </button>

                {/* Open externally */}
                <a
                  href={bookingUrl}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-semibold text-[#8c7768] hover:text-[#332f2c] hover:bg-[#e5dfd6]/50 rounded-full transition-all duration-300"
                  title="Open in browser"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in Browser</span>
                </a>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e5dfd6]/50 text-[#8c7768] hover:text-[#332f2c] transition-all duration-300"
                  aria-label="Close booking"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden">
              {/* Loading state */}
              {iframeLoading && !iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f5efe9] z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#8c7768] animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-[#c5bcb1] animate-pulse delay-200" />
                    <div className="w-2 h-2 rounded-full bg-[#e5dfd6] animate-pulse delay-400" />
                  </div>
                  <p className="text-xs text-[#8c7768] uppercase tracking-[0.2em] font-medium">
                    Loading booking page...
                  </p>
                </div>
              )}

              {/* Error / fallback state */}
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f5efe9] p-8 text-center">
                  <div className="w-16 h-16 bg-[#ece7e1] rounded-full flex items-center justify-center mb-6 border border-[#e5dfd6]">
                    <ExternalLink className="w-7 h-7 text-[#8c7768]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#332f2c] mb-2">
                    Almost There!
                  </h3>
                  <p className="text-sm text-[#6d6259] font-light mb-8 max-w-sm leading-relaxed">
                    The booking page works best when opened directly. Choose an option below to continue.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a
                      href={bookingUrl}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#8c7768] text-white font-medium tracking-[0.15em] text-xs py-4 rounded-full hover:bg-[#726155] transition-all shadow-md active:scale-95 duration-200 uppercase"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Booking
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e5dfd6] text-[#332f2c] font-medium tracking-[0.15em] text-xs py-4 rounded-full hover:border-[#8c7768] transition-all active:scale-95 duration-200 uppercase"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#8c7768]" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Link
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
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
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
