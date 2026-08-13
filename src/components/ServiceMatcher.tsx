import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Clock, DollarSign, Sparkles, RotateCcw } from 'lucide-react';
import { services, ServiceCategory, ServiceStyle, ServiceVariation } from '../data';

export function ServiceMatcher() {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ServiceStyle | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ServiceVariation | null>(null);

  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSelectStyle = (style: ServiceStyle) => {
    setSelectedStyle(style);
    setStep(3);
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
      setSelectedVariation(null);
      setStep(3);
    }
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setSelectedStyle(null);
    setSelectedVariation(null);
    setStep(1);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-sm rounded-3xl border border-[#e5dfd6] shadow-[0_8px_60px_rgba(140,119,104,0.08)] overflow-hidden">
      {/* Module header banner */}
      <div className="bg-[#d2c7ba] text-[#332f2c] text-xs py-3 px-6 text-center flex items-center justify-center gap-2 border-b border-[#c4b6a6]">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span className="uppercase tracking-[0.1em] font-medium text-[10px]">All styling includes wash, blow-dry & prep</span>
      </div>

      {/* Module content */}
      <div className="px-6 sm:px-8 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                s <= step
                  ? 'w-8 bg-[#8c7768]'
                  : 'w-4 bg-[#e5dfd6]'
              }`}
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="h-8 mb-2">
          <AnimatePresence>
            {step > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={handleBack}
                className="flex items-center text-[#8c7768] text-xs font-medium tracking-wide hover:text-[#332f2c] transition-colors uppercase"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="min-h-[320px] relative">
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
                <h3 className="text-xl font-serif text-[#332f2c] mb-1">What are you looking for today?</h3>
                <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-5">Step 1 of 4 · Choose a category</p>
                <div className="flex flex-col gap-3">
                  {services.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleSelectCategory(category)}
                      className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.1)] text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-300 group active:scale-[0.98]"
                    >
                      <span className="font-serif text-lg text-[#332f2c]">{category.name}</span>
                      <ChevronRight className="w-5 h-5 text-[#c5bcb1] group-hover:text-[#8c7768] transition-colors" />
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
                <h3 className="text-xl font-serif text-[#332f2c] mb-1">Select a Style</h3>
                <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-5">{selectedCategory.name}</p>
                <div className="flex flex-col gap-3">
                  {selectedCategory.styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleSelectStyle(style)}
                      className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.1)] text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-300 group active:scale-[0.98]"
                    >
                      <span className="font-serif text-lg text-[#332f2c]">{style.name}</span>
                      <ChevronRight className="w-5 h-5 text-[#c5bcb1] group-hover:text-[#8c7768] transition-colors" />
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
                <h3 className="text-xl font-serif text-[#332f2c] mb-1">Choose Your Look</h3>
                <p className="text-[10px] text-[#8c7768] uppercase tracking-[0.2em] font-medium mb-5">{selectedStyle.name}</p>
                <div className="flex flex-col gap-3">
                  {selectedStyle.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => handleSelectVariation(variation)}
                      className="w-full bg-white hover:bg-[#fcfbf9] border border-[#e5dfd6] hover:border-[#8c7768] hover:shadow-[0_4px_20px_rgba(140,119,104,0.1)] text-left p-4 rounded-2xl flex flex-col transition-all duration-300 relative overflow-hidden group active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-serif text-lg text-[#332f2c]">{variation.name}</span>
                        <ChevronRight className="w-5 h-5 text-[#c5bcb1] group-hover:text-[#8c7768] transition-colors" />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#8c7768] font-medium mt-1">
                        <span className="flex items-center">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5" />
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

            {/* STEP 4: RESULT / HANDOFF */}
            {step === 4 && selectedVariation && selectedStyle && selectedCategory && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-[#f5efe9] to-[#ece7e1] p-8 w-full rounded-[2rem] border border-[#e5dfd6] shadow-xl text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d2c7ba] rounded-full opacity-30 blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#e5dfd6] rounded-full opacity-30 blur-3xl"></div>
                  
                  <h3 className="text-2xl font-serif text-[#332f2c] mb-2 relative z-10">{selectedVariation.name}</h3>
                  <p className="text-[#8c7768] mb-8 font-medium relative z-10 text-[10px] uppercase tracking-widest">
                    {selectedStyle.name} • {selectedCategory.name}
                  </p>

                  <div className="flex justify-center gap-8 mb-10 relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-full mb-3 shadow-sm border border-[#e5dfd6]">
                        <DollarSign className="w-6 h-6 text-[#8c7768]" />
                      </div>
                      <span className="text-[10px] text-[#6d6259] uppercase tracking-widest font-medium mb-1">Starting Price</span>
                      <span className="font-serif text-2xl text-[#332f2c]">${selectedVariation.price}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-full mb-3 shadow-sm border border-[#e5dfd6]">
                        <Clock className="w-6 h-6 text-[#a3968e]" />
                      </div>
                      <span className="text-[10px] text-[#6d6259] uppercase tracking-widest font-medium mb-1">Est. Duration</span>
                      <span className="font-serif text-2xl text-[#332f2c]">{selectedVariation.duration}</span>
                    </div>
                  </div>

                  <a
                    href={selectedVariation.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#8c7768] text-white font-medium tracking-[0.2em] text-xs py-5 rounded-full hover:bg-[#726155] transition-all shadow-md hover:shadow-[0_4px_15px_rgba(140,119,104,0.3)] active:scale-95 duration-200 relative z-10 uppercase"
                  >
                    Book Now on GlossGenius
                  </a>
                </div>
                
                <button 
                  onClick={handleRestart}
                  className="mt-6 flex items-center gap-2 text-[#8c7768] hover:text-[#332f2c] font-medium text-xs tracking-widest uppercase transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
