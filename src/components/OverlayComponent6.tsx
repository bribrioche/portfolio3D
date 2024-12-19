import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent6.css";
import PostIt from "./PostIt";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const woosh_invert = new Audio(require("../assets/sounds/woosh_invert.mp3"));

interface OverlayComponent6Props {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent6: React.FC<OverlayComponent6Props> = ({
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
        <div className="overlay-tab-3">Contact Me</div>
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
          <div className="content6">
            <PostIt
              note="Bryan.guillot@outlook.com"
              link="mailto:bryan.guillot@outlook.com"
              icon={<IoMdMail />}
            />
            <PostIt
              note="bribrioche"
              link="https://github.com/bribrioche"
              icon={<FaGithub />}
            />
            <PostIt note="06 13 34 34 45" icon={<FaPhoneAlt />} />
            <PostIt
              note="Bryan Guillot"
              link="https://www.linkedin.com/in/bryan-guillot-ab58a6184/"
              icon={<FaLinkedin />}
            />
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent6;
