import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
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

const Intercalary: React.FC<{
  position: [number, number, number];
  modelPath: string;
  label: string;
  onClick: () => void;
  hovered: boolean;
  onPointerOver: () => void; 
  onPointerOut: () => void; 
}> = ({ position, modelPath, label, onClick, hovered, onPointerOver, onPointerOut }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Mesh>(null);

  // Assurez-vous que le matériau est appliqué après le chargement du modèle
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.ShaderMaterial(granularShader);
      }
    });
  }, [scene]);

  useFrame(() => {
    if (ref.current) {
      
      // Animation de la position
      gsap.to(ref.current.position, {
        y: hovered ? position[1] + 0.1 : position[1],
        duration: 0.3,
      });
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[position[0], position[1] + 0.5, position[2]]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={[1, 1, 1]}
    />
  );
};

export default Intercalary;
