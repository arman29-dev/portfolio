import { useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

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
  draw() { this.ctx.fillStyle = this.color; this.ctx.fillRect(this.x, this.y, this.size, this.size) }
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

export default function TiltCard({
  children, className = '', style,
  maxTilt = 12, scale = 1.02, glare = true,
  pixels = false, pixelGap = 8, pixelSpeed = 35, pixelColors = '#00f2ff,#0099bb,#004466'
}) {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const pixelsRef = useRef([])
  const rafRef = useRef(null)
  const initializedRef = useRef(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(rawX, [-0.5, 0.5], ['-30%', '130%'])
  const glareY = useTransform(rawY, [-0.5, 0.5], ['-30%', '130%'])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(0,242,255,0.08), transparent 60%)`
  const scaleVal = useSpring(1, { stiffness: 300, damping: 20 })

  const initPixels = useCallback(() => {
    if (!ref.current || !canvasRef.current) return
    const rect = ref.current.getBoundingClientRect()
    const w = Math.floor(rect.width), h = Math.floor(rect.height)
    if (w === 0 || h === 0) return
    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = w; canvasRef.current.height = h
    const colorsArr = pixelColors.split(',')
    const pxs = []
    for (let x = 0; x < w; x += pixelGap) {
      for (let y = 0; y < h; y += pixelGap) {
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)]
        const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2)
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, pixelSpeed * 0.001, dist))
      }
    }
    pixelsRef.current = pxs
    initializedRef.current = true
  }, [pixelGap, pixelSpeed, pixelColors])

  const animatePixels = useCallback((fnName) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    let allIdle = true
    for (const px of pixelsRef.current) { px[fnName](); if (!px.isIdle) allIdle = false }
    if (!allIdle) rafRef.current = requestAnimationFrame(() => animatePixels(fnName))
  }, [])

  const triggerPixels = useCallback((fnName) => {
    cancelAnimationFrame(rafRef.current)
    if (!initializedRef.current) initPixels()
    rafRef.current = requestAnimationFrame(() => animatePixels(fnName))
  }, [initPixels, animatePixels])

  useEffect(() => {
    if (!pixels) return
    return () => cancelAnimationFrame(rafRef.current)
  }, [pixels])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseEnter = () => {
    scaleVal.set(scale)
    if (pixels) triggerPixels('appear')
  }

  const handleMouseLeave = () => {
    rawX.set(0); rawY.set(0); scaleVal.set(1)
    if (pixels) triggerPixels('disappear')
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, scale: scaleVal, transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {pixels && (
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      {glare && (
        <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: glareBackground, zIndex: 10 }} />
      )}
    </motion.div>
  )
}
