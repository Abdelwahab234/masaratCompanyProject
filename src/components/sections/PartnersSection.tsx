import { TranslationData, successPartners } from '@/data';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from 'next/image';
import styles from './PartnersSection.module.css';

interface Props {
  t: TranslationData;
}

export default function PartnersSection({ t }: Props) {
  const successPartnerImages = [
    "1 (1).png", "2 (1).png", "3 (2).png", "4 (1).png", "5 (1).png",
    "6 (1).png", "7 (1).png", "8 (1).png", "9 (1).png", "10 (1).png",
    "11 (1).png", "12 (1).png", "12 (2).png", "13 (1).png", "14 (1).png",
    "15 (1).png", "16 (1).png", "17 (1).png", "18 (1).png", "19 (1).png",
    "20.png", "21.png", "22.png", "23.png", "24.png", 
    "25.png", "26.png", "27.png", "28.png"
  ];

  const supplierImages = Array.from({ length: 19 }, (_, i) => `${i + 1}.png`);

  const successRows = [
    successPartnerImages.slice(0, 10),
    successPartnerImages.slice(10, 20),
    successPartnerImages.slice(20, 29)
  ];

  const supplierRows = [
    supplierImages.slice(0, 10),
    supplierImages.slice(10, 19)
  ];

  const MarqueeRow = ({ items, reverse, folder }: { items: string[], reverse?: boolean, folder: string }) => (
    <div className={`${styles.marqueeRow} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.marqueeGroup}>
        {items.map((src, i) => (
          <div key={`g1-${i}`} className={styles.marqueeItem}>
            <Image src={`/${folder}/${src}`} alt="Logo" fill className={styles.marqueeImage} />
          </div>
        ))}
      </div>
      <div className={styles.marqueeGroup}>
        {items.map((src, i) => (
          <div key={`g2-${i}`} className={styles.marqueeItem}>
            <Image src={`/${folder}/${src}`} alt="Logo" fill className={styles.marqueeImage} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="partners" className={styles.section}>
      <div className={styles.inner}>
        <div data-aos="fade-up">
          <SectionTitle kicker={t.partnersKicker} title={t.partnersTitle}>
            {t.partnersText}
          </SectionTitle>
        </div>

        {/* Suppliers Section */}
        <div className={styles.subSection} data-aos="fade-up" data-aos-delay="100">
          <h3 className={styles.subTitle}>{t.suppliersTitle}</h3>
          <div className={styles.marqueeContainer} dir="ltr">
            {supplierRows.map((row, idx) => (
              <MarqueeRow key={`sup-${idx}`} items={row} reverse={idx % 2 !== 0} folder="mowarden" />
            ))}
          </div>
        </div>

        {/* Success Partners Section */}
        <div className={styles.subSection} data-aos="fade-up" data-aos-delay="200">
          <h3 className={styles.subTitle}>{t.successTitle}</h3>
          <div className={styles.marqueeContainer} dir="ltr">
            {successRows.map((row, idx) => (
              <MarqueeRow key={`suc-${idx}`} items={row} reverse={idx % 2 !== 0} folder="mowaeden2" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
