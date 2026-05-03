import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TrueFocus({ text = '', className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ filter: 'blur(12px)', opacity: 0, letterSpacing: '0.3em' }}
      animate={inView ? { filter: 'blur(0px)', opacity: 1, letterSpacing: 'inherit' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  )
}
