import { useRef, useEffect } from 'react'

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#00f2ff',
  lineWidth = '1px',
  lineHeight = '20px',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null)
  const centersRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll('span')

    const computeCenters = () => {
      const centers = []
      for (const item of items) {
        const rect = item.getBoundingClientRect()
        centers.push({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 })
      }
      centersRef.current = centers
    }

    computeCenters()
    const ro = new ResizeObserver(computeCenters)
    ro.observe(container)

    const onPointerMove = pointer => {
      const centers = centersRef.current
      for (let i = 0; i < items.length; i++) {
        const c = centers[i]
        if (!c) continue
        const b = pointer.x - c.x
        const a = pointer.y - c.y
        const dist = Math.sqrt(a * a + b * b) || 1
        const r = ((Math.acos(b / dist) * 180) / Math.PI) * (pointer.y > c.y ? 1 : -1)
        items[i].style.setProperty('--rotate', `${r}deg`)
      }
    }

    window.addEventListener('pointermove', onPointerMove)

    if (items.length) {
      const rect = items[Math.floor(items.length / 2)].getBoundingClientRect()
      onPointerMove({ x: rect.x, y: rect.y })
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      ro.disconnect()
    }
  }, [rows, columns])

  const total = rows * columns
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform'
      }}
    />
  ))

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  )
}
