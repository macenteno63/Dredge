import React, {useEffect, useRef} from 'react'
import { shaderMaterial } from '@react-three/drei'
import vertexShader from '../shaders/wind/vertex.glsl'
import fragmentShader from '../shaders/wind/fragment.glsl'
import { extend, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { randInt } from 'three/src/math/MathUtils.js'
const NB_POINTS = 120
import * as THREE from 'three'
export const WindMaterial = shaderMaterial(
    {
        uTime: 0,
        side: THREE.DoubleSide
    },
    vertexShader,
    fragmentShader,
)
extend({ WindMaterial })

const windGeometry = () => {
    // create spiral of points
    let points = []
    let incrZ = 15
    let incrX = 5
    let incrY = 0
    for (let i = 0; i < NB_POINTS; i++) {
      let percent = i / NB_POINTS

      points.push(new THREE.Vector3(Math.sin(percent * incrX), Math.sin(percent * incrY), percent * incrZ))
    }

    // Create the flat geometry
    const geometry = new THREE.BufferGeometry()

    // create two times as many vertices as points, as we're going to push them in opposing directions to create a ribbon
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points.length * 3 * 2), 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(points.length * 2 * 2), 2))
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(points.length * 6), 1))

    points.forEach((b, i) => {
      let o = 0.1

      geometry.attributes.position.setXYZ(i * 2 + 0, b.x, b.y + o, b.z)
      geometry.attributes.position.setXYZ(i * 2 + 1, b.x, b.y - o, b.z)

      geometry.attributes.uv.setXY(i * 2 + 0, i / (points.length - 1), 0)
      geometry.attributes.uv.setXY(i * 2 + 1, i / (points.length - 1), 1)

      if (i < points.length - 1) {
        geometry.index.setX(i * 6 + 0, i * 2)
        geometry.index.setX(i * 6 + 1, i * 2 + 1)
        geometry.index.setX(i * 6 + 2, i * 2 + 2)

        geometry.index.setX(i * 6 + 0 + 3, i * 2 + 1)
        geometry.index.setX(i * 6 + 1 + 3, i * 2 + 3)
        geometry.index.setX(i * 6 + 2 + 3, i * 2 + 2)
      }
    })

    return geometry
}

const Wind = () => {
    const windMaterialRef = useRef();
    const windMeshRef = useRef();
    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 8, delay: 1 });
      
      // Animation du mouvement du vent sur l'axe XZ
      tl.to(windMeshRef.current.position, {
        x: 5, // Par exemple, se déplace de 0 à 5 sur l'axe X
        z: 10, // Par exemple, se déplace de 0 à 10 sur l'axe Z
        duration: 8, // Durée de l'animation
        ease: "power1.inOut", // Type de courbe d'animation
        repeat: -1, // Répéter à l'infini
        yoyo: true // Animation de va-et-vient
      });
    
      // Animation pour la mise à jour de uTime dans le shader
      tl.fromTo(
        windMaterialRef.current.uniforms.uTime, 
        { value: 0 }, 
        { value: 8, duration: 8, repeat: -1, yoyo: true }
      );
    
      return () => {
        tl.kill(); // Nettoie l'animation lorsque le composant est démonté
      };
    }, []);
    useFrame(({ clock }) => {

    });

  return (
    <mesh geometry={windGeometry()} position-y={0.2} scale={0.1} ref={windMeshRef}>
        <windMaterial ref={windMaterialRef}/>
    </mesh>
  )
}

export default Wind