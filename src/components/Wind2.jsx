import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WindLine = () => {
  const meshRef = useRef();

  // Define texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 8;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 64, 0);
    gradient.addColorStop(0.0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,128)');
    gradient.addColorStop(1.0, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 8);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Update the position of the line vertices
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
  
    const time = clock.getElapsedTime() / 8; // Adjusted speed for the animation
    const pos = meshRef.current.geometry.attributes.position;
    const line = meshRef.current;
  
    for (let i = 0; i < pos.count; i++) {
      const t = time + (i % 21) / 60;
  
      // Increase the displacement of the line while maintaining its size
      const displacementFactor = 15; // Increase this to make the line travel farther
  
      const x = displacementFactor * Math.sin(5 * line.rnda * t + 6 * line.rndb);
      const y = displacementFactor * Math.cos(5 * line.rndc * t + 6 * line.rndd);
      const z = 0.5 + 0.04 * (i > 20 ? 1 : -1) * Math.cos((i % 21 - 10) / 8);
  
      pos.setXYZ(i, x, z, -y);
    }
    pos.needsUpdate = true;  // Tell Three.js that positions have been updated
  });

  useEffect(() => {
    if (meshRef.current) {
      // Add random properties to the mesh for use in animations
      meshRef.current.rnda = Math.random();
      meshRef.current.rndb = Math.random();
      meshRef.current.rndc = Math.random();
      meshRef.current.rndd = Math.random();
    }
  }, []);

  return (
    <mesh ref={meshRef} scale={0.2} rotation-y={Math.PI * -0.5}>
      <planeGeometry args={[1, 1, 20, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

export default WindLine;
