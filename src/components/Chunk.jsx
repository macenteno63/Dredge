import terrainVertexShader from '../shaders/test/vertex.glsl'
import terrainFragmentShader from '../shaders/test/fragment.glsl'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import CMS from 'three-custom-shader-material'
console.log(terrainVertexShader, terrainFragmentShader)
import { useEffect, useMemo, useRef } from 'react'
import { useControls } from 'leva'

// const material = new CustomShaderMaterial({
//     // CSM
//     baseMaterial: THREE.MeshStandardMaterial,
//     vertexShader: terrainVertexShader,
//     fragmentShader: terrainFragmentShader,
//     silent: true,

//     // MeshStandardMaterial
//     metalness: 0,
//     roughness: 0.5,
//     color: '#85d534',
// })


const Chunk = () => {
  const geometryRef = useRef();
  // const test = useControls("Colors", {
  //   colorWaterDeep: {value:'#002b3d',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  //   colorWaterSurface: {value:'#66a8ff',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  //   colorSand: {value:'#ffe894',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  //   colorGrass: {value:'#85d534',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  //   colorSnow: {value:'#ffffff',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  //   colorRock: {value:'#bfbd8d',onChange:(value)=>{uniforms.uColorWaterDeep.value = new THREE.Color(value)}},
  // })

  const uniforms = useMemo(
    () => ({
      uPositionFrequency: { value: 0.1 },
      uStrength: { value: 2.5 },
      uWarpFrequency: { value: 5 },
      uWarpStrength: { value: 0.8 },
      uColorWaterDeep: {value: new THREE.Color("#002b3d")},
      uColorWaterSurface: { value: new THREE.Color('#e2e5a9')},
      uColorSand: {value : new THREE.Color('#ffe894')},
      uColorGrass: {value : new THREE.Color('#85d534')},
      uColorSnow: {value : new THREE.Color('#ffffff')},
      uColorRock: {value : new THREE.Color('#bfbd8d')},
      uRandomSeed: { value: Math.random() }, // Ajout de la graine aléatoire
    }),
    []
  );
  
  const terrainControl = useControls("Terrain", {
    uPositionFrequency: {
      value: uniforms.uPositionFrequency.value,
      min: 0,
      max: 1,
      onChange: (value) => {
        uniforms.uPositionFrequency.value = value;
      }
    },
    uStrength: {
      value: uniforms.uStrength.value,
      min: 0,
      max: 10,
      onChange: (value) => {
        uniforms.uStrength.value = value;
      }
    },
    uWarpFrequency: {
      value: uniforms.uWarpFrequency.value,
      min: 0,
      max: 10,
      onChange: (value) => {
        uniforms.uWarpFrequency.value = value;
      }
    },
    uWarpStrength: {
      value: uniforms.uWarpStrength.value,
      min: 0,
      max: 10,
      onChange: (value) => {
        uniforms.uWarpStrength.value = value;
      }
    },
  })
  const colorControl = useControls("Colors", {
    uColorWaterDeep: {
      value: `#${uniforms.uColorWaterDeep.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorWaterDeep.value.set(value);
      }
    },
    uColorWaterSurface: {
      value: `#${uniforms.uColorWaterSurface.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorWaterSurface.value.set(value);
      }
    },
    uColorSand: {
      value: `#${uniforms.uColorSand.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorSand.value.set(value);
      }
    },
    uColorGrass: {
      value: `#${uniforms.uColorGrass.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorGrass.value.set(value);
      }
    },
    uColorSnow: {
      value: `#${uniforms.uColorSnow.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorSnow.value.set(value);
      }
    },
    uColorRock: {
      value: `#${uniforms.uColorRock.value.getHexString()}`,
      onChange: (value) => {
        uniforms.uColorRock.value.set(value);
      }
    },
  });
  const depthMaterial = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshDepthMaterial,
      vertexShader: terrainVertexShader,
      uniforms: uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthPacking: THREE.RGBADepthPacking,
    });
  }, []);

  useEffect(() => {
    if (geometryRef.current) {
      // Rotation de la géométrie
      geometryRef.current.rotateX(Math.PI * - 0.5);
      geometryRef.current.deleteAttribute('uv')
      geometryRef.current.deleteAttribute('normal')
    }
  }, []);
  return (
      <>
        <mesh receiveShadow castShadow customDepthMaterial={depthMaterial}>
            <planeGeometry  ref={geometryRef} args={[10, 10,300,300]}/>
            <CMS
                baseMaterial={THREE.MeshStandardMaterial}
                vertexShader={terrainVertexShader}
                fragmentShader={terrainFragmentShader}
                color={'#85d534'}
                metalness={0}
                roughness={0.5}
                uniforms={uniforms}
                
            />
        </mesh>
        <mesh rotation-x={-Math.PI * 0.5} position-y={-0.1} receiveShadow>
          <planeGeometry args={[10, 10,1,1]}/>
          {/* <meshStandardMaterial transparent={true} opacity={0.85} roughness={0}/> */}
          <meshPhysicalMaterial transmission={1} roughness={0.1} color={"#4edee8"}/>
        </mesh>
      </>
  )
}

export default Chunk