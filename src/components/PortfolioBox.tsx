import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector2, Raycaster } from "three";
import BoxModel from "./BoxModel";
import Intercalary from "./Intercalary";
import PaperComponent from "./PaperComponent";
import OverlayComponent from "./OverlayComponent";
import OverlayComponent2 from "./OverlayComponent2";
import OverlayComponent3 from "./OverlayComponent3";
import OverlayComponent4 from "./OverlayComponent4";
import OverlayComponent5 from "./OverlayComponent5";
import OverlayComponent6 from "./OverlayComponent6";
const backgroundMusic = new Audio(
  require("../assets/sounds/ambiant_music.mp3")
);
backgroundMusic.volume = 0.5;
const woosh = new Audio(require("../assets/sounds/woosh.mp3"));

const PortfolioBox: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false); // Nouvel état
  const handleOverlayClose = () => {
    setIsOverlayActive(false);
    setClickedIndex(null);
  };
  const RaycastManager: React.FC = () => {
    const raycaster = useRef(new Raycaster());
    const mouse = useRef(new Vector2());
  
    const handleMouseMove = (event: MouseEvent) => {
      if (isOverlayActive) return; // Désactiver les mouvements si l'overlay est actif
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
  
    const handleTouchMove = (event: TouchEvent) => {
      if (isOverlayActive) return; // Désactiver les mouvements si l'overlay est actif
      const touch = event.touches[0]; // Prendre le premier point de contact
      mouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      setClickedIndex(hoveredIndex);

    };
  
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (isOverlayActive) return; // Désactiver les clics si l'overlay est actif
      if (hoveredIndex !== null) {
        woosh.volume = 0.05;
        woosh.play();
        setClickedIndex(hoveredIndex);
      }
    };
  
    
    useFrame(({ camera, scene }) => {
      if (isOverlayActive) return; // Désactiver le raycast si l'overlay est actif
  
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);
  
      if (intersects.length > 0) {
        const target = intersects[0].object;
        if (target.name === "casier") {
          setHoveredIndex(null);
          document.body.style.cursor = "default";
        } else if (target.userData.index !== undefined) {
          setHoveredIndex(target.userData.index);
          document.body.style.cursor = "pointer";
        }
      } else {
        setHoveredIndex(null);
        document.body.style.cursor = "default";
      }
    });
  
    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchstart", handleClick, { passive: true });
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("click", handleClick);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchstart", handleClick);
      };
    }, [hoveredIndex, isOverlayActive]);
  
    return null;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <audio autoPlay loop>
        <source src={backgroundMusic.src} type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      {clickedIndex === 0 && (
        <OverlayComponent
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      {clickedIndex === 1 && (
        <OverlayComponent2
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      {clickedIndex === 2 && (
        <OverlayComponent3
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      {clickedIndex === 3 && (
        <OverlayComponent4
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      {clickedIndex === 4 && (
        <OverlayComponent5
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      {clickedIndex === 5 && (
        <OverlayComponent6
          onShow={() => setIsOverlayActive(true)}
          onClose={handleOverlayClose}
        />
      )}
      <Canvas
        style={{ width: "100%", height: "100vh" }}
        camera={{ fov: 19, position: [0.7, 1, 2.7] }}
      >
        <RaycastManager />
        <BoxModel position={[0, -0.2, 0]}>
          {[
            { path: "/models/int1.glb", labelPath: "/models/int1_text.glb" },
            { path: "/models/int2.glb", labelPath: "/models/int2_text.glb" },
            { path: "/models/int3.glb", labelPath: "/models/int3_text.glb" },
            { path: "/models/int4.glb", labelPath: "/models/int4_text.glb" },
            { path: "/models/int5.glb", labelPath: "/models/int5_text.glb" },
            { path: "/models/int6.glb", labelPath: "/models/int6_text.glb" },
          ].map((model, index) => (
            <Intercalary
              key={model.path}
              position={[0, 0, 0]}
              modelPath={model.path}
              labelModelPath={model.labelPath}
              index={index}
              hovered={hoveredIndex === index}
              clicked={clickedIndex === index}
            />
          ))}
          <PaperComponent
            position={[0, 0, 0]}
            modelPath={"/models/paper.glb"}
          />
        </BoxModel>
      </Canvas>
    </div>
  );
};

export default PortfolioBox;
