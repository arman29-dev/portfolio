import { useEffect, useRef, useCallback } from 'react'

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.ctx = context
    this.x = x; this.y = y; this.color = color
    this.speed = (Math.random() * 0.8 + 0.1) * speed
    this.size = 0; this.sizeStep = Math.random() * 0.4
    this.minSize = 0.5; this.maxSize = Math.random() * 1.5 + 0.5
    this.delay = delay; this.counter = 0
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01
    this.isIdle = false; this.isReverse = false; this.isShimmer = false
  }
  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  appear() {
    this.isIdle = false
    if (this.counter <= this.delay) { this.counter += this.counterStep; return }
    if (this.size >= this.maxSize) this.isShimmer = true
    if (this.isShimmer) {
      if (this.size >= this.maxSize) this.isReverse = true
      else if (this.size <= this.minSize) this.isReverse = false
      this.size += this.isReverse ? -this.speed : this.speed
    } else { this.size += this.sizeStep }
    this.draw()
  }
  disappear() {
    this.isShimmer = false; this.counter = 0
    if (this.size <= 0) { this.isIdle = true; return }
    this.size -= 0.1; this.draw()
  }
}

export default function PixelCard({ children, className = '', gap = 8, speed = 35, colors = '#00f2ff,#0099bb,#004466' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const pixelsRef = useRef([])
  const rafRef = useRef(null)
  const initializedRef = useRef(false)

  const init = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const w = Math.floor(rect.width)
    const h = Math.floor(rect.height)
    if (w === 0 || h === 0) return
    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = w
    canvasRef.current.height = h
    const colorsArr = colors.split(',')
    const pxs = []
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)]
        const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2)
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, speed * 0.001, dist))
      }
    }
    pixelsRef.current = pxs
    initializedRef.current = true
  }, [gap, speed, colors])

  const animate = useCallback((fnName) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    let allIdle = true
    for (const px of pixelsRef.current) {
      px[fnName]()
      if (!px.isIdle) allIdle = false
    }
    if (!allIdle) {
      rafRef.current = requestAnimationFrame(() => animate(fnName))
    }
  }, [])

  const trigger = useCallback((fnName) => {
    cancelAnimationFrame(rafRef.current)
    if (!initializedRef.current) init()
    rafRef.current = requestAnimationFrame(() => animate(fnName))
  }, [init, animate])

  useEffect(() => {
    const ro = new ResizeObserver(() => { initializedRef.current = false })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}
      onMouseEnter={() => trigger('appear')}
      onMouseLeave={() => trigger('disappear')}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
