import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const PaperComponent: React.FC<{ modelPath: string; position: [number, number, number]; }> = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);

  // Shader pour un effet granuleux
const granularShader = {
  uniforms: {
    color: { value: new THREE.Color(0xeeeeee) }, // Couleur grise par défaut
    light: { value: new THREE.Vector3(-0.5, 1, 1) }, // Lumière directionnelle
    ambientLight: { value: new THREE.Vector3(0.4, 0.4, 0.4) }, // Lumière ambiante douce
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

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.ShaderMaterial(granularShader);
      }
    });
  }, [scene, granularShader]);

  return <primitive object={scene} position={position} scale={[1, 1, 1]} />;
};

export default PaperComponent;
