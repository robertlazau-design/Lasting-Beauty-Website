import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceMatcher } from './components/ServiceMatcher';
import { InfoSection } from './components/InfoSection';
import { WhySection } from './components/WhySection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5efe9]">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-[#f5efe9] relative">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#d2c7ba] rounded-full opacity-15 blur-[100px]" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#e5dfd6] rounded-full opacity-20 blur-[120px]" />

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
          <ServiceMatcher />
        </div>
      </section>

      {/* Info Section — Requirements, FAQ, Hours, Cancellation */}
      <InfoSection />

      {/* Why Section */}
      <WhySection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
