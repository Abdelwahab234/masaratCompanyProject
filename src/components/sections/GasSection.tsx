'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { TranslationData } from '@/data';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './GasSection.module.css';

const gasProductImages = [
  '/tools/ﺧﺰاﻧﺎت ﻏﺎز اﻟﺒﺘﺮول اﻟﻤﺴﺎل  2.jpeg',
  '/tools/ﺧﺰاﻧﺎت ﻏﺎز اﻟﺒﺘﺮول اﻟﻤﺴﺎل.jpeg',
  '/tools/ﻟﻮﺣﺎت-اﻟﺘﺤﻜﻢ.png',
  '/tools/ﺻﺎﻓﺮة-اﻹﻧﺬار.png',
];

const componentImages = [
  '/tools/كاشف-تسرب-غاز-منزلي.png',
  '/tools/كاشف-تسرب-الغاز-(مقاوم-للماء).png',
  '/tools/كاشف-تسرب-الغاز-مقاوم-للانفجار.png',
  '/tools/مبخر-الغاز.png',
  '/tools/عداد-الغااز.png',
  '/tools/صمام-غلق-اتوماتيكي.png',
  '/tools/منظم-الغاز.png',
  '/tools/فلتر-الغاز.png',
  '/tools/ليات-معدنية-مرنة.png',
];

interface Props {
  t: TranslationData;
}

export default function GasSection({ t }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="gas" className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle kicker={t.gasKicker} title={t.gasTitle}>
          {t.gasText}
        </SectionTitle>

        {/* Timeline for Gas Products */}
        <div className={styles.timelineContainer} ref={containerRef}>
          <div className={styles.timelineLineBg}></div>
          <motion.div 
            className={styles.timelineLineFill} 
            style={{ scaleY: scrollYProgress }} 
          />

          <div className={styles.nodesWrapper}>
            {t.gasProducts.map((title, i) => {
              const imageSrc = gasProductImages[i];
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
                          boxShadow: '0 0 0 6px #F5FAFC, 0 4px 15px rgba(6, 35, 56, 0.1)',
                          scale: 1 
                        },
                        visible: { 
                          backgroundColor: '#16B6C8', 
                          boxShadow: '0 0 0 6px #F5FAFC, 0 0 25px rgba(22, 182, 200, 0.8), 0 0 50px rgba(22, 182, 200, 0.4)',
                          scale: 1.3 
                        }
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className={styles.innerDot}></div>
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
                    <div className={styles.nodeImageWrapper}>
                      <Image 
                        src={imageSrc} 
                        alt={title} 
                        fill 
                        className={styles.nodeImage}
                      />
                    </div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Components Grid (Like Projects) */}
        <div className={styles.componentsBox}>
          <h3 className={styles.componentsTitle}>{t.componentsTitle}</h3>
          <div className={styles.componentsGrid}>
            {t.components.map((c, i) => (
              <div key={c} className={styles.componentCard} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <div className={styles.componentImageWrapper}>
                  <Image 
                    src={componentImages[i]} 
                    alt={c} 
                    fill 
                    className={styles.componentImage} 
                  />
                </div>
                <h4 className={styles.componentName}>{c}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
