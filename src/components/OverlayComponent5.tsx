import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent5.css";
import Card from "./Card";
import japanImg from "../assets/japan.png";
import franceImg from "../assets/france.png";
import englishImg from "../assets/english.png";
const woosh_invert = new Audio(require("../assets/sounds/woosh_invert.mp3"));

interface OverlayComponent5Props {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent5: React.FC<OverlayComponent5Props> = ({
  onShow,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onShow(); // Notifier que l'overlay est actif
    }, 200); // Délai de 0.5s

    return () => clearTimeout(timer);
  }, [onShow]);

  const handleClose = () => {
    woosh_invert.volume = 0.05;
    woosh_invert.play();
    setIsVisible(false);
    setTimeout(onClose, 500); // Fermer après la transition
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose(); // Fermer l'overlay si "Échap" est pressé
      }
    };

    // Ajouter un écouteur global pour les événements "keydown"
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyer l'écouteur à la désinstallation du composant
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Exécuté une fois à l'initialisation

  return (
    <div className={`overlay-container ${isVisible ? "visible" : ""}`}>
      <div className="top">
        <div className="overlay-tab">Languages</div>
        <button
          onClick={handleClose}
          className="overlay-close-button"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
      <div className="overlay-content all-corners">
        <div className="paper">
          <div className="content5">
            <div className="cards">
              <div className="card">
                {" "}
                <Card
                  title="Bonjour !"
                  subtitle="French"
                  description="Native language"
                  image={franceImg}
                />
              </div>
              <div className="card">
                <Card
                  title="Hello !"
                  subtitle="English"
                  description="Advanced level of English"
                  image={englishImg}
                />
              </div>
              <div className="card">
                <Card
                  title="こんにちは ！"
                  subtitle="Japan"
                  description="Learning on personal time"
                  image={japanImg}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent5;
