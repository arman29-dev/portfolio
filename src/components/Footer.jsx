export default function Footer() {
  return (
    <footer className="relative py-8 px-6 md:px-16" style={{ borderTop: '1px solid rgba(0,242,255,0.08)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-xs font-black tracking-widest text-accent/40">AD_</span>
        <p className="font-mono text-xs text-white/20 tracking-widest">
          © {new Date().getFullYear()} ARMAN DAS — BUILT WITH REACT + THREE.JS
        </p>
        <div className="flex items-center gap-2 font-mono text-xs text-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
          ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  )
}
