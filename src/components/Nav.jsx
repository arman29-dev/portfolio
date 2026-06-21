import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnet from './reactbits/Magnet'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,242,255,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleNav(e, '#hero')} className="font-display text-sm font-black tracking-widest text-accent glow-text">
          AD<span className="text-white/20">_</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => handleNav(e, item.href)} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Magnet strength={0.5}>
            <a
              href="mailto:work.armandas@gmail.com"
              className="flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-widest text-dark font-bold"
              style={{ background: 'linear-gradient(135deg, #00f2ff, #0099bb)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
              data-cursor="EMAIL"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dark/60" style={{ animation: 'pulse 2s infinite' }} />
              Hire Me
            </a>
          </Magnet>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {[0,1,2].map(i => (
            <motion.span key={i} className="block h-px bg-accent"
              animate={{ width: i===1?(menuOpen?16:24):24, opacity: i===1?(menuOpen?0:1):1, rotate: i===0?(menuOpen?45:0):i===2?(menuOpen?-45:0):0, y: i===0?(menuOpen?7:0):i===2?(menuOpen?-7:0):0 }}
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
            style={{ borderTop: '1px solid rgba(0,242,255,0.1)' }}
          >
            {navItems.map((item, i) => (
              <motion.a key={item.label} href={item.href} onClick={(e) => handleNav(e, item.href)}
                className="nav-link py-2 px-2 text-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-accent/50 mr-2 text-xs">{String(i+1).padStart(2,'0')}.</span>
                {item.label}
              </motion.a>
            ))}
            <a href="/portfolio/Arman_Das_Resume.pdf" download className="font-mono text-sm text-accent px-2 py-1" style={{ border: '1px solid rgba(0,242,255,0.3)' }}>↓ Download Resume</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
