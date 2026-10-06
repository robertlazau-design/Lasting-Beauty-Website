import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, X, Calendar, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

/* ── Gallery Item Type ── */
export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  /** Optional poster thumbnail for videos */
  poster?: string;
  /** Display caption */
  caption: string;
  /** Style tag shown on overlay */
  styleTag: string;
  /** Aspect ratio hint for masonry — 'portrait' | 'landscape' | 'square' */
  aspect: 'portrait' | 'landscape' | 'square';
  /** Deep link service variation ID */
  serviceId?: string;
}

/* ── Gallery items (photos from the shared Drive folder) ── */
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    type: 'photo',
    src: '/gallery/look-01.jpg',
    caption: "Smedium Box Braids → 2-Strand Twists",
    styleTag: 'Twists',
    aspect: 'portrait',
    serviceId: 'women-twists',
  },
  {
    id: 'g2',
    type: 'photo',
    src: '/gallery/look-02.jpg',
    caption: "Heart Design",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g3',
    type: 'photo',
    src: '/gallery/look-03.jpg',
    caption: "Short Curls with Blonde Highlights",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g4',
    type: 'photo',
    src: '/gallery/look-04.jpg',
    caption: "Kids' Curl Transformation — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g5',
    type: 'photo',
    src: '/gallery/look-05.jpg',
    caption: "Kids' Half Cornrows with Natural Curls",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-4-6',
  },
  {
    id: 'g6',
    type: 'photo',
    src: '/gallery/look-06.jpg',
    caption: "6 Boho Cornrows",
    styleTag: 'Boho Cornrows',
    aspect: 'portrait',
    serviceId: 'boho-6',
  },
  {
    id: 'g7',
    type: 'photo',
    src: '/gallery/look-07.jpg',
    caption: "4 Straight Back Cornrows",
    styleTag: 'Straight Back',
    aspect: 'portrait',
    serviceId: 'sb-4',
  },
  {
    id: 'g8',
    type: 'photo',
    src: '/gallery/look-08.jpg',
    caption: "Dutch Braids",
    styleTag: 'Dutch Braids',
    aspect: 'portrait',
    serviceId: 'wash-dutch',
  },
  {
    id: 'g9',
    type: 'photo',
    src: '/gallery/look-09.jpg',
    caption: "10 Straight Back Cornrows",
    styleTag: 'Straight Back',
    aspect: 'portrait',
    serviceId: 'sb-10',
  },
  {
    id: 'g10',
    type: 'photo',
    src: '/gallery/look-10.jpg',
    caption: "Cross Over Design",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g11',
    type: 'photo',
    src: '/gallery/look-11.jpg',
    caption: "Kids' Half Cornrows — Curly Ponytail Styles",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-8-10',
  },
  {
    id: 'g12',
    type: 'photo',
    src: '/gallery/look-12.jpg',
    caption: "Soft Wavy Curls — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g13',
    type: 'photo',
    src: '/gallery/look-13.jpg',
    caption: "Swirl Design",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g14',
    type: 'photo',
    src: '/gallery/look-14.jpg',
    caption: "Highlighted Curl Transformation",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g15',
    type: 'photo',
    src: '/gallery/look-15.jpg',
    caption: "Zig Zag Design",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g16',
    type: 'photo',
    src: '/gallery/look-16.jpg',
    caption: "Deep Curl Definition — Long Black Curls",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g17',
    type: 'photo',
    src: '/gallery/look-17.jpg',
    caption: "Men's Twists",
    styleTag: 'Twists',
    aspect: 'square',
    serviceId: 'mens-smedium-twists',
  },
  {
    id: 'g18',
    type: 'photo',
    src: '/gallery/look-18.jpg',
    caption: "Frizz to Defined Curls — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g19',
    type: 'photo',
    src: '/gallery/look-19.jpg',
    caption: "6 Straight Back Cornrows",
    styleTag: 'Straight Back',
    aspect: 'portrait',
    serviceId: 'sb-6',
  },
  {
    id: 'g20',
    type: 'photo',
    src: '/gallery/look-20.jpg',
    caption: "Full Scalp Treatment",
    styleTag: 'Scalp Treatment',
    aspect: 'portrait',
    serviceId: 'full-scalp-treatment',
  },
  {
    id: 'g21',
    type: 'photo',
    src: '/gallery/look-21.jpg',
    caption: "Men's Straight Back Cornrows",
    styleTag: 'Straight Back',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g22',
    type: 'photo',
    src: '/gallery/look-22.jpg',
    caption: "Kids' Braided Pigtails",
    styleTag: 'Dutch Braids',
    aspect: 'square',
    serviceId: 'wash-dutch',
  },
  {
    id: 'g23',
    type: 'photo',
    src: '/gallery/look-23.jpg',
    caption: "Natural Curl Transformation — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g24',
    type: 'photo',
    src: '/gallery/look-24.jpg',
    caption: "12–15 Half Cornrows",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-12-15',
  },
  {
    id: 'g25',
    type: 'photo',
    src: '/gallery/look-25.jpg',
    caption: "Long Curl Transformation — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g26',
    type: 'photo',
    src: '/gallery/look-26.jpg',
    caption: "4–6 Half Cornrows",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-4-6',
  },
  {
    id: 'g27',
    type: 'photo',
    src: '/gallery/look-27.jpg',
    caption: "8–10 Half Cornrows",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-8-10',
  },
  {
    id: 'g28',
    type: 'photo',
    src: '/gallery/look-28.jpg',
    caption: "8 Straight Back Cornrows",
    styleTag: 'Straight Back',
    aspect: 'portrait',
    serviceId: 'sb-8',
  },
  {
    id: 'g29',
    type: 'photo',
    src: '/gallery/look-29.jpg',
    caption: "Natural Coil Definition — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'wash-n-go',
  },
  {
    id: 'g30',
    type: 'photo',
    src: '/gallery/look-30.jpg',
    caption: "Swirl Design",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g31',
    type: 'photo',
    src: '/gallery/look-31.jpg',
    caption: "Silk Press",
    styleTag: 'Silk Press',
    aspect: 'portrait',
    serviceId: 'silk-press',
  },
  {
    id: 'g32',
    type: 'photo',
    src: '/gallery/look-32.jpg',
    caption: "Defined Curls on Short Hair — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g33',
    type: 'photo',
    src: '/gallery/look-33.jpg',
    caption: "Pop Smoke Braids",
    styleTag: 'Designs',
    aspect: 'portrait',
    serviceId: 'straight-back',
  },
  {
    id: 'g34',
    type: 'photo',
    src: '/gallery/look-34.jpg',
    caption: "Natural Curl Definition — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g35',
    type: 'photo',
    src: '/gallery/look-35.jpg',
    caption: "Honey-Blonde Curl Definition — Before & After",
    styleTag: 'Curl Transformation',
    aspect: 'portrait',
    serviceId: 'curl-transformation',
  },
  {
    id: 'g36',
    type: 'photo',
    src: '/gallery/look-36.jpg',
    caption: "4–6 Half Cornrows",
    styleTag: 'Half Cornrows',
    aspect: 'portrait',
    serviceId: 'half-4-6',
  },
  {
    id: 'g37',
    type: 'photo',
    src: '/gallery/look-37.jpg',
    caption: "Swirl Design",
    styleTag: 'Designs',
    aspect: 'square',
    serviceId: 'straight-back',
  },
];

/* ── Filter Tags ── */
const FILTER_TAGS = ['All', 'Straight Back', 'Half Cornrows', 'Boho Cornrows', 'Designs', 'Dutch Braids', 'Twists', 'Silk Press', 'Curl Transformation', 'Scalp Treatment'];

/* ── Lightbox Modal ── */
function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-0 sm:right-0 z-10 w-10 h-10 rounded-full bg-[#2a2522] border border-[#8c7768]/40 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#332f2c] transition-all shadow-lg"
          aria-label="Close lightbox"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Media */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-[#2a2522]">
          {item.type === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[70vh] object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.caption}
              className="w-full max-h-[70vh] object-contain"
            />
          )}
        </div>

        {/* Bottom bar */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
          <div>
            <p className="text-white text-sm sm:text-base font-medium">{item.caption}</p>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5bcb1] font-semibold mt-1 block">
              {item.styleTag}
            </span>
          </div>
          <Link
            to={item.serviceId ? `/?service=${item.serviceId}&scrollTo=services` : '/?scrollTo=services'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8c7768] hover:bg-[#726155] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md active:scale-95 shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book This Look</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Gallery Card ── */
function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const aspectClass =
    item.aspect === 'landscape'
      ? 'aspect-[4/3]'
      : item.aspect === 'square'
      ? 'aspect-square'
      : 'aspect-[3/4]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      layout
      className="group relative cursor-pointer break-inside-avoid mb-4 sm:mb-5"
      onClick={() => onOpen(item)}
    >
      <div
        className={`relative ${aspectClass} rounded-xl sm:rounded-2xl overflow-hidden bg-[#e5dfd6] border border-[#e5dfd6]/60 shadow-sm hover:shadow-xl transition-all duration-500`}
      >
        {/* Image / Video Thumbnail */}
        {item.type === 'video' ? (
          <>
            {item.poster ? (
              <img
                src={item.poster}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <video
                src={item.src}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Play badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-[#2a2522]/60 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2522]/90 via-[#2a2522]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4 sm:p-5">
          {/* Style tag pill */}
          <span className="self-start text-[9px] uppercase tracking-[0.2em] font-semibold text-[#f5efe9] bg-[#8c7768]/80 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
            {item.styleTag}
          </span>

          <p className="text-white text-sm sm:text-base font-medium leading-snug mb-3">
            {item.caption}
          </p>

          {/* Book CTA */}
          <Link
            to={item.serviceId ? `/?service=${item.serviceId}&scrollTo=services` : '/?scrollTo=services'}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 self-start px-4 py-2 bg-white/95 hover:bg-white text-[#332f2c] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm active:scale-95"
          >
            <Calendar className="w-3 h-3" />
            <span>Book This Look</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gallery Page ── */
export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.styleTag === activeFilter);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5efe9] selection:bg-[#8c7768] selection:text-white">
      {/* ── Sticky top bar ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#f5efe9]/95 backdrop-blur-md border-b border-[#e5dfd6] shadow-[0_2px_20px_rgba(51,47,44,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#8c7768] hover:text-[#332f2c] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold hidden sm:inline">
              Back to Home
            </span>
          </Link>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-xl lg:text-2xl tracking-[0.15em] text-[#332f2c]">
              LASTING <span className="font-script text-2xl lg:text-3xl tracking-normal -ml-1">Beauty</span>
            </span>
          </Link>

          <Link
            to="/?scrollTo=services"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#8c7768] hover:bg-[#726155] text-white text-[10px] font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm active:scale-95"
          >
            <Calendar className="w-3 h-3" />
            <span className="hidden sm:inline">Book Now</span>
          </Link>
        </div>
      </motion.header>

      {/* ── Hero banner ── */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-10 left-0 w-80 h-80 bg-[#d2c7ba] rounded-full opacity-15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e5dfd6] rounded-full opacity-20 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-[1px] bg-[#8c7768] mx-auto mb-6" />
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#332f2c] tracking-[0.06em] mb-4">
              OUR <span className="font-script text-5xl sm:text-6xl lg:text-7xl tracking-normal">Portfolio</span>
            </h1>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#8c7768] font-medium max-w-lg mx-auto leading-relaxed">
              Real clients · Real results · Every style crafted with precision & care
            </p>
          </motion.div>

          {/* ── Stat counters ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-8"
          >
            {[
              { value: '500+', label: 'Clients Served' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl sm:text-3xl text-[#332f2c] tracking-wide">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8c7768] font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-16 lg:top-20 z-30 bg-[#f5efe9]/95 backdrop-blur-md border-y border-[#e5dfd6]/80">
        <div
          ref={filterRef}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8c7768] shrink-0 mr-1" />
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 shrink-0 ${
                activeFilter === tag
                  ? 'bg-[#332f2c] text-[#f5efe9] shadow-md'
                  : 'bg-white/70 text-[#6d6259] border border-[#e5dfd6] hover:bg-white hover:border-[#d2c7ba]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry Gallery Grid ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              className="columns-2 md:columns-3 gap-4 sm:gap-5"
            >
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={setLightboxItem}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-[#8c7768] font-serif text-xl mb-2">No looks yet for this style</p>
              <p className="text-[#c5bcb1] text-sm">Check back soon — new photos & videos added regularly</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA banner at bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 bg-[#332f2c] rounded-2xl sm:rounded-3xl px-8 sm:px-12 py-10 sm:py-14 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-60 h-60 bg-[#8c7768] rounded-full opacity-10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d2c7ba] rounded-full opacity-8 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f5efe9] tracking-[0.06em] mb-3">
              LOVE WHAT <span className="font-script text-3xl sm:text-4xl lg:text-5xl tracking-normal">You See?</span>
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c5bcb1] font-medium mb-8 max-w-md mx-auto">
              Book your appointment today and let's create your perfect look
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/?scrollTo=services"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#8c7768] hover:bg-[#a38e7d] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Find Your Style & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://www.instagram.com/braids_by_lastingbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[#8c7768]/40 text-[#d2c7ba] hover:text-white hover:border-[#8c7768] text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>See More on Instagram</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="border-t border-[#e5dfd6] py-6 text-center">
        <Link to="/" className="text-[10px] uppercase tracking-[0.2em] text-[#8c7768] hover:text-[#332f2c] font-semibold transition-colors">
          ← Back to Lasting Beauty
        </Link>
      </footer>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
