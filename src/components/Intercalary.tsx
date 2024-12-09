import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import TextComponent from './TextComponent';

// Fonction pour créer une instance unique de shader
const createGranularShader = (color: THREE.Color) => new THREE.ShaderMaterial({
  uniforms: {
    color: { value: color },
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
});

const Intercalary: React.FC<{
  position: [number, number, number];
  modelPath: string;
  labelModelPath: string;
  hovered: boolean;
  clicked: boolean; // Nouvelle prop pour l'état "cliqué"
  index: number;
}> = ({ position, modelPath, labelModelPath, hovered, clicked, index }) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const shaderMaterial = createGranularShader(new THREE.Color(0xffffff));
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = shaderMaterial;
        (child as THREE.Mesh).userData.index = index;
      }
    });
  }, [scene, index]);

  useFrame(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: clicked ? position[1] + 1 : hovered ? position[1] + 0.02 : position[1],
        duration: clicked ? 1.5 : 1.5, // Durée plus longue pour la montée si cliqué
        ease: clicked ? "power2.out" : "back.out",
      });
    }
  });

  return (
    <group ref={groupRef} position={position} >
      <primitive object={scene} scale={[1, 1, 1]} />
      <TextComponent path={labelModelPath} position={[0, 0, 0]} shader={createGranularShader(new THREE.Color(0x07053c))} />
    </group>
  );
};

export default Intercalary;
