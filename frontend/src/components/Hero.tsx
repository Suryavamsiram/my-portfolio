import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Terminal, ChevronDown } from 'lucide-react';

const TYPING_PHRASES = [
  'AI agents that think and act autonomously.',
  'RAG pipelines for intelligent knowledge systems.',
  'Cloud infrastructure as code, production-grade.',
  'Full stack AI solutions, end-to-end.',
  'NLP, agentic AI, and intelligent workflows.',
];

function useTypingEffect(phrases: string[], speed = 55, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && charIdx < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typed = useTypingEffect(TYPING_PHRASES);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid + radial glow */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-hero-gradient"
        aria-hidden="true"
      />
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-400/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-mint-400/4 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-mint-400/30 bg-mint-400/5 text-mint-400 text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
          Building AI agents & cloud systems — Open to collaborate
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          <span className="text-slate-100">Suryavamsi Ram P</span>
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-sky-400 mb-6 tracking-wide">
          AI / ML &amp; Full Stack Engineer
        </p>

        {/* Terminal typing line */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-slate-900/80 border border-slate-700/60 font-mono text-sm sm:text-base mb-10 min-h-[48px]">
          <Terminal size={16} className="text-sky-400 shrink-0" />
          <span className="text-slate-300">{typed}</span>
          <span className="w-0.5 h-4 bg-sky-400 animate-blink" />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-sky-400 text-slate-950 font-semibold text-sm hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/25 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-slate-600 text-slate-300 font-semibold text-sm hover:border-sky-400/50 hover:text-sky-400 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5">
          <a
            href="https://github.com/Suryavamsiram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm font-medium"
          >
            <Github size={18} />
            GitHub
          </a>
          <span className="w-px h-4 bg-slate-700" />
          <a
            href="https://www.linkedin.com/in/suryavamsi-ram-peesa-a2962840a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm font-medium"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors duration-200 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
