import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BoxModel from './BoxModel'; // Assurez-vous que votre composant BoxModel est importé
import Intercalary from './Intercalary'; // Importez le composant Intercalary

const PortfolioBox: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // État pour suivre l'intercalaire survolé

  const handleClick = (label: string) => {
    console.log(`Intercalaire cliqué : ${label}`);
  };

  return (
    <Canvas style={{ width: '100%', height: '100vh' }} camera={{ fov: 20, position: [0.7, 1, 2.7] }}>
      <BoxModel
            position={[0, -0.2, 0]}>
        {['/models/int1.glb', '/models/int2.glb', '/models/int3.glb', '/models/int4.glb', '/models/int5.glb', '/models/int6.glb'].map((modelPath, index) => (
          <Intercalary
            key={modelPath}
            position={[0, 0, 0]} // Position ajustée
            modelPath={modelPath}
            label={`Label ${index + 1}`} // Ajustez les labels si nécessaire
            onClick={() => handleClick(`Label ${index + 1}`)}
            hovered={hoveredIndex === index} // Passer l'état de survol
            onPointerOver={() => setHoveredIndex(index)} // Mettre à jour l'état de survol
            onPointerOut={() => setHoveredIndex(null)} // Réinitialiser l'état de survol
          />
        ))}
      </BoxModel>
    </Canvas>
  );
};

export default PortfolioBox;
