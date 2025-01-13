import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector2, Raycaster, PerspectiveCamera } from "three";
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
  const [isMobile, setIsMobile] = useState(false);
  const [coef, setCoef] = useState(1);
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
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

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
      const checkMobile = () => {
        // Définir la largeur maximale des écrans mobiles
        setIsMobile(window.innerHeight <= 768); // Vous pouvez ajuster cette valeur selon vos besoins
        console.log("isMobile", isMobile);

        if (isMobile) {
          setCoef(0.7);
        } else {
          setCoef(1);
        }
        console.log("coef", coef);
      };

      checkMobile(); // Vérifie dès le début
      window.addEventListener("resize", checkMobile); // Vérifie à chaque redimensionnement de la fenêtre

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, []);

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
      window.addEventListener("touchstart", handleClick, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("click", handleClick);
        window.removeEventListener("touchstart", handleClick);
      };
    }, [hoveredIndex, isOverlayActive]);

    return null;
  };

  // Utilisation du hook useThree pour accéder à la caméra
  const CameraAdjuster: React.FC<{ coef: number }> = ({ coef }) => {
    const { camera } = useThree();

    useEffect(() => {
      if (camera instanceof PerspectiveCamera) {
        // Vérifie si c'est bien une PerspectiveCamera
        camera.fov = 19 * coef; // Applique le coefficient au FOV
        camera.updateProjectionMatrix(); // Met à jour la matrice de projection après modification
      }
    }, [coef, camera]);

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
        camera={{ fov: 19 * coef, position: [0.7, 1, 2.7] }}
      >
        <CameraAdjuster coef={coef} />
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
