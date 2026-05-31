import { useEffect, useRef, useState } from 'react';
import { GitBranch, Server, Shield, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: GitBranch,
    label: 'AI Agents & LLMs',
    desc: 'Designing agentic systems with guardrails, RAG pipelines, and intelligent orchestration via frameworks like n8n.',
    color: 'sky',
  },
  {
    icon: Server,
    label: 'Cloud Engineering',
    desc: 'AWS infrastructure: ECS, EC2, ECR, Lambda, DynamoDB, S3. End-to-end CI/CD with load balancers and auto-scaling.',
    color: 'mint',
  },
  {
    icon: Shield,
    label: 'NLP & RAG Systems',
    desc: 'Building retrieval-augmented generation pipelines, semantic search, and knowledge-aware AI workflows.',
    color: 'sky',
  },
  {
    icon: Zap,
    label: 'Full Stack Development',
    desc: 'End-to-end solutions: Vite + React + TypeScript frontend, Python backends, Docker containerization, and deployment.',
    color: 'mint',
  },
];

function useInView(threshold = 0.15) {
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

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">01 / About</span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Bio text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6 leading-tight">
                Building AI systems<br />
                <span className="text-gradient-sky">that think and act.</span>
              </h2>

              <div className="space-y-4 text-slate-400 leading-relaxed text-[15px]">
                <p>
                  I'm an AI / ML and Full Stack Engineer with 8 years of hands-on experience designing intelligent systems
                  and cloud infrastructure. I specialize in building agentic AI workflows, NLP pipelines, and production-grade
                  cloud architectures on AWS.
                </p>
                <p>
                  My expertise spans the full spectrum: from training and deploying LLM-powered agents with RAG capabilities
                  and guardrails, to architecting scalable cloud systems with ECS, Lambda, DynamoDB, and S3. I design interactive UIs
                  in Vite + React + TypeScript, orchestrate workflows with n8n, and containerize everything with Docker.
                </p>
                <p>
                  I thrive at the intersection of AI and engineering — taking complex ideas from research papers and translating them
                  into real, scalable systems that solve actual business problems. Whether it's building enterprise collaboration agents,
                  replicating cutting-edge AI products, or deploying intelligent scrapers, I ship end-to-end solutions.
                </p>
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800">
                {[['8+', 'Years experience'], ['15+', 'Shipped projects'], ['3', 'Production AI agents']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-sky-400 font-mono">{val}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, label, desc, color }, i) => (
                <div
                  key={label}
                  className="card-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                    color === 'sky' ? 'bg-sky-400/10 text-sky-400' : 'bg-mint-400/10 text-mint-400'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold text-slate-200 text-sm mb-1.5">{label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
