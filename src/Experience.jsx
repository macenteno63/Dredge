import { Environment,OrbitControls,Sky,KeyboardControls } from '@react-three/drei'
import { Perf } from "r3f-perf";
import { useControls } from 'leva'
import { BoatModel } from './components/Boat';
import Chunk from './components/Chunk';
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
            <Environment preset="sunset" />
            <OrbitControls makeDefault />
            <BoatModel />
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            {/* the sea */}
            {/* <CartoonSea /> */}
            <Chunk/>
        </KeyboardControls>

    </>
}