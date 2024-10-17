import { useRef,useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import  {useHelper, Helper} from '@react-three/drei'
// import { PointLightHelper } from 'three'
import useGame from '../stores/Game.jsx'
const Light = () => {
    const light = useRef()
    useFrame((state) => {
        light.current.position.set(state.camera.position.x,state.camera.position.y,state.camera.position.z)
        light.current.target = useGame.getState().boatPosition
        light.current.updateMatrixWorld()
    })
  return (
    <>
        <directionalLight
            position={ [ 40,8,40] }
            intensity={ 5 }
            castShadow
            shadow-mapSize-width={ 1024 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 100 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
            shadow-radius={ 10 }
            color={"#FFDD95"}
        />
        <pointLight
            ref={light}
            intensity={ 1.5 }
        />
        {/* <Helper type={PointLightHelper} args={[light.current]}/> */}
        <ambientLight intensity={ 1.5 }/>

    </>
  )
}

export default Light