import { shaderMaterial } from "@react-three/drei";
import { Color, RGBAFormat } from "three";
import { useControls } from "leva";
import { extend, useFrame } from '@react-three/fiber'
import waterVertexShader from '../shaders/water/waterVertexShader.glsl';
import waterFragmentShader from '../shaders/water/waterFragmentShader.glsl';
import { useRef } from "react";
import useGame from '../stores/Game.jsx'
import * as THREE from 'three'

export const WaterMaterial = shaderMaterial(
  {
    uColor: new Color("skyblue"),
    uOpacity: 0.8,
    uTime: 0,
    uSpeed: 0.5,
    uRepeat: 20.0,
    uNoiseType: 0,
    uFoam: 0.4,
    uFoamTop: 0.7,
  },
  waterVertexShader,
  waterFragmentShader
)
extend({ WaterMaterial });

const Water = ({ ...props }) => {
  const waterMaterialRef = useRef();
  const { waterColor, waterOpacity, speed, noiseType, foam, foamTop, repeat } =
    useControls({
      waterOpacity: { value: 0.9, min: 0, max: 1 },
      waterColor: "#268c9a",
      speed: { value: 0.5, min: 0, max: 5 },
      repeat: {
        value: 30,
        min: 1,
        max: 100,
      },
      foam: {
        value: 0.4,
        min: 0,
        max: 1,
      },
      foamTop: {
        value: 0.7,
        min: 0,
        max: 1,
      },
      noiseType: {
        value: 0,
        options: {
          Perlin: 0,
          Voronoi: 1,
        },
      },
    });

  useFrame(({ clock }) => {
    if (waterMaterialRef.current) {
      waterMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      const boatPosition = useGame.getState().boatPosition
      
      waterMaterialRef.current.uniforms.uBoatPosition = new THREE.Vector2(boatPosition.x,boatPosition.z)
    }
  });

  return (
    <mesh {...props} receiveShadow>
      <planeGeometry args={[10, 10, 15, 15]} />
      <waterMaterial
        ref={waterMaterialRef}
        uColor={new Color(waterColor)}
        transparent
        uOpacity={waterOpacity}
        uNoiseType={noiseType}
        uSpeed={speed}
        uRepeat={repeat}
        uFoam={foam}
        uFoamTop={foamTop}
        uRippleStrength={10}
      />
      {/* <meshStandardMaterial color="skyblue" /> */}
    </mesh>
  );
};

export default Water;