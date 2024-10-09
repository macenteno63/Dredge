import { Environment,OrbitControls,Sky,KeyboardControls,PresentationControls } from '@react-three/drei'
import { Perf } from "r3f-perf";
import { useControls } from 'leva'
import { BoatModel } from './components/Boat';
import Chunk from './components/Chunk';
import Light from './components/Light';
import  Water  from './components/Sea';
import { PivotControls } from '@react-three/drei';
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
            <Environment preset='sunset' />
            {/* <OrbitControls makeDefault /> */}
            <PivotControls anchor={[0,0,0]} scale={0.1}>
                <BoatModel />
            </PivotControls>
            <Sky scale={100} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            {/* the sea */}
            {/* <CartoonSea /> */}
            {/* <Chunk/> */}


            <Water rotation-x={-Math.PI / 2} position-y={-0.1}/>
        </KeyboardControls>

    </>
}