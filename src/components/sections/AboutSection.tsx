import { Eye, Target, Gem, CheckCircle2 } from 'lucide-react';
import { TranslationData } from '@/data';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './AboutSection.module.css';

interface Props {
  t: TranslationData;
}

export default function AboutSection({ t }: Props) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div data-aos="fade-up">
          <SectionTitle kicker={t.aboutKicker} title={t.aboutTitle}>
            {t.aboutText}
          </SectionTitle>
        </div>

        <div className={styles.grid}>
          {/* Vision */}
          <div className={styles.card} data-aos="fade-up" data-aos-delay="100">
            <Eye className={styles.iconCyan} />
            <h3 className={styles.cardTitle}>{t.vision}</h3>
            <p className={styles.cardText}>{t.visionText}</p>
          </div>

          {/* Goals */}
          <div className={`${styles.card} ${styles.cardDark}`} data-aos="fade-up" data-aos-delay="200">
            <Target className={styles.iconYellow} />
            <h3 className={styles.cardTitleWhite}>{t.goalsTitle}</h3>
            <ul className={styles.goalsList}>
              {t.goals.map((g) => (
                <li key={g} className={styles.goalItem}>
                  <CheckCircle2 className={styles.check} />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className={styles.card} data-aos="fade-up" data-aos-delay="300">
            <Gem className={styles.iconCyan} />
            <h3 className={styles.cardTitle}>{t.valuesTitle}</h3>
            <div className={styles.valuesGrid}>
              {t.values.map((v) => (
                <div key={v} className={styles.valueChip}>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
