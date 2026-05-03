import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function SplitText({
  text = '',
  className = '',
  style: styleProp = {},
  delay = 0,
  duration = 0.55,
  stagger = 0.03,
  once = true,
  tag: Tag = 'span',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
    else if (!once) controls.start('hidden')
  }, [inView, controls, once])

  const words = text.split(' ')
  let charIndex = 0

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', ...styleProp }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-flex', whiteSpace: 'pre' }}>
          {word.split('').map((char) => {
            const idx = charIndex++
            return (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: {
                    opacity: 1, y: 0, rotateX: 0,
                    transition: { duration, delay: delay + idx * stagger, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial="hidden"
                animate={controls}
                style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
