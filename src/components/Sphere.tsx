import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere as DreiSphere } from '@react-three/drei';
import * as THREE from 'three';
import { Status } from '../hooks/useWebSocket';

type SphereProps = {
  status: Status;
  micVolume: number;
};

function AnimatedSphere({ status, micVolume }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  const colors = useMemo(
    () => ({
      idle: new THREE.Color('#4a90e2'),
      listening: new THREE.Color('#5b9bd5'),
      thinking: new THREE.Color('#f4c542'),
      speaking: new THREE.Color('#9b59b6'),
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();

    switch (status) {
      case 'idle':
        meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
        materialRef.current.color.lerp(colors.idle, 0.05);
        materialRef.current.distort = 0.2;
        materialRef.current.speed = 0.5;
        break;

      case 'listening':
        const volumeScale = 1 + micVolume * 0.3;
        meshRef.current.scale.lerp(
          new THREE.Vector3(volumeScale, volumeScale, volumeScale),
          0.1
        );
        materialRef.current.color.lerp(colors.listening, 0.05);
        materialRef.current.distort = 0.3 + micVolume * 0.5;
        materialRef.current.speed = 1 + micVolume * 2;
        break;

      case 'thinking':
        meshRef.current.rotation.y += 0.01;
        meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.03);
        materialRef.current.color.lerp(colors.thinking, 0.05);
        materialRef.current.distort = 0.15;
        materialRef.current.speed = 0.8;
        break;

      case 'speaking':
        const speakingScale = 1.1 + Math.sin(time * 3) * 0.1;
        meshRef.current.scale.lerp(
          new THREE.Vector3(speakingScale, speakingScale, speakingScale),
          0.1
        );
        materialRef.current.color.lerp(colors.speaking, 0.05);
        materialRef.current.distort = 0.4;
        materialRef.current.speed = 2;
        break;
    }
  });

  return (
    <DreiSphere ref={meshRef} args={[1, 128, 128]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#4a90e2"
        attach="material"
        distort={0.2}
        speed={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </DreiSphere>
  );
}

export function Sphere({ status, micVolume }: SphereProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedSphere status={status} micVolume={micVolume} />
      </Canvas>
    </div>
  );
}
