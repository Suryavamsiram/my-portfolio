import { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <Terminal size={16} />
          surya
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-sky-400 transition-colors duration-200 font-medium"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-4 py-1.5 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium hover:bg-sky-400/20 hover:border-sky-400/60 transition-all duration-200"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm text-slate-300 hover:text-sky-400 transition-colors font-medium"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 py-2.5 text-sm text-sky-400 font-medium"
          >
            Hire Me →
          </a>
        </nav>
      </div>
    </header>
  );
}
