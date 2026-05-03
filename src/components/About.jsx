import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import TrueFocus from './reactbits/TrueFocus'
import GlobeModel from './GlobeModel'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden">
      {/* Brutal section number */}
      <div className="absolute right-8 top-12 font-display text-8xl md:text-[160px] font-black text-white/[0.03] select-none pointer-events-none leading-none">01</div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent/60 tracking-widest">01 — PROFILE</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            <TrueFocus text="About Me" className="text-white" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Globe canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-2 relative"
            style={{ height: '380px' }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
              <ambientLight intensity={0.2} />
              <GlobeModel />
            </Canvas>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)' }} />
            {/* Brutal label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-accent/40 tracking-widest whitespace-nowrap">
              [ NEURAL.NETWORK.ACTIVE ]
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-white/60 font-body leading-relaxed text-base">
              I'm a CS undergrad at <span className="text-accent">KIIT</span>, building real-world systems at the intersection of backend engineering, embedded hardware, and AI integration.
            </p>
            <p className="text-white/45 font-body leading-relaxed">
              From cashless fintech systems scanning RFID cards on Raspberry Pi, to distributed device networks linking phones and PCs via QR codes — I ship systems that work in the physical world.
            </p>

            {/* Code block */}
            <div
              className="font-mono text-xs p-4 rounded"
              style={{ background: 'rgba(0,242,255,0.03)', border: '1px solid rgba(0,242,255,0.12)', borderLeft: '3px solid #00f2ff' }}
            >
              {[
                { keyword: 'const', name: ' arman', op: ' =', rest: ' {' },
                { indent: '  ', key: 'location', val: '"India 🇮🇳"', comma: ',' },
                { indent: '  ', key: 'focus', val: '["Backend", "IoT", "AI/ML"]', comma: ',' },
                { indent: '  ', key: 'learning', val: '"Go lang"', comma: ',' },
                { indent: '  ', key: 'available', val: 'true', comma: '' },
                { close: '}' },
              ].map((row, i) => (
                <div key={i} className="leading-6">
                  {row.close ? (
                    <span className="text-accent/60">{row.close}</span>
                  ) : row.keyword ? (
                    <>
                      <span className="text-accent/60">{row.keyword}</span>
                      <span className="text-white/70">{row.name}</span>
                      <span className="text-accent/40">{row.op}</span>
                      <span className="text-white/50">{row.rest}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white/30">{row.indent}</span>
                      <span className="text-accent/70">{row.key}</span>
                      <span className="text-white/30">: </span>
                      <span className="text-green-400/70">{row.val}</span>
                      <span className="text-white/30">{row.comma}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Currently */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                'B.Tech CSE @ KIIT (2024–27)',
                'Interned @ Fusion Hive',
                'Exploring Go + AI tooling',
                'Open to internships & collabs',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 font-mono text-xs text-white/40">
                  <span className="text-accent mt-0.5 shrink-0">›</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
