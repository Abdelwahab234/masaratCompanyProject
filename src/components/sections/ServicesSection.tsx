'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ClipboardCheck, Wrench, Cog, Building2, Users } from 'lucide-react';
import { TranslationData } from '@/data';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './ServicesSection.module.css';

const serviceIcons = [ClipboardCheck, Wrench, Cog, Building2, Users];

interface Props {
  t: TranslationData;
}

export default function ServicesSection({ t }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle kicker={t.servicesKicker} title={t.servicesTitle}>
          {t.servicesText}
        </SectionTitle>

        <div className={styles.timelineContainer} ref={containerRef}>
          <div className={styles.timelineLineBg}></div>
          <motion.div 
            className={styles.timelineLineFill} 
            style={{ scaleY: scrollYProgress }} 
          />

          <div className={styles.nodesWrapper}>
            {t.services.map(([title, desc], i) => {
              const Icon = serviceIcons[i];
              const isEven = i % 2 !== 0;

              return (
                <motion.div 
                  key={title} 
                  className={`${styles.nodeRow} ${isEven ? styles.nodeRowEven : ''}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                >
                  <div className={styles.emptySpace}></div>
                  
                  <div className={styles.nodeIconWrapper}>
                    <motion.div 
                      className={styles.nodeIconBox}
                      variants={{
                        hidden: { 
                          backgroundColor: '#062338', 
                          boxShadow: '0 0 0 6px #ffffff, 0 4px 15px rgba(6, 35, 56, 0.1)',
                          scale: 1 
                        },
                        visible: { 
                          backgroundColor: '#16B6C8', 
                          boxShadow: '0 0 0 6px #ffffff, 0 0 25px rgba(22, 182, 200, 0.8), 0 0 50px rgba(22, 182, 200, 0.4)',
                          scale: 1.15 
                        }
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Icon size={26} />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className={styles.nodeContent}
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -40 : 40 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardText}>{desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
