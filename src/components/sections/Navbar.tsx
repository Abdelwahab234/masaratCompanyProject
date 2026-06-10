'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Languages, Menu, X } from 'lucide-react';
import { Lang, TranslationData } from '@/data';
import styles from './Navbar.module.css';
import logoImg from './logo.png';

interface Props {
  t: TranslationData;
  lang: Lang;
  onLangChange: () => void;
}

export default function Navbar({ t, lang, onLangChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand}>
          <div className={styles.brandIcon}>
            <Image src={logoImg} alt={t.brand} width={400} height={120} className={styles.logoImage} />
          </div>
          <div>
            <div className={styles.brandName}>{t.brand}</div>
            <div className={styles.brandSub}>{t.subBrand}</div>
          </div>
        </a>

        <nav className={styles.nav}>
          {t.nav.map((n, i) => (
            <a key={n} href={`#${t.ids[i]}`} className={styles.navLink}>
              {n}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button onClick={onLangChange} className={styles.langBtn}>
            <Languages size={16} />
            {t.langName}
          </button>
          <a href="https://wa.me/966559119974" target="_blank" rel="noopener noreferrer" className={styles.callBtn}>
            {t.callNow}
          </a>
        </div>

        <div className={styles.mobileActions}>
          <button onClick={onLangChange} className={styles.mobileLangBtn}>
            <Languages size={14} style={{ display: 'inline' }} /> {t.langName}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={styles.menuBtn}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {t.nav.map((n, i) => (
            <a
              key={n}
              href={`#${t.ids[i]}`}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {n}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
