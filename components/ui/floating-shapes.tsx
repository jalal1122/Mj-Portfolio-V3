"use client";

import { motion } from "framer-motion";

export function FloatingShapes() {
  const shapes = [
    // Hexagons
    { type: 'hexagon', size: 80, x: '10%', y: '15%', duration: 20 },
    { type: 'hexagon', size: 60, x: '85%', y: '25%', duration: 25 },
    { type: 'hexagon', size: 50, x: '75%', y: '70%', duration: 22 },

    // Circles
    { type: 'circle', size: 100, x: '20%', y: '60%', duration: 30 },
    { type: 'circle', size: 70, x: '90%', y: '50%', duration: 28 },

    // Triangles
    { type: 'triangle', size: 90, x: '50%', y: '20%', duration: 26 },
    { type: 'triangle', size: 65, x: '15%', y: '80%', duration: 24 },

    // Squares
    { type: 'square', size: 75, x: '60%', y: '85%', duration: 27 },
    { type: 'square', size: 55, x: '40%', y: '40%', duration: 23 },
  ];

  const renderShape = (shape: typeof shapes[0], index: number) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
    };

    const commonProps = {
      initial: { rotate: 0, scale: 1, opacity: 0.03 },
      animate: {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.03, 0.08, 0.03],
      },
      transition: {
        duration: shape.duration,
        repeat: Infinity,
        ease: "linear" as const,
      },
    };

    switch (shape.type) {
      case 'hexagon':
        return (
          <motion.svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            {...commonProps}
          >
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </motion.svg>
        );

      case 'circle':
        return (
          <motion.div
            key={index}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              border: '2px solid',
            }}
            className="border-primary"
            {...commonProps}
          />
        );

      case 'triangle':
        return (
          <motion.svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            {...commonProps}
          >
            <polygon
              points="50 10, 90 90, 10 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </motion.svg>
        );

      case 'square':
        return (
          <motion.div
            key={index}
            style={{
              ...baseStyle,
              border: '2px solid',
            }}
            className="border-primary"
            {...commonProps}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => renderShape(shape, index))}
    </div>
  );
}
