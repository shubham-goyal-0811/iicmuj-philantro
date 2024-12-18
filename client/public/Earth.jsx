import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf');
  const earthRef = useRef();

  // State to handle the scale and camera adjustments based on screen size
  const [scale, setScale] = useState(1);
  const [fov, setFov] = useState(75);  // Default FOV

  useEffect(() => {
    const updateScaleAndFov = () => {
      const width = window.innerWidth;
      if (width < 600) {  // Mobile devices
        setScale(1.2);
        setFov(60);
      } else if (width < 1024) {  // Tablets
        setScale(0.8);
        setFov(70);  // Medium FOV for tablets
      } else {  // Laptops and larger screens
        setScale(1);
        setFov(75);  // Default FOV for larger screens
      }
    };

    // Initial scale and FOV calculation
    updateScaleAndFov();

    // Add resize event listener
    window.addEventListener('resize', updateScaleAndFov);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', updateScaleAndFov);
    };
  }, []);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={earthRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials['Scene_-_Root']}
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload('/earth.gltf');
