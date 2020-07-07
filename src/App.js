
import logo from './logo.svg';
import React, { useRef, useState } from 'react'
import './App.css';
import Header  from "./core/header";

import {   Canvas,
  
  useFrame,
  extend,
  useThree, } from 'react-three-fiber'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Controls = () =>{
  const orbitRef = useRef();
  const {camera , gl} = useThree();

  useFrame(() =>{
    orbitRef.current.update()
  });
  return (
    <orbitControls 
    
      args = {[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
 
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)
 
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
 
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function App() {
  return (
    <div className="App">

      <p>Content</p>

      <Header></Header>
      <Canvas noEvents={false} >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

        <Controls />
        

      </Canvas>
    </div>
  );
}

export default App;
