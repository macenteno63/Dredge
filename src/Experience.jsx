import { Environment,OrbitControls,Sky,KeyboardControls,PresentationControls } from '@react-three/drei'
import { Perf } from "r3f-perf";
import { useControls } from 'leva'
import { BoatModel } from './components/Boat';
import Chunk from './components/Chunk';
import Light from './components/Light';
import  Water  from './components/Sea';
import { PivotControls } from '@react-three/drei';
import Wind from './components/Wind';
import Wind2 from './components/Wind2';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
export function CameraHelperComponent({cameraProp}) {

    let { camera,scene } = useThree()
    if (cameraProp) {
        camera = cameraProp
    }
    const helperRef = useRef()

    useEffect(() => {
        if (camera && scene) {
            console.log(camera)
            const helper = new THREE.CameraHelper(camera)
            scene.add(helper)
            helperRef.current = helper

            return () => {
                scene.remove(helper)
            }
        }
    }, [camera, scene])

    return null
}
export default function Experience()
{
    const color = useControls('background', {
        value:"#4edee8"
    })
    
    return <>
        <KeyboardControls
            map={ [
                { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
                { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
                { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
                { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
            ] }
            
        >
            <color attach="background" args={[color.value]} />
            <Perf position="top-left" />
            <Light />
            {/* <Environment preset='sunset' /> */}
            

            <BoatModel position={[0,-0.08,-2]} scale={0.01}/>
            

            <Sky scale={100} sunPosition={[100, 20, 100]} turbidity={0.1} />
            {/* the sea */}
            {/* <CartoonSea /> */}
            <Chunk/>
            {/* <Wind/> */}
            <Wind2/>
            <Wind2/>
            <Wind2/>
            <Wind2/>
            <Wind2/>
            <Wind2/>
            {/* <CameraHelperComponent /> */}
            {/* <mesh position={[0,0.2,0]} castShadow scale={0.5}>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color="green" />
            </mesh> */}

            <Water rotation-x={-Math.PI / 2} position-y={-0.1}/>
            {/* <OrbitControls  makeDefault/> */}
        </KeyboardControls>

    </>
}