'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Loader.module.css';
import logoImg from '../sections/logo.png';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after 1.5 seconds to allow AOS and fonts to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.loaderContainer} dir="rtl">
      <div className={styles.loaderContent}>
        <div className={styles.logoContainer}>
          <Image src={logoImg} alt="مسارات التنمية الحديثة" fill className={styles.logoImage} />
        </div>
        <h2 className={styles.companyPrefix}>شركة</h2>
        <h1 className={styles.companyName} >مسارات التنمية الحديثة</h1>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>يتم تحميل الصفحة...</p>
      </div>
    </div>
  );
}
