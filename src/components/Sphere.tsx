import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Status } from '../hooks/useWebSocket';

type SphereProps = {
  status: Status;
  micVolume: number;
};

// ── Color palette per state ──────────────────────────────────────────────────
const STATE_CONFIG = {
  idle: {
    color: '#7C3AED',
    emissive: '#3B0764',
    emissiveIntensity: 0.3,
    distort: 0.2,
    speed: 1.0,
    particleColor: '#A855F7',
    light1: '#7C3AED',
    light2: '#A855F7',
  },
  listening: {
    color: '#A855F7',
    emissive: '#6D28D9',
    emissiveIntensity: 0.45,
    distort: 0.35,
    speed: 2.0,
    particleColor: '#C084FC',
    light1: '#A855F7',
    light2: '#C084FC',
  },
  thinking: {
    color: '#FFB800',
    emissive: '#D97706',
    emissiveIntensity: 0.4,
    distort: 0.15,
    speed: 1.5,
    particleColor: '#FCD34D',
    light1: '#FFB800',
    light2: '#D97706',
  },
  speaking: {
    color: '#FF6B00',
    emissive: '#FF2D00',
    emissiveIntensity: 0.55,
    distort: 0.45,
    speed: 3.0,
    particleColor: '#FF8C00',
    light1: '#FF6B00',
    light2: '#FF4500',
  },
};

// ── Expanding sound-wave ring (for speaking state) ───────────────────────────
function SpeakingRing({ delay }: { delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.elapsedTime * 0.75 + delay) % 2) / 2;
    meshRef.current.scale.setScalar(1 + t * 3.0);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.max(0, (1 - t) * 0.5);
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.92, 0.016, 8, 128]} />
      <meshBasicMaterial
        color="#FF6B00"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Animated orbit rings ─────────────────────────────────────────────────────
function OrbitRings({ status }: { status: Status }) {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const config = STATE_CONFIG[status];

  useFrame(() => {
    if (!ring1Ref.current || !ring2Ref.current) return;
    ring1Ref.current.rotation.x += 0.0045;
    ring1Ref.current.rotation.y += 0.006;
    ring2Ref.current.rotation.x -= 0.003;
    ring2Ref.current.rotation.z += 0.005;

    (ring1Ref.current.material as THREE.MeshBasicMaterial).color.lerp(
      new THREE.Color(config.light1),
      0.04
    );
    (ring2Ref.current.material as THREE.MeshBasicMaterial).color.lerp(
      new THREE.Color(config.color),
      0.04
    );
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.52, 0.012, 8, 128]} />
        <meshBasicMaterial color={config.light1} transparent opacity={0.28} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[1.72, 0.008, 8, 128]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.18} />
      </mesh>
    </>
  );
}

// ── Floating particle field ──────────────────────────────────────────────────
function Particles({ status }: { status: Status }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const config = STATE_CONFIG[status];

  const geometry = useMemo(() => {
    const count = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.9 + Math.random() * 2.0;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.07;
    pointsRef.current.rotation.x = t * 0.035;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.color.lerp(new THREE.Color(config.particleColor), 0.05);
    mat.size = status === 'speaking'
      ? 0.04 + Math.abs(Math.sin(t * 7)) * 0.02
      : 0.018;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.018}
        color="#A855F7"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// ── Dynamic colored lights ───────────────────────────────────────────────────
function DynamicLights({ status }: { status: Status }) {
  const light1Ref = useRef<THREE.PointLight>(null!);
  const light2Ref = useRef<THREE.PointLight>(null!);
  const config = STATE_CONFIG[status];

  useFrame(() => {
    if (!light1Ref.current || !light2Ref.current) return;
    light1Ref.current.color.lerp(new THREE.Color(config.light1), 0.05);
    light2Ref.current.color.lerp(new THREE.Color(config.light2), 0.05);
  });

  return (
    <>
      <pointLight ref={light1Ref} position={[4, 3, 4]} intensity={2.5} color="#7C3AED" />
      <pointLight ref={light2Ref} position={[-4, -3, -3]} intensity={2.0} color="#A855F7" />
      <pointLight position={[0, -4, 2]} intensity={0.8} color="#FF4500" />
    </>
  );
}

// ── Main animated sphere ─────────────────────────────────────────────────────
function AnimatedSphere({ status, micVolume }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const config = STATE_CONFIG[status];

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = clock.elapsedTime;

    // Smooth color transition on material
    materialRef.current.color?.lerp(new THREE.Color(config.color), 0.05);
    materialRef.current.emissive?.lerp(new THREE.Color(config.emissive), 0.05);

    if (status === 'idle') {
      const scale = 1 + Math.sin(t * 0.55) * 0.045;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y += 0.003;
      materialRef.current.distort = 0.2 + Math.sin(t * 0.55) * 0.04;
      materialRef.current.speed = 1;
    } else if (status === 'listening') {
      const vol = micVolume || 0;
      const target = 1 + vol * 0.4 + Math.sin(t * 3) * 0.03;
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
      meshRef.current.rotation.y += 0.01 + vol * 0.025;
      materialRef.current.distort = 0.28 + vol * 0.55;
      materialRef.current.speed = 1.5 + vol * 3;
    } else if (status === 'thinking') {
      meshRef.current.rotation.y += 0.075;
      meshRef.current.rotation.z = Math.sin(t * 1.2) * 0.12;
      const scale = 1 + Math.sin(t * 2.2) * 0.055;
      meshRef.current.scale.setScalar(scale);
      materialRef.current.distort = 0.15 + Math.sin(t * 2) * 0.04;
      materialRef.current.speed = 1.5;
    } else if (status === 'speaking') {
      // Multi-frequency talking animation — layered sine waves simulate speech rhythm
      const talk =
        Math.sin(t * 7.0) * 0.09 +
        Math.sin(t * 13.5) * 0.045 +
        Math.sin(t * 21.0) * 0.02;
      const target = 1.06 + talk;
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
      meshRef.current.rotation.y += 0.018;
      materialRef.current.distort = 0.42 + Math.abs(Math.sin(t * 7)) * 0.22;
      materialRef.current.speed = 3 + Math.sin(t * 4) * 1.2;
    }

    // Glow sphere mirrors core
    if (glowRef.current) {
      glowRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.13);
      (glowRef.current.material as THREE.MeshBasicMaterial).color.lerp(
        new THREE.Color(config.color),
        0.06
      );
    }
  });

  return (
    <>
      {/* Atmospheric outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.13, 32, 32]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Core distorted sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={config.emissiveIntensity}
          distort={config.distort}
          speed={config.speed}
          roughness={0.08}
          metalness={0.25}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Orbiting rings */}
      <OrbitRings status={status} />

      {/* Sound-wave expanding rings when speaking */}
      {status === 'speaking' && (
        <>
          <SpeakingRing delay={0} />
          <SpeakingRing delay={0.67} />
          <SpeakingRing delay={1.33} />
        </>
      )}

      {/* Particle cloud */}
      <Particles status={status} />
    </>
  );
}

// ── Exported component ───────────────────────────────────────────────────────
export function Sphere({ status, micVolume }: SphereProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 44 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.22} />
        <DynamicLights status={status} />
        <AnimatedSphere status={status} micVolume={micVolume} />
      </Canvas>
    </div>
  );
}
