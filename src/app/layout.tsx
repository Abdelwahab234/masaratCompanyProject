import type { Metadata } from 'next';
import AosInit from '@/components/AosInit';
import Loader from '@/components/ui/Loader';
import logoIcon from '@/components/sections/logo.png';
import './globals.css';

export const metadata: Metadata = {
  title: 'شركة مسارات التنمية الحديثة | أنظمة الغاز والسلامة',
  description: 'شركة مسارات التنمية الحديثة للمقاولات متخصصة في تركيب وتمديد شبكات الغاز المركزي، كشف التسرب، وأنظمة السلامة في السعودية. حلول هندسية متكاملة لجميع القطاعات.',
  keywords: [
    'شركات غاز في السعودية',
    'تركيب غاز',
    'تمديد غاز',
    'غاز',
    'غاز مركزي',
    'masaratgas',
    'masaratgaz.com',
    'شركة مسارات التنمية الحديثة',
    'أنظمة الغاز والسلامة',
    'كشف تسرب الغاز',
    'صيانة الغاز',
    'تمديد شبكات الغاز',
    'مقاولات غاز',
    'شركة غاز بالسعودية',
    'Gas & Fire Fighting',
    'Fuel System'
  ],
  authors: [{ name: 'شركة مسارات التنمية الحديثة' }],
  creator: 'مسارات التنمية الحديثة',
  publisher: 'مسارات التنمية الحديثة',
  openGraph: {
    title: 'شركة مسارات التنمية الحديثة للمقاولات | أنظمة الغاز',
    description: 'الشركة الرائدة في تمديد شبكات الغاز المركزي وأنظمة السلامة في المملكة العربية السعودية. مقاولات، تركيب، وصيانة.',
    url: 'https://masaratgaz.com',
    siteName: 'مسارات التنمية الحديثة',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركة مسارات التنمية الحديثة | تركيب غاز',
    description: 'حلول هندسية متكاملة لشبكات الغاز المركزي في السعودية.',
  },
  alternates: {
    canonical: 'https://masaratgaz.com',
  },
  icons: {
    icon: logoIcon.src,
    shortcut: logoIcon.src,
    apple: logoIcon.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Loader />
        <AosInit />
        {children}
      </body>
    </html>
  );
}
