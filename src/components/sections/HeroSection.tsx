'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import { TranslationData } from '@/data';
import StatCard from '@/components/ui/StatCard';
import AnimatedGauge from '@/components/ui/AnimatedGauge';
import styles from './HeroSection.module.css';

interface Props {
  t: TranslationData;
  isAr: boolean;
}

export default function HeroSection({ t, isAr }: Props) {
  const Arrow = isAr ? ChevronLeft : ChevronRight;

  return (
    <section id="home" className={styles.section}>
      <div className={styles.blobLeft} />
      <div className={styles.blobRight} />

      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.content}
        >
          <div className={styles.badge}>
            <ShieldCheck size={16} />
            {t.badge}
          </div>
          <h1 className={styles.title}>{t.heroTitle}</h1>
          <p className={styles.text}>{t.heroText}</p>
          <div className={styles.ctas}>
            <a href="#projects" className={styles.primaryBtn}>
              {t.viewProjects}
              <Arrow size={20} />
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              {t.requestConsult}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={styles.card}
        >
          <div className={styles.cardInner}>
            <div className={styles.cardContent}>
              <div className={styles.cardBody}>
                <div className={styles.gaugeIcon}>
                  <AnimatedGauge size={40} />
                </div>
                <h3 className={styles.cardTitle}>LPG Gas Systems</h3>
                <p className={styles.cardText}>{t.gasText}</p>
              </div>
              <div className={styles.stats}>
                <StatCard number="+40" label={t.statLabels[0]} />
                <StatCard number="19" label={t.statLabels[1]} />
                <StatCard number="5" label={t.statLabels[2]} />
                <StatCard number="2030" label={t.statLabels[3]} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
