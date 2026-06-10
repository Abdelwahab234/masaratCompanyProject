'use client';

import { useState } from 'react';
import { data, Lang } from '@/data';

import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import GasSection from '@/components/sections/GasSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('ar');
  const t = data[lang] as typeof data['ar'];
  const isAr = lang === 'ar';

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <main dir={t.dir} style={{ overflowX: 'hidden' }}>
      <Navbar t={t} lang={lang} onLangChange={toggleLang} />
      <HeroSection t={t} isAr={isAr} />
      <AboutSection t={t} />
      <ServicesSection t={t} />
      <ProjectsSection t={t} isAr={isAr} />
      <MaintenanceSection t={t} />
      <GasSection t={t} />
      <PartnersSection t={t} />
      <ContactSection t={t} />
    </main>
  );
}
