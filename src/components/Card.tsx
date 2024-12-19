import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 20; // Réduit l'amplitude de la rotation
const HALF_ROTATION_RANGE = 20 / 2; // Ajuste la moitié de l'amplitude

const TiltCard = ({
  title,
  subtitle,
  description,
  image,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-72 rounded-xl "
    >
      <div
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          transition: "all 0.5s",
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "auto",
          backgroundPosition: "center",
          //   filter: "blur(10px)", // Flou uniquement sur l'image
        }}
        className="absolute inset-4 place-content-center rounded-xl bg-slate-50/70 shadow-md hover:shadow-2xl "
      >
        <h1 className="text-center text-4xl font-bold text-black ">{title}</h1>
        <br />
        {subtitle && (
          <p className="text-center text-2xl font-semibold text-black">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-center text-lg text-black">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default TiltCard;
