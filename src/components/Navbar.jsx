import React, { useEffect, useState } from 'react';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'בית', href: '#hero' },
  { label: 'אודות', href: '#about' },
  { label: 'שירותים', href: '#services' },
  { label: 'הסמכה', href: '#certificates' },
  { label: 'צור קשר', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTextColor = scrolled ? 'text-black' : 'text-[#cc93c0]';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const goToBook = () => {
    setOpen(false);
    window.location.href = '/Book';
  };

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollTo('#hero')}
            className={`font-playfair text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300 ${menuTextColor}`}
          >
            בנגיעה אחת רכה
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-heebo font-medium transition-colors duration-300 ${menuTextColor} hover:opacity-75`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={goToBook}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-heebo font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              קביעת תור
            </button>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${menuTextColor}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-right text-base font-heebo font-medium text-black hover:opacity-75 py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
