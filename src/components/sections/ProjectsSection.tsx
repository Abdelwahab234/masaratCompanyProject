'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShieldCheck, Factory, Hotel, ShoppingCart, Utensils, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { TranslationData } from '@/data';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './ProjectsSection.module.css';

const groupIcons = [ShieldCheck, Factory, Hotel, ShoppingCart, Utensils];

interface Props {
  t: TranslationData;
  isAr: boolean;
}

function GroupDivider({ title, bgImage }: { title: string, bgImage: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className={styles.dividerWrapper}>
      <motion.div 
        className={styles.dividerBg}
        style={{
          backgroundImage: `url('${bgImage}')`,
          filter: blurValue,
          scale: scaleValue,
          opacity: opacityValue
        }}
      />
      <div className={styles.dividerOverlay} />
      <div className={styles.dividerContent}>
        <h2 className={styles.dividerTitle}>{title}</h2>
      </div>
    </div>
  );
}

function ProjectGroup({ title, icon: Icon, projects, isAr }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // In RTL, scrolling "left" (towards start) means negative change if native RTL scroll is used,
      // but clientWidth logic works generally by adding/subtracting.
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const isGov = title === "المشاريع الحكومية" || title === "Government Projects";
  const bgImage = isGov ? '/government.jpg' : (projects.find((p: any) => p.image)?.image || '/projects/default.jpg');

  return (
    <div className={styles.groupContainer} data-aos="fade-up">
      <GroupDivider title={title} bgImage={bgImage} />
      <div className={styles.groupCard}>
        <div className={styles.groupHeader}>
          <div className={styles.groupHeaderInner}>
            <div className={styles.groupIcon}>
              <Icon size={22} />
            </div>
            <h3 className={styles.groupTitle}>
              {isAr ? (title === "المشاريع الحكومية" ? " المشاريع الحكومية" : title.replace('مشاريع ', 'مشاريع ')) : title}
            </h3>
          </div>
        </div>
        
        {isGov ? (
          <div className={styles.govGrid}>
            {projects.map((p: any, idx: number) => (
              <div 
                key={p.name} 
                className={styles.govCard}
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 100}
              >
                <div className={styles.govCardIcon}>
                  <ShieldCheck size={36} className={styles.animatedLogo} />
                </div>
                <div className={styles.govCardName}>
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.sliderContainer}>
            <button onClick={() => scroll(isAr ? 'right' : 'left')} className={`${styles.arrowBtn} ${styles.arrowLeft}`} aria-label="Previous">
              {isAr ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <div className={styles.projectsSlider} ref={scrollRef} dir={isAr ? 'rtl' : 'ltr'}>
              {projects.map((p: any) => (
                <div key={p.name} className={styles.projectSlide}>
                  <div className={styles.projectItem}>
                    <div className={styles.projectImageContainer}>
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill className={styles.projectImage} />
                      ) : (
                        <ImageIcon className={styles.placeholderIcon} size={32} />
                      )}
                    </div>
                    <div className={styles.projectName}>
                      {p.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll(isAr ? 'left' : 'right')} className={`${styles.arrowBtn} ${styles.arrowRight}`} aria-label="Next">
              {isAr ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection({ t, isAr }: Props) {
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');

  const filteredGroups = useMemo(
    () =>
      t.groups
        .map((title, i) => ({
          title,
          groupId: String(i),
          icon: groupIcons[i],
          projects: t.projects[i].filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter(
          (g) =>
            (activeGroup === 'all' || activeGroup === g.groupId) &&
            g.projects.length
        ),
    [t, query, activeGroup]
  );

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div data-aos="fade-down">
          <SectionTitle kicker={t.projectsKicker} title={t.projectsTitle}>
            {t.projectsText}
          </SectionTitle>
        </div>

        <div className={styles.filterBar} data-aos="fade-up" data-aos-delay="100">
          <div className={styles.searchWrapper}>
            <Search
              className={`${styles.searchIcon} ${isAr ? styles.searchIconRtl : styles.searchIconLtr}`}
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`${styles.searchInput} ${isAr ? styles.searchInputRtl : styles.searchInputLtr}`}
            />
          </div>
          <select
            value={activeGroup}
            onChange={(e) => setActiveGroup(e.target.value)}
            className={styles.select}
          >
            <option value="all">{t.allSections}</option>
            {t.groups.map((g, i) => (
              <option key={g} value={String(i)}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.groups}>
          {filteredGroups.map((group) => (
            <ProjectGroup key={group.groupId} {...group} isAr={isAr} />
          ))}
        </div>
      </div>
    </section>
  );
}
