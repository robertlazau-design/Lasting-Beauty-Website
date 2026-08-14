import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Copy, Check, X, Sparkles } from 'lucide-react';

export function InAppBrowserBanner() {
  const [isInApp, setIsInApp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in this session
    const isDismissed = sessionStorage.getItem('lb_inapp_banner_dismissed') === 'true';
    if (isDismissed) return;

    // Detect common in-app browsers (TikTok, Instagram, Facebook, Snapchat, etc.)
    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const inAppPattern = /Instagram|TikTok|FBAN|FBAV|Snapchat|Twitter|Line|Kakaotalk|MicroMessenger/i;
    
    // Also allow testing with ?inapp=true in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('inapp') === 'true';

    if (testMode || inAppPattern.test(ua)) {
      setIsInApp(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('lb_inapp_banner_dismissed', 'true');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
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

  if (!isInApp || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] bg-[#2a2522] text-[#f5efe9] border-b border-[#8c7768]/40 shadow-xl px-4 py-2.5 sm:py-3"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs">
          {/* Left info & advice */}
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-6 h-6 rounded-full bg-[#8c7768]/40 border border-[#8c7768]/60 flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5 text-[#d2c7ba] animate-spin-slow" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-light text-[#ece7e1] leading-tight">
                <span className="font-semibold text-white tracking-wide">Browsing in Instagram or TikTok?</span>{' '}
                Tap <span className="inline-block bg-[#413b37] px-1.5 py-0.5 rounded text-[10px] font-mono text-white font-bold">•••</span> in the corner → <span className="underline decoration-[#8c7768] underline-offset-2 font-medium text-white">Open in Browser</span> for 1-tap Apple Pay & autofill.
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8c7768] hover:bg-[#726155] text-white rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-sm"
              title="Copy site link to open in Safari or Chrome"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#d2c7ba]" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleDismiss}
              className="p-1 rounded-full text-[#a3968e] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
