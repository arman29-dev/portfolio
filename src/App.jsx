import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
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

function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="section-divider origin-center"
    />
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const mainY = useTransform(scrollYProgress, [0, 1], [0, -80])

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

      {/* Scroll-reactive 3D wave grid */}
      <Background scrollProgress={scrollYProgress} />

      {/* Crosshair Cursor — desktop only */}
      <div className="hidden md:block">
        <CrosshairCursor />
      </div>

      <Nav />

      <motion.main className="relative z-10" style={{ y: mainY, perspective: '1200px' }}>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  )
}
