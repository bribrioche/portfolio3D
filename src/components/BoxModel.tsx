import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shader pour un effet granuleux
const granularShader = {
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
    light: { value: new THREE.Vector3(-0.5, 1, 1) },
    ambientLight: { value: new THREE.Vector3(0.4, 0.4, 0.4) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 color;
    uniform vec3 light;
    uniform vec3 ambientLight;

    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      float intensity = dot(normalize(vNormal), normalize(light));
      intensity = clamp(intensity, 0.1, 1.0);
      float noise = random(vPosition.xy * 10.0);
      vec3 ambient = ambientLight * 0.5;
      vec3 finalColor = color * (ambient + (intensity + noise * 0.1)); 
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

const BoxModel: React.FC<{ 
  position?: [number, number, number]; // Propriété position ajoutée
  children?: React.ReactNode; 
}> = ({ position = [0, 0, 0], children }) => {
  const { scene } = useGLTF('/models/box.glb');
  const meshRef = useRef<THREE.Group>(null);

  // Appliquer le shader à chaque maillage du modèle
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.ShaderMaterial(granularShader);
    }
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
        // Diminution de l'amplitude sur l'axe Y pour un effet plus subtil
        meshRef.current.position.y = position[1] + Math.sin(elapsedTime) * 0.02;
        // Rotation lente autour de l'axe Y pour un effet de mouvement subtil
        meshRef.current.rotation.y = Math.PI + Math.sin(elapsedTime * 0.4) * 0.1;
    }
});


  return (
    <primitive 
      ref={meshRef} // Référence pour le hook useFrame
      object={scene} 
      position={position} // Appliquer la position ici
      scale={[1, 1, 1]}
      rotation={[0, Math.PI, 0]} // Rotation de 180° autour de l'axe Y
    >
      {children}
    </primitive>
  );
};

export default BoxModel;
