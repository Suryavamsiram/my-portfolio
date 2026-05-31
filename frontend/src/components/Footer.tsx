import { Github, Linkedin, Terminal, Zap } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      {/* Build badge */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
            <Zap size={12} className="shrink-0" />
            <span>Full Stack AI & Cloud Engineering</span>
            <span className="text-slate-700">|</span>
            <span className="text-mint-400">Continuous Innovation</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <Terminal size={11} />
            <span>LLMs + Cloud Infrastructure + React</span>
            <span className="w-1 h-3.5 bg-sky-400 animate-blink" />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-mono font-bold text-sky-400 text-lg mb-2">Suryavamsi</div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              AI & Full Stack Engineer. Building intelligent systems that think, learn, and scale on cloud.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-slate-500 hover:text-sky-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/Suryavamsiram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-400 transition-colors duration-200"
              >
                <Github size={14} />
                github.com/Suryavamsiram
              </a>
              <a
                href="https://www.linkedin.com/in/suryavamsi-ram-peesa-a2962840a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-400 transition-colors duration-200"
              >
                <Linkedin size={14} />
                linkedin.com/in/suryavamsi
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Suryavamsi Ram P. Built with React + Vite + Tailwind CSS.
          </p>
          <p className="text-xs text-slate-700 font-mono">
            Deployed with modern cloud infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
