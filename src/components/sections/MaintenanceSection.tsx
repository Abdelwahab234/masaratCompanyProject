import { Wrench } from 'lucide-react';
import { TranslationData } from '@/data';
import styles from './MaintenanceSection.module.css';

interface Props {
  t: TranslationData;
}

export default function MaintenanceSection({ t }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content} data-aos="fade-left">
          <p className={styles.kicker}>{t.maintenanceKicker}</p>
          <h2 className={styles.title}>{t.maintenanceTitle}</h2>
          <p className={styles.text}>{t.maintenanceText}</p>
        </div>
    
        <div className={styles.items}>
          {t.maintenance.map((item, i) => (
            <div key={item} className={styles.item} data-aos="zoom-in" data-aos-delay={i * 100}>
              <Wrench className={styles.icon} size={28} />
              <span className={styles.itemText}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
