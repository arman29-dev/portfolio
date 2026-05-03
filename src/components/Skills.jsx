import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TrueFocus from './reactbits/TrueFocus'
import DecryptedText from './reactbits/DecryptedText'

const skillCategories = [
  { category: 'Languages', icon: '⟨/⟩', skills: [{ name: 'Python', level: 92 },{ name: 'JavaScript / TypeScript', level: 75 },{ name: 'Dart', level: 70 },{ name: 'Go (learning)', level: 30 }] },
  { category: 'Frameworks', icon: '⚙', skills: [{ name: 'FastAPI', level: 90 },{ name: 'Django', level: 88 },{ name: 'Flask', level: 85 },{ name: 'Flutter', level: 72 },{ name: 'React', level: 65 }] },
  { category: 'Databases', icon: '◈', skills: [{ name: 'MySQL', level: 85 },{ name: 'SQLite3', level: 90 },{ name: 'MongoDB', level: 65 }] },
  { category: 'Embedded / IoT', icon: '⚡', skills: [{ name: 'Raspberry Pi', level: 80 },{ name: 'Arduino', level: 75 },{ name: 'GPIO / Hardware', level: 78 },{ name: 'OpenCV', level: 70 }] },
  { category: 'Tools & Platforms', icon: '◎', skills: [{ name: 'Git / GitHub', level: 90 },{ name: 'REST APIs / JWT', level: 92 },{ name: 'Linux / Bash', level: 80 },{ name: 'Razorpay / Stripe', level: 75 }] },
  { category: 'AI / ML', icon: '◈', skills: [{ name: 'GenAI Integration', level: 70 },{ name: 'Computer Vision', level: 65 },{ name: 'Data Analytics', level: 60 }] },
]

function SkillCard({ data, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="glass-card p-5 space-y-4 group transition-all duration-500 hover:border-accent/25"
      style={{ borderTop: '1px solid rgba(0,242,255,0.15)' }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-base text-accent/70">{data.icon}</span>
        <h3 className="font-display text-xs tracking-widest text-white/70 uppercase">
          <DecryptedText text={data.category} delay={index * 150} speed={30} />
        </h3>
      </div>
      <div className="space-y-3">
        {data.skills.map((skill, i) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-mono text-xs text-white/50">{skill.name}</span>
              <span className="font-mono text-xs text-accent/50">{skill.level}%</span>
            </div>
            <div className="h-px bg-white/5 relative overflow-hidden">
              <motion.div
                className="skill-bar-fill absolute inset-y-0 left-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? skill.level / 100 : 0 }}
                transition={{ duration: 1.2, delay: index * 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden">
      <div className="absolute left-8 top-12 font-display text-8xl md:text-[160px] font-black text-white/[0.03] select-none pointer-events-none leading-none">02</div>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent/60 tracking-widest">02 — ARSENAL</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            <TrueFocus text="Technical Skills" className="text-white" />
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => <SkillCard key={cat.category} data={cat} index={i} inView={inView} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap gap-2">
          {['tmux', 'RFID', 'QR Code Auth', 'JWT', 'RESTful API', 'ORM', 'Agile', 'Code Review', 'GPIO', 'Cross-platform'].map(tag => (
            <span key={tag} className="px-3 py-1 font-mono text-xs text-white/25" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>{tag}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
