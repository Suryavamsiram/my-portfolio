import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Terminal, Layers, Cpu, Server, GitBranch, Database, Zap } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  tags: string[];
  stack: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[];
  metrics: { label: string; value: string }[];
  image: string;
  github: string;
  accent: 'sky' | 'mint';
};

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'AutonoOps — Enterprise AI Collaboration Agent',
    subtitle: 'Full-stack agentic AI for enterprise workflows powered by n8n, Docker, and Vite',
    description:
      'An end-to-end AI agent platform built to help enterprises collaborate and communicate effectively. Powered by n8n orchestration, dockerized backends, and a modern Vite + React + TypeScript frontend. Features intelligent email drafting, calendar event creation, project management, CRM integration, research capabilities, and web search/scraping tools with RAG.',
    longDesc:
      'This is a production-grade agentic system combining LLM reasoning with workflow automation. The agent understands context across emails, calendars, and projects, making autonomous decisions while respecting guardrails. Deployed on Netlify. The UI provides seamless interaction with agent capabilities while maintaining human control and oversight.',
    tags: ['n8n', 'React', 'TypeScript', 'Docker', 'Python', 'RAG', 'LLMs', 'Full Stack'],
    stack: [
      { label: 'n8n Workflows', icon: GitBranch },
      { label: 'React + TypeScript', icon: Cpu },
      { label: 'Vite', icon: Zap },
      { label: 'Docker', icon: Server },
      { label: 'Python Backend', icon: Database },
    ],
    metrics: [
      { label: 'AI Agents', value: '5+' },
      { label: 'Integrations', value: '20+' },
      { label: 'Users', value: 'Inactive' },
    ],
    image: 'https://images.pexels.com/photos/8386369/pexels-photo-8386369.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/Suryavamsiram/AutonoOps-Frontend/tree/main/project',
    accent: 'sky',
  },
  {
    id: 'p2',
    title: 'Skye — Agentic Gig Marketplace AI',
    subtitle: 'Milo AI replica with guardrails, profiles, and autonomous agent reasoning',
    description:
      'A full replica and enhancement of Lythe AI\'s Milo platform — an agentic chatbot for gig marketplace discovery, matching, and transactions. Built with interactive UI, working AI agent with reasoning, guardrails, and demo profiles. Users can search gigs, apply intelligently, manage proposals, and interact with an AI that understands context and constraints.',
    longDesc:
      'This project demonstrates deep understanding of LLM systems, safety mechanisms, and UX for AI. The agent uses NLP to parse user intent, applies guardrails to prevent hallucinations, and manages state across conversations. The platform includes profile management, transaction handling, and real-time matching. Deployed on Vercel with seamless integration.',
    tags: ['LLMs', 'React', 'TypeScript', 'NLP', 'Guardrails', 'UI/UX', 'Vercel', 'Full Stack'],
    stack: [
      { label: 'LLM Agent', icon: Cpu },
      { label: 'React + TS', icon: GitBranch },
      { label: 'Tailwind CSS', icon: Zap },
      { label: 'API Integration', icon: Server },
      { label: 'Vercel Deploy', icon: Database },
    ],
    metrics: [
      { label: 'Agent Reasoning', value: 'Advanced' },
      { label: 'Guardrails', value: 'Enabled' },
      { label: 'Live Link', value: 'Deployed' },
    ],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/hustlixshop-lgtm/skye',
    accent: 'mint',
  },
  {
    id: 'p3',
    title: 'E-Commerce Social Intelligence Platform',
    subtitle: 'Social scraper + cross-referencer for trend detection and product deployment',
    description:
      'An intelligent platform that scrapes trending products from social media, cross-references with Google trends, and helps e-commerce sites identify and deploy trending products to their own platforms. Combines web scraping, data analysis, and deployment to automate product discovery.',
    longDesc:
      'This system aggregates signals from multiple social platforms, analyzes trending patterns, and provides actionable insights for e-commerce businesses. Built with Python for scraping/analysis and n8n for scalable processing. End-to-end automation ensures rapid deployment cycles and reliable data pipelines.',
    tags: ['Web Scraping', 'Python', 'Data Analysis', 'E-Commerce', 'n8n', 'GitHub Actions'],
    stack: [
      { label: 'Python Scraping', icon: Cpu },
      { label: 'Automated Backend', icon: Server },
      { label: 'Lambda Functions', icon: Zap },
      { label: 'n8n', icon: Database },
      { label: 'GitHub Actions', icon: GitBranch },
    ],
    metrics: [
      { label: 'Sources tracked', value: '10+' },
      { label: 'Products/day', value: '10+' },
      { label: 'Accuracy', value: '95%+' },
    ],
    image: 'https://images.pexels.com/photos/6804589/pexels-photo-6804589.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/Suryavamsiram',
    accent: 'sky',
  },
];

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

interface ProjectsProps {
  highlightedProjects: string[];
}

export default function Projects({ highlightedProjects }: ProjectsProps) {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">03 / Projects</span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-12">
            Featured work
          </h2>

          <div className="space-y-10">
            {PROJECTS.map((project, idx) => {
              const isHighlighted = highlightedProjects.length === 0 || highlightedProjects.includes(project.id);
              const accentSky = project.accent === 'sky';

              return (
                <div
                  key={project.id}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    isHighlighted
                      ? 'opacity-100 scale-100'
                      : 'opacity-30 scale-[0.99] grayscale'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Highlighted ring */}
                  {highlightedProjects.includes(project.id) && (
                    <div className={`absolute inset-0 rounded-2xl ring-2 ${
                      accentSky ? 'ring-sky-400/60' : 'ring-mint-400/60'
                    } pointer-events-none z-20 animate-fade-in`} />
                  )}

                  <div className="card-glass rounded-2xl overflow-hidden">
                    <div className={`grid lg:grid-cols-2 gap-0 ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}>
                      {/* Image */}
                      <div className="relative h-56 lg:h-auto overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 ${
                          accentSky
                            ? 'bg-gradient-to-br from-sky-950/70 via-transparent to-transparent'
                            : 'bg-gradient-to-br from-slate-950/70 via-transparent to-transparent'
                        }`} />
                        {/* Accent tag */}
                        <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-mono font-semibold ${
                          accentSky
                            ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30'
                            : 'bg-mint-400/20 text-mint-300 border border-mint-400/30'
                        }`}>
                          Project {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-100 mb-1.5 leading-tight">
                            {project.title}
                          </h3>
                          <p className={`text-xs font-mono mb-4 ${accentSky ? 'text-sky-400' : 'text-mint-400'}`}>
                            {project.subtitle}
                          </p>
                          <p className="text-slate-400 text-sm leading-relaxed mb-3">
                            {project.description}
                          </p>
                          <p className="text-slate-500 text-xs leading-relaxed mb-6">
                            {project.longDesc}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            {project.metrics.map((m) => (
                              <div key={m.label} className="bg-slate-900/60 rounded-lg p-3 text-center">
                                <div className={`text-base font-bold font-mono ${accentSky ? 'text-sky-400' : 'text-mint-400'}`}>
                                  {m.value}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Stack icons */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.stack.map(({ label, icon: Icon }) => (
                              <span
                                key={label}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700/60"
                              >
                                <Icon size={11} className="opacity-70" />
                                {label}
                              </span>
                            ))}
                          </div>

                          {/* Tag pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-xs text-slate-500 font-mono">#{tag.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
                            ))}
                          </div>
                        </div>

                        {/* Action links */}
                        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-800">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 hover:text-white transition-all duration-200"
                          >
                            <Github size={13} />
                            View Source
                          </a>
                          <a
                            href="#"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                              accentSky
                                ? 'bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 border border-sky-400/20'
                                : 'bg-mint-400/10 text-mint-400 hover:bg-mint-400/20 border border-mint-400/20'
                            }`}
                          >
                            <ExternalLink size={13} />
                            Case Study
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
