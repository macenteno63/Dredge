import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
const Light = () => {
    const light = useRef()
    useFrame((state) =>
        {
            light.current.position.z = state.camera.position.z + 1 - 4
            light.current.target.position.z = state.camera.position.z - 4
            light.current.target.updateMatrixWorld()
        })
  return (
    <>
        <directionalLight
            ref={light}
            position={ [ 4, 4, 1 ] }
            intensity={ 4 }
        />
        {/* <ambientLight intensity={ 1.5 } position={[0,0,0]} /> */}

    </>
  )
}

export default Light