import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

function OrbitRing({ radius, tilt, speed, color, dotCount = 6 }) {
  const groupRef = useRef()
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.z += speed
  })
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <Torus args={[radius, 0.008, 6, 80]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.5} />
      </Torus>
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function GlobeModel() {
  const globeRef = useRef()

  const edgesGeo = useMemo(() => {
    const sphere = new THREE.SphereGeometry(1.01, 18, 12)
    const edges = new THREE.EdgesGeometry(sphere)
    sphere.dispose()
    return edges
  }, [])

  useEffect(() => () => edgesGeo.dispose(), [edgesGeo])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.18
      globeRef.current.position.y = Math.sin(t * 0.6) * 0.05
    }
  })

  return (
    <group scale={1.1}>
      <group ref={globeRef}>
        <Sphere args={[1, 48, 32]}>
          <meshStandardMaterial color="#020d16" emissive="#001824" emissiveIntensity={0.5} metalness={0.2} roughness={0.8} />
        </Sphere>
        {/* Wireframe — no independent rotation; inherits from globeRef */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#00f2ff" transparent opacity={0.12} />
        </lineSegments>
        <mesh position={[0, 1.01, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -1.01, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
        </mesh>
      </group>

      <OrbitRing radius={1.5} tilt={0.3} speed={0.008} color="#00f2ff" dotCount={4} />
      <OrbitRing radius={1.9} tilt={-0.6} speed={-0.005} color="#00aacc" dotCount={6} />
      <OrbitRing radius={2.3} tilt={1.1} speed={0.003} color="#007799" dotCount={3} />

      <pointLight position={[2, 2, 2]} color="#00f2ff" intensity={1.5} distance={6} />
      <pointLight position={[-2, -1, -2]} color="#003344" intensity={0.8} distance={5} />
    </group>
  )
}
