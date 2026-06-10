'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedGauge({ size = 40 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="-50 -70 100 100" style={{ overflow: 'visible' }}>
        {/* Background Arc */}
        <path
          d="M -40 0 A 40 40 0 0 1 40 0"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Foreground Arc */}
        <motion.path
          d="M -40 0 A 40 40 0 0 1 40 0"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, stroke: '#16B6C8' }}
          animate={isInView ? {
            pathLength: 1,
            stroke: ['#16B6C8', '#f3b335', '#ef4444'], // Cyan -> Yellow -> Red
          } : { pathLength: 0, stroke: '#16B6C8' }}
          transition={{ duration: 2.5, ease: "easeOut", times: [0, 0.7, 1], delay: 1.7 }}
        />
        {/* Needle Group with centered bounding box */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={isInView ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 1.7 }}
        >
          <circle cx="0" cy="0" r="32" fill="none" stroke="none" />
          <line
            x1="0"
            y1="0"
            x2="-32"
            y2="0"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>
        {/* Needle base */}
        <circle cx="0" cy="0" r="5" fill="#0f172a" />
      </svg>
    </div>
  );
}
