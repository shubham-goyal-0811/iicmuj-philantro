import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf');
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={earthRef} {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} scale={1.128} />
    </group>
  );
}

useGLTF.preload('/earth.gltf');
