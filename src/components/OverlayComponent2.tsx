import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importer les styles de la bibliothèque
import "../styles/OverlayComponent.css";
import master from "../assets/master.png";
import bts from "../assets/bts.png";
import bac from "../assets/bac.png";

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
    setIsVisible(false);
    setTimeout(onClose, 500); // Fermer après la transition
  };

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
            <Carousel
              className="diplomas"
              showArrows={true} // Affiche les flèches pour le défilement
              showThumbs={false} // Masque les vignettes en bas
              infiniteLoop={true} // Boucle infinie
              autoPlay={true} // Défilement automatique
              swipeable={true}
            >
              <div>
                <img src={master} alt="Master" className="diploma" />
              </div>
              <div>
                <img src={bts} alt="BTS" className="diploma" />
              </div>
              <div>
                <img src={bac} alt="Bac" className="diploma" />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent2;
