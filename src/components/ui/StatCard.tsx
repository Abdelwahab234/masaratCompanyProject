'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import styles from './StatCard.module.css';

interface Props {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const numMatch = number.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const numberStr = numMatch ? numMatch[0] : '';
  const prefix = numberStr ? number.substring(0, number.indexOf(numberStr)) : '';
  const suffix = numberStr ? number.substring(number.indexOf(numberStr) + numberStr.length) : '';

  useEffect(() => {
    if (isInView && ref.current) {
      let controls: any;
      const timer = setTimeout(() => {
        const node = ref.current;
        if (!node) return;
        controls = animate(0, targetNum, {
          duration: 2,
          ease: "easeOut",
          onUpdate(value) {
            node.textContent = `${prefix}${Math.floor(value)}${suffix}`;
          },
        });
      }, 1700);

      return () => {
        clearTimeout(timer);
        if (controls) controls.stop();
      };
    }
  }, [isInView, targetNum, prefix, suffix]);

  return (
    <div className={styles.card}>
      <div className={styles.number} ref={ref}>
        {number}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
