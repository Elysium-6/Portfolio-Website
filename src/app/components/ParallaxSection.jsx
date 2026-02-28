// components/ParallaxSection.jsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection({ children, offset = 50, bgImage }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 10], [offset, -offset]);

  const backgroundStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  } : {};

  return (
    <motion.div
      ref={ref}
      style={{ y, ...backgroundStyle }}
      className="relative" // needed if you want content above the background
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/50" /> {/* semi-transparent overlay */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}