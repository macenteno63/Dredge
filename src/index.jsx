import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import {useProgress,Html} from '@react-three/drei'
import { Suspense } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))
function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }
root.render(
    <>
        <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 250,
            position: [ -50,20,0 ]
        } }
        performance={'high-performance'}
        renderer={{ devicePixelRatio:1 }}
        >
        <Suspense fallback={<Loader/>}>
            <Experience /> 
        </Suspense>
        </Canvas>
    </>

)