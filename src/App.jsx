import { motion, useScroll, useSpring } from 'framer-motion'
import Background from './components/Background'
import CrosshairCursor from './components/reactbits/CrosshairCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay" />

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9997] origin-left"
        style={{
          scaleX,
          height: '2px',
          background: 'linear-gradient(90deg, #00f2ff, rgba(0,242,255,0.3))',
          boxShadow: '0 0 8px rgba(0,242,255,0.6)',
        }}
      />

      {/* Scroll-reactive 3D Background */}
      <Background scrollProgress={scrollYProgress} />

      {/* Crosshair Cursor — desktop only */}
      <div className="hidden md:block">
        <CrosshairCursor />
      </div>

      <Nav />

      <main className="relative z-10">
        <Hero />
        {/* Section dividers */}
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
