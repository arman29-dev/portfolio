import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 4000
const MAX_EDGES = 4000

function makePath() {
  const pts = [
    [0, 0, 0],
    [2, -1, 3],
    [0, -3, 7],
    [-3, -2, 11],
    [-2, 1, 15],
    [2, 3, 19],
    [4, 1, 23],
    [3, -2, 27],
    [-1, -3, 31],
    [-3, 0, 35],
    [0, 2, 39],
    [2, -1, 43],
    [0, 0, 48],
  ].map(p => new THREE.Vector3(p[0], p[1], p[2]))
  return new THREE.CatmullRomCurve3(pts)
}

function genParticleField(path) {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const scatterR = 3.5

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random()
    const pos = path.getPointAt(t)
    const tan = path.getTangentAt(t)
    const up = Math.abs(tan.y) > 0.95
      ? new THREE.Vector3(1, 0, 0)
      : new THREE.Vector3(0, 1, 0)
    const right = new THREE.Vector3().crossVectors(tan, up).normalize()
    const localUp = new THREE.Vector3().crossVectors(right, tan).normalize()
    const angle = Math.random() * Math.PI * 2
    const radius = 0.4 + Math.random() * scatterR

    positions[i * 3] = pos.x + (Math.cos(angle) * radius * right.x + Math.sin(angle) * radius * localUp.x)
    positions[i * 3 + 1] = pos.y + (Math.cos(angle) * radius * right.y + Math.sin(angle) * radius * localUp.y)
    positions[i * 3 + 2] = pos.z + (Math.cos(angle) * radius * right.z + Math.sin(angle) * radius * localUp.z)

    const b = 0.4 + Math.random() * 0.6
    colors[i * 3] = 0
    colors[i * 3 + 1] = 0.55 * b
    colors[i * 3 + 2] = b
  }
  return positions
}

function computeEdges(pos) {
  const pairs = []
  const thresh2 = 0.55 * 0.55
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (pairs.length >= MAX_EDGES) break
    const pi = i * 3
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      if (pairs.length >= MAX_EDGES) break
      const pj = j * 3
      const dx = pos[pi] - pos[pj]
      const dy = pos[pi + 1] - pos[pj + 1]
      const dz = pos[pi + 2] - pos[pj + 2]
      if (dx * dx + dy * dy + dz * dz < thresh2) pairs.push(i, j)
    }
  }
  return new Uint16Array(pairs)
}

function makeGlowTex() {
  const c = document.createElement('canvas')
  c.width = 64; c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.1, 'rgba(255,255,255,0.75)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.08)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true; return tex
}

function genColors() {
  const a = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const b = 0.4 + Math.random() * 0.6
    a[i * 3] = 0
    a[i * 3 + 1] = 0.55 * b
    a[i * 3 + 2] = b
  }
  return a
}

function FlythroughScene({ progress }) {
  const rig = useRef()
  const pts = useRef()
  const linesRef = useRef()
  const { scene } = useThree()

  const path = useMemo(makePath, [])
  const glowTex = useMemo(makeGlowTex, [])
  const positions = useMemo(() => genParticleField(path), [path])
  const colors = useMemo(genColors, [])

  const tubeGeo = useMemo(() => {
    const g = new THREE.TubeGeometry(path, 200, 2.8, 20, false)
    return new THREE.EdgesGeometry(g)
  }, [path])

  // Compute edges and line buffer together so sizes match
  const lineData = useMemo(() => {
    const edges = computeEdges(positions)
    const eCount = edges.length / 2
    const buf = new Float32Array(eCount * 6)
    for (let ei = 0; ei < eCount; ei++) {
      const i = edges[ei * 2] * 3; const j = edges[ei * 2 + 1] * 3
      const ei6 = ei * 6
      buf[ei6] = positions[i]; buf[ei6 + 1] = positions[i + 1]; buf[ei6 + 2] = positions[i + 2]
      buf[ei6 + 3] = positions[j]; buf[ei6 + 4] = positions[j + 1]; buf[ei6 + 5] = positions[j + 2]
    }
    return { edges, eCount, buf }
  }, [positions])
  const curPos = useRef(new Float32Array(positions))

  useEffect(() => {
    scene.fog = new THREE.Fog('#000000', 6, 30)
    return () => { scene.fog = null }
  }, [scene])

  const smooth = useRef(0)

  useFrame((state, dt) => {
    if (!rig.current || !pts.current || !linesRef.current) return

    const target = progress.get() * 0.92
    smooth.current += (target - smooth.current) * Math.min(1, dt * 4)
    const p = smooth.current

    const pos = path.getPointAt(p)
    const look = path.getPointAt(Math.min(0.99, p + 0.015))
    rig.current.position.copy(pos)
    rig.current.lookAt(look)

    const r = Math.min(1, p * 7)
    const mat = pts.current.material
    mat.size = 0.06 * r
    mat.opacity = 0.9 * r
    linesRef.current.material.opacity = 0.4 * r

    // Positions never change, no needsUpdate required
  })

  return (
    <>
      <group ref={rig}>
        <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={65} near={0.1} far={60} />
      </group>

      <lineSegments geometry={tubeGeo}>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0.08} depthWrite={false} toneMapped={false} />
      </lineSegments>

      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={curPos.current} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={glowTex}
          size={0.06}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lineData.eCount * 2} array={lineData.buf} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </lineSegments>
    </>
  )
}

export default function Background({ scrollProgress }) {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: '#000000' }}>
      <Canvas
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 1)}
      >
        <FlythroughScene progress={scrollProgress} />
      </Canvas>
    </div>
  )
}
