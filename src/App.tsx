import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InAppBrowserBanner } from './components/InAppBrowserBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceMatcher, ServiceTargetSelection } from './components/ServiceMatcher';
import { InfoSection } from './components/InfoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhySection } from './components/WhySection';
import { Footer } from './components/Footer';
import { StickyBookingBar } from './components/StickyBookingBar';

import { services } from './data';

export default function App() {
  const [targetSelection, setTargetSelection] = useState<ServiceTargetSelection | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /* Handle query parameters (?service=..., ?category=..., ?style=..., ?scrollTo=services) */
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const categoryParam = searchParams.get('category');
    const styleParam = searchParams.get('style');
    const variationParam = searchParams.get('variation');
    const scrollTarget = searchParams.get('scrollTo');

    let matchedTarget: ServiceTargetSelection | null = null;

    if (serviceParam) {
      // Find matching variation ID across all categories and styles
      for (const cat of services) {
        for (const sty of cat.styles) {
          const foundVar = sty.variations.find((v) => v.id === serviceParam);
          if (foundVar) {
            matchedTarget = { categoryId: cat.id, styleId: sty.id, variationId: foundVar.id };
            break;
          }
        }
        if (matchedTarget) break;
      }

      // If not found by variation ID, check if it matches a style ID
      if (!matchedTarget) {
        for (const cat of services) {
          const foundSty = cat.styles.find((s) => s.id === serviceParam);
          if (foundSty) {
            matchedTarget = { categoryId: cat.id, styleId: foundSty.id, variationId: foundSty.variations[0]?.id };
            break;
          }
        }
      }
    } else if (categoryParam) {
      matchedTarget = {
        categoryId: categoryParam,
        styleId: styleParam || undefined,
        variationId: variationParam || undefined,
      };
    }

    if (matchedTarget) {
      setTargetSelection(matchedTarget);
    }

    if (scrollTarget || matchedTarget) {
      const targetId = scrollTarget || 'services';
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setSearchParams({}, { replace: true });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  const handleSelectReviewService = (target: ServiceTargetSelection) => {
    setTargetSelection(target);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe9] selection:bg-[#8c7768] selection:text-white">
      {/* Social media In-App Browser Detector Bar */}
      <InAppBrowserBanner />

      {/* Main Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section & Interactive Matcher */}
      <section id="services" className="py-20 lg:py-28 bg-[#f5efe9] relative">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#d2c7ba] rounded-full opacity-15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#e5dfd6] rounded-full opacity-20 blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {/* Section heading */}
          <div className="text-center mb-12">
            <div className="w-16 h-[1px] bg-[#8c7768] mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#332f2c] tracking-[0.06em] mb-3">
              FIND YOUR STYLE
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c7768] font-medium max-w-md mx-auto">
              Choose your service, pick your look, and book directly through GlossGenius
            </p>
          </div>

          {/* Service Matcher Module */}
          <ServiceMatcher
            targetSelection={targetSelection}
            onClearTargetSelection={() => setTargetSelection(null)}
          />
        </div>
      </section>

      {/* Info Section — Requirements, FAQ, Hours, Cancellation */}
      <InfoSection />

      {/* Client Reviews Carousel with Deep-Linking */}
      <ReviewsSection onSelectService={handleSelectReviewService} />

      {/* Why Section */}
      <WhySection />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Floating Booking Bar */}
      <StickyBookingBar onOpenBooking={handleScrollToServices} />
    </div>
  );
}
