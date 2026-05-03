import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TrueFocus from './reactbits/TrueFocus'
import TiltCard from './reactbits/TiltCard'

const experiences = [
  { type: 'work', title: 'Backend Developer Intern', org: 'Fusion Hive', period: 'Apr – Jun 2025',
    description: 'Built RESTful APIs and database models in a professional team. Participated in code review, version control, and agile practices using Python-based frameworks.',
    tags: ['Python', 'REST APIs', 'Git', 'Agile'] },
  { type: 'edu', title: 'B.Tech in Computer Science & Engineering', org: 'KIIT — Kalinga Institute of Industrial Technology', period: '2024 – 2027',
    description: 'Focused on backend systems, distributed computing, and AI/ML at one of India\'s top technical universities.',
    tags: ['CSE', 'Distributed Systems', 'AI/ML'] },
  { type: 'cert', title: 'GenAI Powered Data Analytics', org: 'TATA', period: '2026',
    description: 'GenAI tooling, prompt engineering, and data-driven decision making.',
    tags: ['GenAI', 'Data Analytics'] },
  { type: 'cert', title: 'Google AI Certification', org: 'Google', period: '2024',
    description: 'ML fundamentals, AI ethics, and practical ML applications.',
    tags: ['Machine Learning', 'AI Ethics'] },
  { type: 'cert', title: 'Ethical Decision Making', org: 'University of Colorado Boulder', period: '2026',
    description: 'Ethical frameworks in technology and responsible AI development.',
    tags: ['Ethics', 'Responsible AI'] },
  { type: 'edu', title: 'Diploma in Computer Science', org: 'KIIT Polytechnic', period: '2021 – 2023',
    description: 'Programming fundamentals, networking, and systems design.',
    tags: ['Programming', 'Networking'] },
]

const typeConfig = {
  work:  { label: 'Work',        color: '#00f2ff', icon: '◈' },
  edu:   { label: 'Education',   color: '#7dd3fc', icon: '◎' },
  cert:  { label: 'Certificate', color: '#a3e635', icon: '✦' },
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden">
      <div className="absolute right-8 top-12 font-display text-8xl md:text-[160px] font-black text-white/[0.03] select-none pointer-events-none leading-none">04</div>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent/60 tracking-widest">04 — JOURNEY</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            <TrueFocus text="Experience" className="text-white" />
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-5 mb-10">
          {Object.entries(typeConfig).map(([k, c]) => (
            <div key={k} className="flex items-center gap-2 font-mono text-xs text-white/30">
              <span style={{ color: c.color }}>{c.icon}</span> {c.label}
            </div>
          ))}
        </div>

        <div>
          {experiences.map((item, i) => {
            const cfg = typeConfig[item.type]
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 pb-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0 z-10 transition-all duration-300 group-hover:scale-110 font-mono text-sm"
                    style={{ background: '#000', border: `1px solid ${cfg.color}44`, color: cfg.color, boxShadow: `0 0 15px ${cfg.color}22` }}>
                    {cfg.icon}
                  </div>
                  {i < experiences.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(0,242,255,0.15), transparent)' }} />}
                </div>
                <div className="pb-6 flex-1">
                  <TiltCard
                    maxTilt={4} pixels pixelGap={8} pixelSpeed={35}
                    pixelColors={`${cfg.color},${cfg.color}88,${cfg.color}33`}
                    className="glass-card p-5 transition-all duration-500 group-hover:border-accent/25"
                    style={{ borderLeft: `2px solid ${cfg.color}44` }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="font-mono text-xs tracking-widest px-2 py-0.5 mb-2 inline-block"
                          style={{ color: cfg.color, border: `1px solid ${cfg.color}33`, background: `${cfg.color}08` }}>
                          {cfg.label}
                        </span>
                        <h3 className="font-display text-sm text-white tracking-wide block">{item.title}</h3>
                        <p className="text-accent/55 font-mono text-xs mt-0.5">{item.org}</p>
                      </div>
                      <span className="font-mono text-xs text-white/25">{item.period}</span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 font-mono text-xs text-white/30" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
