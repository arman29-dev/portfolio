import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import TiltCard from './reactbits/TiltCard'
import TrueFocus from './reactbits/TrueFocus'
import Magnet from './reactbits/Magnet'

const projects = [
  {
    id: 'nix', number: '03', featured: true,
    name: 'N.I.X', full: 'Universal Device Control Network',
    tagline: 'Distributed brain-network for all your devices',
    description: 'Control phones, PCs, and embedded devices from one unified account. Strict permission system, QR-code device linking, cross-platform Flutter app secured with JWT.',
    stack: ['FastAPI', 'MySQL', 'Flutter', 'Dart', 'JWT', 'QR Code'],
    highlights: ['Cross-platform Flutter app', 'JWT secured backend', 'QR device linking'],
    github: 'https://github.com/arman29-dev/N.I.X',
    demo: '',
    color: '#00f2ff',
  },
  {
    id: 'dbreader', number: '04',
    name: 'DB Reader', full: 'GUI Database Tool',
    tagline: 'Browser-based SQLite visualization',
    description: 'A browser-based developer tool to visualize and perform CRUD on local .db/.sqlite files. Eliminates CLI friction during development.',
    stack: ['Flask', 'SQLite3', 'HTML/CSS/JS'],
    highlights: ['Full CRUD interface', 'Zero CLI dependency', 'Dev tooling'],
    github: 'https://github.com/arman29-dev/DB-GUI.tool',
    demo: 'https://db-guitool.up.railway.app',
    color: '#00f2ff',
  },
  {
    id: 'pobucket', number: '02',
    name: 'POBucket', full: 'Student Marketplace',
    tagline: 'P2P platform for student builders',
    description: 'A peer-to-peer marketplace for students to list and sell hardware/software projects. Integrated Razorpay & Stripe for secure transactions.',
    stack: ['Django', 'MySQL', 'Razorpay', 'Stripe'],
    highlights: ['Payment gateway integration', 'Django ORM', 'User auth system'],
    github: 'https://github.com/arman29-dev/POBucket.xyz',
    demo: '',
    color: '#00f2ff',
  },
  {
    id: 'cfc', number: '01',
    name: 'CFC', full: 'Canteen Fast Card',
    tagline: 'Cashless smart payment for institutions',
    description: 'A cashless payment system using student ID cards with RFID & barcode scanning via Raspberry Pi and OpenCV. Bills accumulate and are paid at fee submission time.',
    stack: ['Flask', 'SQLite3', 'OpenCV', 'Raspberry Pi', 'GPIO'],
    highlights: ['RFID + barcode scanning', 'Raspberry Pi GPIO', 'Student portal billing'],
    github: 'https://github.com/arman29-dev/CanteenFastCard',
    demo: '',
    color: '#00f2ff',
  },
]

const projectFrom = (i, featured) => {
  if (featured) return { x: 0, rotateX: 5 }
  return i % 2 === 0 ? { x: -80, rotateY: 10 } : { x: 80, rotateY: -10 }
}

function ProjectCard({ project, index, inView }) {
  const from = projectFrom(index, project.featured)
  return (
    <motion.div
      initial={{ opacity: 0, x: from.x, rotateX: from.rotateX || 0, rotateY: from.rotateY || 0, y: 40 }}
      animate={inView ? { opacity: 1, x: 0, rotateX: 0, rotateY: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={project.featured ? 'md:col-span-2' : ''}
      style={{ perspective: '1000px' }}
    >
      <TiltCard
          maxTilt={project.featured ? 6 : 10}
          pixels pixelGap={8} pixelSpeed={35} pixelColors="#00f2ff,#0099bb,#003344"
          className="glass-card h-full flex flex-col gap-4 p-6 transition-all duration-500"
          style={{ borderTop: `2px solid ${project.featured ? '#00f2ff' : 'rgba(0,242,255,0.2)'}` }}
        >
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-xs text-accent/40">{project.number}</span>
            <div className="flex items-baseline gap-3 mt-1">
              <h3 className="font-display text-xl font-black text-white tracking-wider">{project.name}</h3>
              <span className="font-mono text-xs text-accent/60 hidden sm:inline">{project.full}</span>
            </div>
            <p className="font-mono text-xs text-accent/50 mt-1">{project.tagline}</p>
          </div>
          {project.featured && (
            <span className="shrink-0 font-mono text-xs text-accent px-2 py-1" style={{ border: '1px solid rgba(0,242,255,0.3)', background: 'rgba(0,242,255,0.05)' }}>
              ★ FEATURED
            </span>
          )}
        </div>

        <p className="text-white/45 text-sm leading-relaxed flex-1">{project.description}</p>

        <ul className="space-y-1">
          {project.highlights.map(h => (
            <li key={h} className="flex items-center gap-2 font-mono text-xs text-white/35">
              <span className="text-accent/60">›</span> {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span key={t} className="px-2 py-0.5 font-mono text-xs text-white/35" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Magnet strength={0.4}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:text-accent"
              style={{ border: '1px solid rgba(255,255,255,0.1)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
              data-cursor="GITHUB"
            >
              <GitHubIcon /> GitHub
            </a>
          </Magnet>
          <Magnet strength={0.4}>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:text-accent"
                style={{ border: '1px solid rgba(255,255,255,0.1)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
                data-cursor="DEMO"
              >
                Demo
              </a>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-white/20"
                style={{ border: '1px solid rgba(255,255,255,0.05)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                Demo
              </span>
            )}
          </Magnet>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden">
      <motion.div style={{ y: numY }} className="absolute right-8 top-12 font-display text-8xl md:text-[160px] font-black text-white/[0.03] select-none pointer-events-none leading-none">03</motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -80, scale: 0.9 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent/60 tracking-widest">03 — BUILDS</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            <TrueFocus text="Featured Projects" className="text-white" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} inView={inView} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-8 text-center">
          <Magnet strength={0.3}>
            <a href="https://github.com/arman29-dev?tab=repositories" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-accent/60"
              style={{ border: '1px solid rgba(0,242,255,0.15)' }}
              data-cursor="VIEW ALL"
            >
              <GitHubIcon /> View all repositories
            </a>
          </Magnet>
        </motion.div>
      </div>
    </section>
  )
}

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
