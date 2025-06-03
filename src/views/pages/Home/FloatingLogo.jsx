import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FloatingLogo = () => {
  const { scrollY } = useScroll();

  // Scroll progress ranges (adjust based on your layout)
  const startScroll = 0;
  const endScroll = 650;

  // Vertical movement: from top to CanDoMas
  const y = useTransform(scrollY, [startScroll, endScroll], [0, 450]);

  // Horizontal movement: from right side to left side
  const x = useTransform(scrollY, [startScroll, endScroll], [100, -680]); // tweak these

  // Scale and fade for realism
  const scale = useTransform(scrollY, [startScroll, endScroll], [1, 1]);
  const opacity = useTransform(scrollY, [endScroll - 100, endScroll], [1, 0]);

  return (
    <motion.img
      src="/assets/Images/masfooter-logo1.svg"
      alt="Floating Logo"
      style={{
        position: 'fixed',
        top: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 300,
        
        pointerEvents: 'none',
        x,
        y,
        scale,
        opacity,
      }}
    />
  );
};

export default FloatingLogo