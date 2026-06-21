import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Corridor({ scrollProgress }) {
  const groupRef = useRef()
  const objectsRef = useRef()

  const gridPositions = useMemo(() => {
    const W = 14, D = 80, S = 1.5
    const pts = []
    for (let x = -W / 2; x <= W / 2; x += S) {
      pts.push(x, -0.8, -D, x, -0.8, -2)
    }
    for (let z = -D; z <= -2; z += S) {
      pts.push(-W / 2, -0.8, z, W / 2, -0.8, z)
    }
    return new Float32Array(pts)
  }, [])

  const geos = useMemo(() => [
    new THREE.OctahedronGeometry(0.3),
    new THREE.IcosahedronGeometry(0.25),
    new THREE.TorusKnotGeometry(0.2, 0.08, 16, 8),
    new THREE.DodecahedronGeometry(0.22),
    new THREE.TetrahedronGeometry(0.28),
  ], [])

  const objectData = useMemo(() => {
    const items = []
    for (let i = 0; i < 24; i++) {
      items.push({
        pos: [
          (Math.random() - 0.5) * 10,
          Math.random() * 3 + 0.2,
          -(Math.random() * 70 + 4),
        ],
        geoIdx: i % geos.length,
        speed: 0.3 + Math.random() * 1.2,
        opacity: 0.06 + Math.random() * 0.18,
      })
    }
    return items
  }, [geos])

  useFrame((state) => {
    const p = typeof scrollProgress === 'object'
      ? scrollProgress.get()
      : scrollProgress

    if (!groupRef.current) return
    groupRef.current.position.z = p * -18
    groupRef.current.rotation.x = p * 0.04
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.015

    if (objectsRef.current) {
      objectsRef.current.children.forEach((child, i) => {
        if (i < objectData.length) {
          child.rotation.x += 0.008 * objectData[i].speed
          child.rotation.y += 0.015 * objectData[i].speed
          child.position.y += Math.sin(
            state.clock.elapsedTime * objectData[i].speed + i
          ) * 0.001
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gridPositions.length / 3}
            array={gridPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0.06} />
      </lineSegments>

      <group ref={objectsRef}>
        {objectData.map((obj, i) => (
          <mesh key={i} position={obj.pos}>
            <primitive object={geos[obj.geoIdx]} dispose={null} />
            <meshBasicMaterial
              color="#00f2ff"
              wireframe
              transparent
              opacity={obj.opacity}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function Background({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1, 2], fov: 70, near: 0.1, far: 90 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <fogExp2 attach="fog" args={['#000000', 0.016]} />
        <Corridor scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
