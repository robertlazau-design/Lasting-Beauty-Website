import { MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#2a2522] text-[#c5bcb1] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8c7768] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <span className="font-serif text-2xl tracking-[0.15em] text-[#f5efe9]">
                LASTING <span className="font-script text-3xl tracking-normal">Beauty</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#a3968e] font-light mb-4">
              Specializing in braids, protective styles, and deep conditioning treatments — serving ages 5 and up in Happy Valley, OR.
            </p>

            {/* Studio Address */}
            <div className="mb-6 flex items-start gap-2 text-xs text-[#d2c7ba] bg-[#38312d] p-3 rounded-xl border border-[#4a413b]">
              <MapPin className="w-4 h-4 text-[#8c7768] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">Studio Location</span>
                <span>12930 SE 162nd Ave., Suite 109</span>
                <span>Happy Valley, OR 97086</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=12930+SE+162nd+Ave%2C+Suite+109%2C+Happy+Valley%2C+OR+97086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-[#8c7768] hover:text-[#f5efe9] font-medium transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <a
                  href="https://www.tiktok.com/@braids_by_lastingbeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok @braids_by_lastingbeauty"
                  className="w-10 h-10 rounded-full border border-[#4a413b] flex items-center justify-center hover:border-[#8c7768] hover:bg-[#8c7768]/15 text-[#c5bcb1] hover:text-[#f5efe9] transition-all duration-300"
                  title="TikTok @braids_by_lastingbeauty"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/braids_by_lastingbeauty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @braids_by_lastingbeauty"
                  className="w-10 h-10 rounded-full border border-[#4a413b] flex items-center justify-center hover:border-[#8c7768] hover:bg-[#8c7768]/15 text-[#c5bcb1] hover:text-[#f5efe9] transition-all duration-300"
                  title="Instagram @braids_by_lastingbeauty"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
              <a
                href="https://www.instagram.com/braids_by_lastingbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8c7768] hover:text-[#d2c7ba] font-mono transition-colors"
              >
                @braids_by_lastingbeauty
              </a>
            </div>
          </div>

          {/* Quick links column */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f5efe9] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Services', target: 'services' },
                { label: 'Book Appointment', target: 'services' },
                { label: 'Requirements', target: 'info-section' },
                { label: 'Cancellation Policy', target: 'info-section' },
                { label: 'About Us', target: 'why-section' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="text-sm text-[#a3968e] hover:text-[#f5efe9] transition-colors font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://lastingbeauty.glossgenius.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#a3968e] hover:text-[#f5efe9] transition-colors font-light"
                >
                  GlossGenius Booking
                </a>
              </li>
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f5efe9] mb-6">Book Your Visit</h4>
            <p className="text-sm text-[#a3968e] font-light mb-6 leading-relaxed">
              Ready for your next look? Use our service matcher to find the perfect style and book your appointment in seconds.
            </p>
            <button
              onClick={() => scrollTo('services')}
              className="inline-block px-8 py-3.5 bg-[#8c7768] text-[#f5efe9] text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#726155] transition-all duration-300 hover:shadow-[0_4px_15px_rgba(140,119,104,0.3)] active:scale-95"
            >
              Find Your Style
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#3d342c] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#6d6259] tracking-wider">
            © {new Date().getFullYear()} Lasting Beauty. All rights reserved.
          </p>
          <p className="text-[11px] text-[#6d6259] tracking-wider uppercase">
            Powered by <a href="https://www.glossgenius.com" target="_blank" rel="noopener noreferrer" className="text-[#8c7768] hover:text-[#c5bcb1] transition-colors">GlossGenius</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
