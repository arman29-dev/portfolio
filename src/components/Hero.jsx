import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring as useMotionSpring } from 'framer-motion'
import { Canvas, useThree } from '@react-three/fiber'
import SplitText from './reactbits/SplitText'
import DecryptedText from './reactbits/DecryptedText'
import Magnet from './reactbits/Magnet'
import LaptopModel from './LaptopModel'

function TransparentBg() {
  const { gl } = useThree()
  useEffect(() => { gl.setClearColor(0x000000, 0) }, [gl])
  return null
}

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [canvasReady, setCanvasReady] = useState(false)

  // Separate parallax MotionValues from the float animation
  const rawParallaxX = useMotionValue(0)
  const rawParallaxY = useMotionValue(0)
  const parallaxX = useMotionSpring(rawParallaxX, { stiffness: 80, damping: 20 })
  const parallaxY = useMotionSpring(rawParallaxY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const handler = (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5)
      const my = (e.clientY / window.innerHeight - 0.5)
      setMouse({ x: mx, y: my })
      rawParallaxX.set(mx * -25)
      rawParallaxY.set(my * -20)
    }
    window.addEventListener('mousemove', handler)
    const t = setTimeout(() => setCanvasReady(true), 100)
    return () => { window.removeEventListener('mousemove', handler); clearTimeout(t) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex items-center">
      {/* Brutal grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,242,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,242,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Brutal top bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />
      <div className="absolute top-16 left-0 right-0 h-px bg-accent/10" />

      {/* Side index */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:flex">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-accent/40" />
        <span className="font-mono text-xs text-accent/30 tracking-widest" style={{ writingMode: 'vertical-rl' }}>SECTION 01 — HERO</span>
        <div className="w-px h-20 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

          {/* LEFT — Text */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs tracking-widest"
              style={{ border: '1px solid rgba(0,242,255,0.25)', borderLeft: '3px solid #00f2ff', background: 'rgba(0,242,255,0.04)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite' }} />
              AVAILABLE FOR HIRE
            </motion.div>

            {/* Name — brutalist oversized */}
            <div>
              <SplitText
                text="ARMAN"
                delay={0.2}
                stagger={0.06}
                tag="h1"
                className="font-display block leading-none"
                style={{ fontSize: 'clamp(4rem, 11.2vw, 8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}
              />
              <SplitText
                text="DAS"
                delay={0.5}
                stagger={0.08}
                tag="h1"
                className="font-display block leading-none glow-text"
                style={{ fontSize: 'clamp(4rem, 11.2vw, 8rem)', fontWeight: 900, color: '#00f2ff', letterSpacing: '-0.02em', WebkitTextStroke: '1px rgba(0,242,255,0.4)' }}
              />
            </div>

            {/* Brutal divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 max-w-16 bg-accent" />
              <span className="font-mono text-xs text-accent/50 tracking-widest">BACKEND × IoT × AI</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Tagline */}
            <div className="font-mono text-sm text-white/50 leading-relaxed max-w-md">
              <DecryptedText
                text="Engineering the intersection of Neural Logic, IoT, and Immersive Design."
                delay={1200}
                speed={25}
              />
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Magnet strength={0.5}>
                <a
                  href="https://github.com/arman29-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-bold tracking-widest text-dark"
                  style={{
                    background: 'linear-gradient(135deg, #00f2ff, #0099bb)',
                    boxShadow: '0 0 40px rgba(0,242,255,0.35), 4px 4px 0px rgba(0,242,255,0.4)',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}
                >
                  <GitHubIcon /> GitHub
                </a>
              </Magnet>

              <Magnet strength={0.5}>
                <a
                  href="/portfolio/Arman_Das_Resume.pdf"
                  download="Arman_Das_Resume.pdf"
                  data-cursor="DOWNLOAD"
                  className="flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-bold tracking-widest text-accent"
                  style={{
                    border: '1px solid rgba(0,242,255,0.5)',
                    boxShadow: '0 0 20px rgba(0,242,255,0.1), 4px 4px 0px rgba(0,242,255,0.2)',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                    background: 'rgba(0,242,255,0.04)',
                  }}
                >
                  <DownloadIcon /> Resume
                </a>
              </Magnet>
            </div>

            {/* Stats row — brutalist */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-px pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { n: '4+', l: 'Projects' },
                { n: '3mo', l: 'Internship' },
                { n: '3', l: 'Certs' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }
                  }}
                  className="text-center py-4" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-display text-2xl font-black text-accent" style={{ textShadow: '0 0 20px rgba(0,242,255,0.5)' }}>{s.n}</div>
                  <div className="font-mono text-xs text-white/30 tracking-widest mt-1">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D Laptop + Profile */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center" style={{ height: '520px' }}>
            {/* Profile photo with parallax */}
            <motion.div
              className="absolute right-0 md:right-[-2rem] z-20"
              style={{ x: parallaxX, y: parallaxY, bottom: '63%', right: '-3rem' }}
            >
              {/* Float animation on inner wrapper so it doesn't conflict with parallax y */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
              <div
                className="relative w-40 h-40 md:w-52 md:h-52 overflow-hidden"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  border: '1px solid rgba(0,242,255,0.4)',
                  boxShadow: '0 0 30px rgba(0,242,255,0.25), inset 0 0 20px rgba(0,242,255,0.05)',
                  background: '#000',
                }}
              >
                <img
                  src="/portfolio/profile.png"
                  alt="Arman Das"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(1.1)', mixBlendMode: 'screen' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.08), transparent)' }} />
                {/* Scanlines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,255,0.03) 2px, rgba(0,242,255,0.03) 4px)',
                  pointerEvents: 'none'
                }} />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3" style={{ borderTop: '2px solid #00f2ff', borderLeft: '2px solid #00f2ff' }} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3" style={{ borderBottom: '2px solid #00f2ff', borderRight: '2px solid #00f2ff' }} />
              <div className="absolute -bottom-6 left-0 font-mono text-xs text-accent/50 tracking-widest whitespace-nowrap">[ARMAN.DAS]</div>
              </motion.div>
            </motion.div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-10" style={{ background: 'transparent' }}>
              {canvasReady && (
                <Canvas
                  camera={{ position: [0, 0.8, 5.5], fov: 42 }}
                  gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                  dpr={[1, 1.5]}
                  onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                >
                  <TransparentBg />
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
                  <pointLight position={[-3, 2, 2]} color="#00f2ff" intensity={2} distance={8} />
                  <pointLight position={[3, -2, -2]} color="#003344" intensity={0.5} distance={6} />
                  <LaptopModel mouseX={mouse.x} mouseY={mouse.y} />
                </Canvas>
              )}
            </div>

            {/* Floating code snippet */}
            <motion.div
              className="absolute top-12 left-2 z-20 font-mono text-xs glass-card px-3 py-2 hidden md:block"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ maxWidth: '180px', borderLeft: '2px solid #00f2ff' }}
            >
              <div className="text-accent/40 text-xs">// current stack</div>
              <div className="text-accent/80 text-xs mt-1">FastAPI + Flutter</div>
              <div className="text-white/40 text-xs">+ JWT + MySQL</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
