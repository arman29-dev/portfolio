import { useRef, useEffect, useState, useMemo } from 'react'

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  reveal: false,
  className: '',
  style: {},
}

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
}

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {})

const getGradientDirection = position => {
  const directions = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' }
  return directions[position] || 'to bottom'
}

const GradualBlur = props => {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const config = useMemo(() => mergeConfigs(DEFAULT_CONFIG, props), [props])

  const [isInView, setIsInView] = useState(!config.animated)
  useEffect(() => {
    if (!config.animated || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true) },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [config.animated])

  const blurDivs = useMemo(() => {
    const divs = []
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear
    const currentStrength = isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength
    const visible = config.reveal ? !isInView : isInView

    for (let i = 1; i <= config.divCount; i++) {
      const progress = curveFunc(i / config.divCount)
      const blurValue = config.exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * config.divCount + 1) * currentStrength

      const inc = 100 / config.divCount
      const p1 = inc * i - inc
      const p2 = inc * i
      const p3 = inc * i + inc
      const p4 = inc * i + inc * 2
      let gradient = `transparent ${Math.round(p1 * 10) / 10}%, black ${Math.round(p2 * 10) / 10}%`
      if (p3 <= 100) gradient += `, black ${Math.round(p3 * 10) / 10}%`
      if (p4 <= 100) gradient += `, transparent ${Math.round(p4 * 10) / 10}%`

      divs.push(
        <div key={i} style={{
          position: 'absolute', inset: 0,
          maskImage: `linear-gradient(${getGradientDirection(config.position)}, ${gradient})`,
          WebkitMaskImage: `linear-gradient(${getGradientDirection(config.position)}, ${gradient})`,
          backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
          WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
          opacity: visible ? config.opacity : 0,
          transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
        }} />
      )
    }
    return divs
  }, [config, isHovered, isInView])

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position)
    const isPageTarget = config.target === 'page'
    return {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...(isVertical ? {
        height: config.height, width: '100%',
        [config.position]: 0, left: 0, right: 0,
      } : {
        width: config.height, height: '100%',
        [config.position]: 0, top: 0, bottom: 0,
      }),
      ...config.style,
    }
  }, [config])

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="relative w-full h-full">{blurDivs}</div>
    </div>
  )
}

export default GradualBlur
