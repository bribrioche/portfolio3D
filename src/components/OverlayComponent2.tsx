import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent2.css";
import master from "../assets/master.png";
import bts from "../assets/bts.png";
import pin from "../assets/pin.png";
const woosh_invert = new Audio(require("../assets/sounds/woosh_invert.mp3"));

interface OverlayComponent2Props {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent2: React.FC<OverlayComponent2Props> = ({
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
        <div className="overlay-tab-2">Education</div>
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
          <div className="content2">
            {/* Diplôme 1 */}
            <div className="diploma-container">
              <img src={pin} alt="Pin" className="pin" loading="lazy" />
              <img
                src={master}
                alt="Master"
                className="diploma"
                loading="lazy"
              />
              <p className="diploma-description">
                IT Engineering Degree - 2022
              </p>
            </div>
            {/* Diplôme 2 */}
            <div className="diploma-container">
              <img src={pin} alt="Pin" className="pin" />
              <img src={bts} alt="BTS" className="diploma" />
              <p className="diploma-description">
                IT Advanced Technician's Certificate - 2019
              </p>
            </div>
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent2;
