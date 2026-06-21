import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import TrueFocus from './reactbits/TrueFocus'
import Magnet from './reactbits/Magnet'
import emailjs from '@emailjs/browser'

const socials = [
  { label: 'GitHub', value: 'arman29-dev', href: 'https://github.com/arman29-dev', icon: '⬡' },
  { label: 'LinkedIn', value: 'arman-das', href: 'https://www.linkedin.com/in/arman-das', icon: 'in' },
  { label: 'Email', value: 'work.armandas@gmail.com', href: 'mailto:work.armandas@gmail.com', icon: '@' },
  { label: 'Phone', value: '+91 8745951248', href: 'tel:+918745951248', icon: '☎' },
]

function GlowInput({ label, type='text', name, placeholder, multiline=false }) {
  const [focused, setFocused] = useState(false)
  const Component = multiline ? 'textarea' : 'input'
  return (
    <div className="space-y-2">
      <label className="font-mono text-xs text-white/30 tracking-widest">{label}</label>
      <div className="relative" style={{
        border: `1px solid ${focused ? 'rgba(0,242,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: focused ? '0 0 20px rgba(0,242,255,0.1)' : 'none',
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
        transition: 'all 0.3s',
      }}>
        <Component {...(!multiline ? { type } : {})} name={name} placeholder={placeholder} rows={multiline ? 5 : undefined}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3 font-mono text-sm text-white/80 placeholder-white/20 resize-none"
        />
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const data = new FormData(e.target)

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        title: data.get('subject') || 'Portfolio Contact',
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('message'),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSubmitting(false)
      setSubmitted(true)
    }).catch(() => {
      setSubmitting(false)
      setError(true)
      e.target.reset()
    })
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 md:px-16 pb-40 overflow-hidden">
      <motion.div style={{ y: numY }} className="absolute left-8 top-12 font-display text-8xl md:text-[160px] font-black text-white/[0.03] select-none pointer-events-none leading-none">05</motion.div>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -80, scale: 0.9 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent/60 tracking-widest">05 — CONNECT</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            <TrueFocus text="Get In Touch" className="text-white" />
          </h2>
          <p className="text-white/35 font-mono text-sm mt-4 max-w-lg">Open to internships, collaborations, and full-time roles. Backend systems, IoT, AI integrations — let's build something real.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[360px]">
                  <div className="w-16 h-16 flex items-center justify-center text-2xl text-accent" style={{ border: '1px solid rgba(0,242,255,0.4)', boxShadow: '0 0 30px rgba(0,242,255,0.2)' }}>✓</div>
                  <h3 className="font-display text-lg text-accent tracking-widest">TRANSMITTED</h3>
                  <p className="font-mono text-xs text-white/30">Response incoming shortly.</p>
                </motion.div>
              ) : error ? (
                <motion.form key="form" onSubmit={handleSubmit} className="glass-card p-6 space-y-5"
                  style={{ borderTop: '2px solid rgba(255,60,60,0.3)' }}>
                  <div className="font-mono text-xs text-red-400 text-center">TRANSMISSION FAILED — TRY AGAIN OR USE DIRECT CHANNELS</div>
                  <GlowInput label="NAME" name="name" placeholder="Your name" />
                  <GlowInput label="EMAIL" name="email" type="email" placeholder="your@email.com" />
                  <GlowInput label="SUBJECT" name="subject" placeholder="What's this about?" />
                  <GlowInput label="MESSAGE" name="message" placeholder="Tell me about your project..." multiline />
                  <Magnet strength={0.3}>
                    <button type="submit" disabled={submitting}
                      className="w-full py-3 font-display text-sm tracking-widest text-dark font-bold transition-all duration-300"
                      style={{
                        background: submitting ? 'rgba(0,242,255,0.3)' : 'linear-gradient(135deg, #00f2ff, #0099bb)',
                        boxShadow: submitting ? 'none' : '0 0 30px rgba(0,242,255,0.35)',
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                      }}
                      data-cursor="SEND"
                    >
                      {submitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                    </button>
                  </Magnet>
                </motion.form>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="glass-card p-6 space-y-5"
                  style={{ borderTop: '2px solid rgba(0,242,255,0.3)' }}>
                  <GlowInput label="NAME" name="name" placeholder="Your name" />
                  <GlowInput label="EMAIL" name="email" type="email" placeholder="your@email.com" />
                  <GlowInput label="SUBJECT" name="subject" placeholder="What's this about?" />
                  <GlowInput label="MESSAGE" name="message" placeholder="Tell me about your project..." multiline />
                  <Magnet strength={0.3}>
                    <button type="submit" disabled={submitting}
                      className="w-full py-3 font-display text-sm tracking-widest text-dark font-bold transition-all duration-300"
                      style={{
                        background: submitting ? 'rgba(0,242,255,0.3)' : 'linear-gradient(135deg, #00f2ff, #0099bb)',
                        boxShadow: submitting ? 'none' : '0 0 30px rgba(0,242,255,0.35)',
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                      }}
                      data-cursor="SEND"
                    >
                      {submitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                    </button>
                  </Magnet>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="space-y-3">
            <p className="font-mono text-xs text-white/25 tracking-widest mb-6">// DIRECT CHANNELS</p>
            {socials.map((s, i) => (
              <motion.a key={s.label} href={s.href} target={s.label!=='Phone'?'_blank':undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card flex items-center gap-4 p-4 group transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                data-cursor={s.label.toUpperCase()}
              >
                <div className="w-10 h-10 flex items-center justify-center text-accent/50 group-hover:text-accent transition-colors text-sm font-mono font-bold"
                  style={{ background: 'rgba(0,242,255,0.05)', border: '1px solid rgba(0,242,255,0.1)' }}>
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs text-white/25 tracking-widest">{s.label}</div>
                  <div className="font-mono text-sm text-white/60 group-hover:text-accent transition-colors truncate">{s.value}</div>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-accent transition-colors">›</span>
              </motion.a>
            ))}

            {/* Resume download card */}
            <motion.a
              href="/portfolio/Arman_Das_Resume.pdf"
              download="Arman_Das_Resume.pdf"
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 p-4 group transition-all duration-300 mt-4"
              style={{
                border: '1px solid rgba(0,242,255,0.3)',
                background: 'rgba(0,242,255,0.04)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
              }}
              data-cursor="DOWNLOAD"
            >
              <div className="w-10 h-10 flex items-center justify-center text-accent font-mono text-lg"
                style={{ background: 'rgba(0,242,255,0.08)', border: '1px solid rgba(0,242,255,0.2)' }}>↓</div>
              <div>
                <div className="font-mono text-xs text-accent/60 tracking-widest">RESUME</div>
                <div className="font-mono text-sm text-accent">Download PDF</div>
              </div>
            </motion.a>

            <div className="flex items-center gap-2 font-mono text-xs text-white/25 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
              Available for opportunities — India / Remote
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
