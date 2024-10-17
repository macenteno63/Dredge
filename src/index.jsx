import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import {useProgress,Html} from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))
function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }
root.render(
    <>
        <Canvas
        camera={ {
            fov: 40,
            near: 0.01,
            far: 250,
            position: [ 0,20,0 ],
        } }
        performance={'high-performance'}
        gl={{ devicePixelRatio:1, shadowMapType: THREE.BasicShadowMap }}
        shadows={false}
        >
        <Suspense fallback={<Loader/>}>
            <Experience /> 
        </Suspense>
        </Canvas>
    </>

)