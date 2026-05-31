import { useEffect, useRef, useState } from 'react';
import { Layers, Cloud, Box, GitMerge, Database, Activity } from 'lucide-react';

export type SkillDomain = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: 'sky' | 'mint' | 'amber' | 'rose';
  skills: { name: string; projectIds: string[] }[];
};

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    icon: Layers,
    color: 'sky',
    skills: [
      { name: 'LLMs & Agents', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'RAG Pipelines', projectIds: ['p1'] },
      { name: 'NLP / Transformers', projectIds: ['p1', 'p2'] },
      { name: 'Prompt Engineering', projectIds: ['p1', 'p2'] },
      { name: 'Vector Databases', projectIds: ['p1'] },
      { name: 'Agentic Frameworks', projectIds: ['p1', 'p2'] },
    ],
  },
  {
    id: 'cloud',
    label: 'AWS & Cloud Engineering',
    icon: Cloud,
    color: 'mint',
    skills: [
      { name: 'EC2 / ECS', projectIds: ['p1', 'p3'] },
      { name: 'Lambda', projectIds: ['p1'] },
      { name: 'DynamoDB / RDS', projectIds: ['p2'] },
      { name: 'S3 & CloudFront', projectIds: ['p1', 'p3'] },
      { name: 'ECR & Container Registry', projectIds: ['p1'] },
      { name: 'Load Balancers & Auto-scaling', projectIds: ['p1', 'p3'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Infrastructure',
    icon: Box,
    color: 'amber',
    skills: [
      { name: 'Python / FastAPI', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Docker & Containerization', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Terraform / IaC', projectIds: ['p1', 'p3'] },
      { name: 'n8n Workflows', projectIds: ['p1'] },
      { name: 'API Design & REST', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Database Design', projectIds: ['p1', 'p2'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & UI',
    icon: GitMerge,
    color: 'rose',
    skills: [
      { name: 'React + TypeScript', projectIds: ['p1', 'p2'] },
      { name: 'Vite / Build Tools', projectIds: ['p1', 'p2'] },
      { name: 'Tailwind CSS', projectIds: ['p1', 'p2'] },
      { name: 'HTML / CSS / JavaScript', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Interactive UI Design', projectIds: ['p2'] },
      { name: 'State Management', projectIds: ['p1', 'p2'] },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & CI/CD',
    icon: Activity,
    color: 'sky',
    skills: [
      { name: 'GitHub Actions', projectIds: ['p1', 'p3'] },
      { name: 'End-to-End CI/CD Pipelines', projectIds: ['p1', 'p3'] },
      { name: 'Docker Compose', projectIds: ['p1'] },
      { name: 'Deployment Automation', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Monitoring & Logging', projectIds: ['p1', 'p3'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: Database,
    color: 'mint',
    skills: [
      { name: 'Git / GitHub', projectIds: ['p1', 'p2', 'p3'] },
      { name: 'Web Scraping & Crawling', projectIds: ['p3'] },
      { name: 'APIs & Integrations', projectIds: ['p1', 'p2'] },
      { name: 'Netlify / Vercel', projectIds: ['p1', 'p2'] },
      { name: 'Email & Calendar APIs', projectIds: ['p1'] },
    ],
  },
];

const COLOR_MAP = {
  sky: {
    badge: 'bg-sky-400/10 text-sky-300 border border-sky-400/20 hover:bg-sky-400/20 hover:border-sky-400/50',
    badgeActive: 'bg-sky-400/25 text-sky-200 border border-sky-400/60 shadow-sky-400/20 shadow-sm',
    header: 'text-sky-400',
    iconBg: 'bg-sky-400/10',
  },
  mint: {
    badge: 'bg-mint-400/10 text-mint-300 border border-mint-400/20 hover:bg-mint-400/20 hover:border-mint-400/50',
    badgeActive: 'bg-mint-400/25 text-mint-200 border border-mint-400/60 shadow-mint-400/20 shadow-sm',
    header: 'text-mint-400',
    iconBg: 'bg-mint-400/10',
  },
  amber: {
    badge: 'bg-amber-400/10 text-amber-300 border border-amber-400/20 hover:bg-amber-400/20 hover:border-amber-400/50',
    badgeActive: 'bg-amber-400/25 text-amber-200 border border-amber-400/60',
    header: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
  },
  rose: {
    badge: 'bg-rose-400/10 text-rose-300 border border-rose-400/20 hover:bg-rose-400/20 hover:border-rose-400/50',
    badgeActive: 'bg-rose-400/25 text-rose-200 border border-rose-400/60',
    header: 'text-rose-400',
    iconBg: 'bg-rose-400/10',
  },
};

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

interface SkillsProps {
  onHighlight: (projectIds: string[]) => void;
  highlightedProjects: string[];
}

export default function Skills({ onHighlight, highlightedProjects }: SkillsProps) {
  const { ref, inView } = useInView();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  function handleBadgeClick(skillName: string, projectIds: string[]) {
    if (activeSkill === skillName) {
      setActiveSkill(null);
      onHighlight([]);
    } else {
      setActiveSkill(skillName);
      onHighlight(projectIds);
    }
  }

  return (
    <section id="skills" className="py-28 px-6 bg-slate-900/40" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">02 / Skills</span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Technology matrix
            </h2>
            {activeSkill && (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1.5 rounded-full animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Highlighting projects that use <strong>{activeSkill}</strong>
                <button
                  onClick={() => { setActiveSkill(null); onHighlight([]); }}
                  className="ml-1 text-sky-300 hover:text-white transition-colors"
                  aria-label="Clear filter"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_DOMAINS.map((domain) => {
              const c = COLOR_MAP[domain.color];
              return (
                <div key={domain.id} className="card-glass rounded-xl p-6 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center`}>
                      <domain.icon size={16} className={c.header} />
                    </div>
                    <h3 className={`font-semibold text-sm ${c.header}`}>{domain.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map((skill) => {
                      const isActive = activeSkill === skill.name;
                      const hasProjects = skill.projectIds.length > 0;
                      return (
                        <button
                          key={skill.name}
                          onClick={() => hasProjects && handleBadgeClick(skill.name, skill.projectIds)}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                            isActive ? c.badgeActive : c.badge
                          } ${hasProjects ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
                          title={hasProjects ? `Click to highlight related projects` : 'No demo projects'}
                        >
                          {skill.name}
                          {hasProjects && (
                            <span className="ml-1 opacity-50">•</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-slate-600 mt-8 font-mono">
            Badges with <span className="text-sky-400">•</span> can be clicked to highlight related projects below
          </p>
        </div>
      </div>
    </section>
  );
}
