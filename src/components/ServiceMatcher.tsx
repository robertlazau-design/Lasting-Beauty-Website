import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Clock, DollarSign, Sparkles, RotateCcw, Copy, Check, ShieldCheck, MapPin, MessageSquare, Info } from 'lucide-react';
import { services, ServiceCategory, ServiceStyle, ServiceVariation } from '../data';
import { BookingModal } from './BookingModal';

export interface ServiceTargetSelection {
  categoryId: string;
  styleId?: string;
  variationId?: string;
}

interface ServiceMatcherProps {
  targetSelection?: ServiceTargetSelection | null;
  onClearTargetSelection?: () => void;
}

export function ServiceMatcher({ targetSelection, onClearTargetSelection }: ServiceMatcherProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ServiceStyle | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ServiceVariation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle external selection (e.g. from Reviews section)
  useEffect(() => {
    if (!targetSelection) return;

    const cat = services.find((c) => c.id === targetSelection.categoryId);
    if (cat) {
      setSelectedCategory(cat);
      if (targetSelection.styleId) {
        const sty = cat.styles.find((s) => s.id === targetSelection.styleId);
        if (sty) {
          setSelectedStyle(sty);
          if (targetSelection.variationId) {
            const varObj = sty.variations.find((v) => v.id === targetSelection.variationId);
            if (varObj) {
              setSelectedVariation(varObj);
              setStep(4);
            } else {
              setSelectedVariation(sty.variations[0] || null);
              setStep(4);
            }
          } else {
            // Default to first variation or step 3
            if (sty.variations.length === 1) {
              setSelectedVariation(sty.variations[0]);
              setStep(4);
            } else {
              setSelectedVariation(null);
              setStep(3);
            }
          }
        } else {
          setSelectedStyle(null);
          setSelectedVariation(null);
          setStep(2);
        }
      } else {
        setSelectedStyle(null);
        setSelectedVariation(null);
        setStep(2);
      }
    }
  }, [targetSelection]);

  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setSelectedStyle(null);
    setSelectedVariation(null);
    setStep(2);
  };

  const handleSelectStyle = (style: ServiceStyle) => {
    setSelectedStyle(style);
    setSelectedVariation(null);
    // If only one variation exists, auto-advance to step 4
    if (style.variations.length === 1) {
      setSelectedVariation(style.variations[0]);
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const handleSelectVariation = (variation: ServiceVariation) => {
    setSelectedVariation(variation);
    setStep(4);
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedCategory(null);
      setStep(1);
    } else if (step === 3) {
      setSelectedStyle(null);
      setStep(2);
    } else if (step === 4) {
      if (selectedStyle && selectedStyle.variations.length === 1) {
        setSelectedStyle(null);
        setSelectedVariation(null);
        setStep(2);
      } else {
        setSelectedVariation(null);
        setStep(3);
      }
    }
    if (onClearTargetSelection) onClearTargetSelection();
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setSelectedStyle(null);
    setSelectedVariation(null);
    setStep(1);
    if (onClearTargetSelection) onClearTargetSelection();
  };

  const handleBookNow = () => {
    setModalOpen(true);
  };

  const handleCopyLink = async () => {
    if (!selectedVariation) return;
    try {
      await navigator.clipboard.writeText(selectedVariation.bookingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = selectedVariation.bookingUrl;
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

  return (
    <>
      <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-[#e5dfd6] shadow-[0_8px_60px_rgba(140,119,104,0.1)] overflow-hidden">
        {/* Module header banner */}
        <div className="bg-[#d2c7ba] text-[#332f2c] text-xs py-3 px-6 text-center flex items-center justify-center gap-2 border-b border-[#c4b6a6]">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#8c7768]" />
          <span className="uppercase tracking-[0.12em] font-semibold text-[10px]">
            All styling includes shampoo, deep condition & prep
          </span>
        </div>

        {/* Module content */}
        <div className="px-6 sm:px-8 py-8">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s <= step ? 'w-10 bg-[#8c7768]' : 'w-4 bg-[#e5dfd6]'
                }`}
              />
            ))}
          </div>

          {/* Back Button */}
          <div className="h-8 mb-2 flex items-center justify-between">
            <AnimatePresence>
              {step > 1 ? (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={handleBack}
                  className="flex items-center text-[#8c7768] hover:text-[#332f2c] text-xs font-semibold tracking-wider transition-colors uppercase"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </motion.button>
              ) : (
                <div />
              )}
            </AnimatePresence>

            {step > 1 && (
              <button
                onClick={handleRestart}
                className="text-[10px] text-[#a3968e] hover:text-[#332f2c] uppercase tracking-wider transition-colors font-medium"
              >
                Start Over
              </button>
            )}
          </div>

          <div className="min-h-[340px] relative">
            <AnimatePresence mode="wait">
              {/* STEP 1: CATEGORY */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-[#332f2c] mb-1">What are you looking for today?</h3>
                  <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-6">
                    Step 1 of 4 · Choose a category
                  </p>
                  <div className="flex flex-col gap-3">
                    {services.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleSelectCategory(category)}
                        className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.12)] text-left p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-300 group active:scale-[0.99]"
                      >
                        <div>
                          <span className="font-serif text-lg sm:text-xl text-[#332f2c] block group-hover:text-[#8c7768] transition-colors">
                            {category.name}
                          </span>
                          <span className="text-[10px] text-[#a3968e] uppercase tracking-wider font-medium">
                            {category.styles.length} style options
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#f5efe9] group-hover:bg-[#8c7768] group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4 text-[#8c7768] group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: STYLE */}
              {step === 2 && selectedCategory && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-[#332f2c] mb-1">Select a Style</h3>
                  <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-6">
                    {selectedCategory.name} · Step 2 of 4
                  </p>
                  <div className="flex flex-col gap-3">
                    {selectedCategory.styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleSelectStyle(style)}
                        className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.12)] text-left p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-300 group active:scale-[0.99]"
                      >
                        <div>
                          <span className="font-serif text-lg sm:text-xl text-[#332f2c] block group-hover:text-[#8c7768] transition-colors">
                            {style.name}
                          </span>
                          <span className="text-[10px] text-[#a3968e] uppercase tracking-wider font-medium">
                            {style.variations.length > 1
                              ? `Starting at $${Math.min(...style.variations.map((v) => v.price))}`
                              : `$${style.variations[0]?.price} · ${style.variations[0]?.duration}`}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#f5efe9] group-hover:bg-[#8c7768] group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4 text-[#8c7768] group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: VARIATION */}
              {step === 3 && selectedStyle && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-[#332f2c] mb-1">Choose Your Look</h3>
                  <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-6">
                    {selectedStyle.name} · Step 3 of 4
                  </p>
                  <div className="flex flex-col gap-3">
                    {selectedStyle.variations.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => handleSelectVariation(variation)}
                        className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.12)] text-left p-4 sm:p-5 rounded-2xl flex flex-col transition-all duration-300 relative overflow-hidden group active:scale-[0.99]"
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-serif text-lg text-[#332f2c] group-hover:text-[#8c7768] transition-colors">
                            {variation.name}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#c5bcb1] group-hover:text-[#8c7768] transition-colors" />
                        </div>
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-[#8c7768] font-medium mt-1">
                          <span className="flex items-center font-semibold text-[#332f2c]">
                            <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#8c7768]" />
                            {variation.price}
                          </span>
                          <span className="flex items-center text-[#a3968e]">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {variation.duration}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: RESULT / PRE-BOOKING CONFIRMATION */}
              {step === 4 && selectedVariation && selectedStyle && selectedCategory && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-[#fcfbf9] to-[#f5efe9] p-6 sm:p-8 w-full rounded-[2rem] border border-[#e5dfd6] shadow-xl text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d2c7ba] rounded-full opacity-30 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#e5dfd6] rounded-full opacity-30 blur-3xl pointer-events-none" />

                    <span className="inline-block bg-[#8c7768]/15 text-[#8c7768] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-semibold mb-2">
                      Ready to Book
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#332f2c] mb-1 relative z-10">
                      {selectedVariation.name}
                    </h3>
                    <p className="text-[#8c7768] mb-6 font-medium relative z-10 text-[10px] uppercase tracking-widest">
                      {selectedStyle.name} • {selectedCategory.name}
                    </p>

                    {/* Price & Duration Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#e5dfd6]/80 flex flex-col items-center shadow-sm">
                        <div className="bg-[#f5efe9] p-2.5 rounded-full mb-2 border border-[#e5dfd6]">
                          <DollarSign className="w-5 h-5 text-[#8c7768]" />
                        </div>
                        <span className="text-[9px] text-[#8c7768] uppercase tracking-widest font-semibold mb-0.5">
                          Total Price
                        </span>
                        <span className="font-serif text-2xl text-[#332f2c] font-medium">
                          ${selectedVariation.price}
                        </span>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#e5dfd6]/80 flex flex-col items-center shadow-sm">
                        <div className="bg-[#f5efe9] p-2.5 rounded-full mb-2 border border-[#e5dfd6]">
                          <Clock className="w-5 h-5 text-[#8c7768]" />
                        </div>
                        <span className="text-[9px] text-[#8c7768] uppercase tracking-widest font-semibold mb-0.5">
                          Est. Duration
                        </span>
                        <span className="font-serif text-2xl text-[#332f2c] font-medium">
                          {selectedVariation.duration}
                        </span>
                      </div>
                    </div>

                    {/* Pre-Booking "No Surprises" Checklist */}
                    <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-[#e5dfd6] text-left mb-6 relative z-10 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-3 text-[#332f2c] font-serif text-sm font-semibold">
                        <ShieldCheck className="w-4 h-4 text-[#8c7768]" />
                        <span>Before You Book — Important Details</span>
                      </div>
                      <div className="space-y-2.5 text-xs text-[#6d6259]">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                          <p>
                            <strong className="text-[#332f2c] font-semibold">$25 Non-Refundable Deposit:</strong> Required at checkout to secure your slot (applied to your balance).
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                          <p>
                            <strong className="text-[#332f2c] font-semibold">Wash & Prep Included:</strong> Complimentary shampoo, deep condition, blow-dry & detangle.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                          <p>
                            <strong className="text-[#332f2c] font-semibold">4-Inch Length Rule:</strong> Natural hair must be at least 4" long all around.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8c7768] mt-1.5 shrink-0" />
                          <p>
                            <strong className="text-[#332f2c] font-semibold">Studio Location:</strong> 12930 SE 162nd Ave., Suite 109, Happy Valley, OR 97086.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Primary CTA — opens inline modal */}
                    <button
                      onClick={handleBookNow}
                      className="block w-full bg-[#8c7768] text-white font-medium tracking-[0.2em] text-xs py-4 sm:py-5 rounded-full hover:bg-[#726155] transition-all shadow-md hover:shadow-[0_4px_20px_rgba(140,119,104,0.35)] active:scale-95 duration-200 relative z-10 uppercase cursor-pointer"
                    >
                      Book Now on GlossGenius
                    </button>

                    {/* Secondary Actions: Copy link & Consultation */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] text-[#8c7768] uppercase tracking-[0.15em] font-semibold relative z-10">
                      <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 hover:text-[#332f2c] transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Booking Link</span>
                          </>
                        )}
                      </button>

                      <span className="hidden sm:inline text-[#d2c7ba]">•</span>

                      <a
                        href="https://www.instagram.com/braids_by_lastingbeauty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#332f2c] transition-colors"
                        title="DM @braids_by_lastingbeauty on Instagram"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Questions? DM @braids_by_lastingbeauty</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedVariation && (
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          bookingUrl={selectedVariation.bookingUrl}
          serviceName={selectedVariation.name}
          price={selectedVariation.price}
          duration={selectedVariation.duration}
        />
      )}
    </>
  );
}
