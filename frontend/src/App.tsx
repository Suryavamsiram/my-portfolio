import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills
          onHighlight={setHighlightedProjects}
          highlightedProjects={highlightedProjects}
        />
        <Projects highlightedProjects={highlightedProjects} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
