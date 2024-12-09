import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const TextComponent: React.FC<{ path: string; position: [number, number, number]; shader: THREE.ShaderMaterial }> = ({ path, position, shader }) => {
  const { scene } = useGLTF(path);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = shader;
      }
    });
  }, [scene, shader]);

  return <primitive object={scene} position={position} scale={[1, 1, 1]} />;
};

export default TextComponent;
