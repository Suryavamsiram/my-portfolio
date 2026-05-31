import { useEffect, useRef, useState } from 'react';
import { X, Send, CheckCircle, Mail, MessageSquare, User, Linkedin } from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!message.trim()) e.message = 'Message is required';
    else if (message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSuccess(true);
    setName(''); setEmail(''); setMessage('');
    setTimeout(() => { setSuccess(false); onClose(); }, 3000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-slate-900 border-l border-slate-700/60 z-50 flex flex-col transition-transform duration-400 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Say Hello</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">I usually respond within 24h</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-mint-400/10 flex items-center justify-center">
                <CheckCircle size={32} className="text-mint-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Message sent!</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  <User size={11} className="inline mr-1" />
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((err) => ({ ...err, name: '' })); }}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all ${
                    errors.name ? 'border-rose-500/60' : 'border-slate-700 focus:border-sky-400/60'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  <Mail size={11} className="inline mr-1" />
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: '' })); }}
                  placeholder="jane@company.com"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all ${
                    errors.email ? 'border-rose-500/60' : 'border-slate-700 focus:border-sky-400/60'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  <MessageSquare size={11} className="inline mr-1" />
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setErrors((err) => ({ ...err, message: '' })); }}
                  placeholder="Tell me about the role or project..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800 border text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all resize-none ${
                    errors.message ? 'border-rose-500/60' : 'border-slate-700 focus:border-sky-400/60'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message
                    ? <p className="text-xs text-rose-400">{errors.message}</p>
                    : <span />
                  }
                  <span className={`text-xs font-mono ${message.length < 20 ? 'text-slate-600' : 'text-mint-400'}`}>
                    {message.length}/500
                  </span>
                </div>
              </div>

              {/* Info box */}
              <div className="p-4 rounded-lg bg-sky-400/5 border border-sky-400/15 text-xs text-slate-400">
                <span className="text-sky-400 font-medium">Direct email:</span> suryavamsiram6133@gmail.com — or connect via LinkedIn for faster response.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-400 text-slate-950 font-semibold text-sm hover:bg-sky-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/25"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Contact() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { ref, inView } = useInView();

  return (
    <>
      <section id="contact" className="py-28 px-6 bg-slate-900/40" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-sky-400/30" />
              <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">04 / Contact</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-sky-400/30" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Let's build something<br />
              <span className="text-gradient-sky">together.</span>
            </h2>

            <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Interested in collaborating on AI agents, cloud systems, or full-stack projects?
              I'm always open to discussing innovative ideas, partnerships, and opportunities to build intelligent systems at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/suryavamsi-ram-peesa-a2962840a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-sky-400 text-slate-950 font-semibold text-sm hover:bg-sky-300 transition-all duration-200 hover:shadow-xl hover:shadow-sky-400/30 hover:-translate-y-0.5"
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
              <a
                href="mailto:suryavamsiram6133@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:border-sky-400/50 hover:text-sky-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail size={16} />
                Email Me
              </a>
            </div>

            <div className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
              Based globally — always open to remote collaboration
            </div>
          </div>
        </div>
      </section>

      <ContactDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
