import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Screen() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512; canvas.height = 320
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000810'
    ctx.fillRect(0, 0, 512, 320)
    const lines = [
      '> npm run dev',
      'const api = new FastAPI()',
      'async def route(req: Request):',
      '  data = await req.json()',
      '  return Response(data)',
      '',
      'class DeviceNetwork:',
      '  def __init__(self):',
      '    self.nodes = []',
      '    self.jwt = JWT(secret)',
      '',
      '> Server running on :8000',
      '> Hot reload active...',
    ]
    ctx.font = '14px "Courier New"'
    lines.forEach((line, i) => {
      ctx.fillStyle = i % 3 === 0 ? '#00f2ff' : i % 3 === 1 ? 'rgba(0,242,255,0.7)' : 'rgba(0,242,255,0.4)'
      ctx.fillText(line, 16, 30 + i * 22)
    })
    ctx.fillStyle = '#00f2ff'
    ctx.fillRect(16, 308, 8, 14)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh position={[0, 0, 0.001]}>
      <planeGeometry args={[2.2, 1.4]} />
      <meshStandardMaterial map={texture} emissive="#001a20" emissiveIntensity={0.5} />
    </mesh>
  )
}

// Laptop modeled with hinge at y=0, base going down, lid going up+back
// Base: thickness 0.12, depth 1.6, width 2.8
// Lid pivots from the back edge of the base (z = -0.8), opened ~105°
export default function LaptopModel({ mouseX = 0, mouseY = 0 }) {
  const groupRef = useRef()

  const BASE_Y = -1.12

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = BASE_Y + Math.sin(t * 0.8) * 0.06
    groupRef.current.rotation.y = mouseX * 0.35 + Math.sin(t * 0.3) * 0.04
    groupRef.current.rotation.x = mouseY * -0.15
  })

  // Lid open angle: ~105° from flat = -1.83 rad from base plane
  // Hinge is at y=0, z=-0.8 (back edge of base)
  const lidAngle = -0.38 // tilted more toward camera

  return (
    <group ref={groupRef} position={[-0.85, -1.12, 0]} scale={0.9}>
      {/* ── BASE ── */}
      {/* Main chassis */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[2.8, 0.12, 1.6]} />
        <meshStandardMaterial color="#2e4a6e" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Top surface (keyboard deck) */}
      <mesh position={[0, 0.001, 0.05]}>
        <boxGeometry args={[2.5, 0.005, 1.4]} />
        <meshStandardMaterial color="#1e3550" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Key rows */}
      {[-0.7, -0.25, 0.2, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.005, -0.05]}>
          <boxGeometry args={[0.38, 0.004, 0.09]} />
          <meshStandardMaterial color="#3a5f85" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
      {/* Trackpad */}
      <mesh position={[0, 0.004, 0.45]}>
        <boxGeometry args={[0.85, 0.003, 0.5]} />
        <meshStandardMaterial color="#1a3048" metalness={0.55} roughness={0.35} />
      </mesh>
      {/* Accent strip along front edge */}
      <mesh position={[0, -0.001, 0.8]}>
        <boxGeometry args={[2.8, 0.008, 0.02]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.8} />
      </mesh>

      {/* ── LID (pivots from back edge of base) ── */}
      <group position={[0, 0, -0.8]} rotation={[lidAngle, 0, 0]}>
        {/* Lid frame — center of lid is half its height up from hinge */}
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[2.8, 1.9, 0.1]} />
          <meshStandardMaterial color="#2e4a6e" metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Inner bezel */}
        <mesh position={[0, 0.95, 0.052]}>
          <boxGeometry args={[2.55, 1.65, 0.005]} />
          <meshStandardMaterial color="#050d14" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Screen content */}
        <group position={[0, 0.95, 0.058]}>
          <Screen />
        </group>
        {/* Screen glow — soft, in front of screen */}
        <pointLight position={[0, 0.95, 0.5]} color="#00f2ff" intensity={1.2} distance={3} />
        {/* Hinge bar */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 2.9, 12]} />
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Ambient fill light from screen */}
      <pointLight position={[0, 0.8, 1.2]} color="#00f2ff" intensity={0.4} distance={4} />
    </group>
  )
}
