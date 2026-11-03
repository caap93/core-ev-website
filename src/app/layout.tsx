import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GlobalNav } from '@/components/GlobalNav';
import './globals.css';

// Inter (SIL Open Font License) is bundled with the code, so builds never need to reach Google Fonts.
const inter = localFont({ src: './fonts/InterVariable-latin.woff2', weight: '300 700', variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'CORE EV — Extracellular Vesicle Core Facility',
    template: '%s · CORE EV',
  },
  description: 'Comprehensive isolation, characterisation, and analysis of extracellular vesicles and nanoparticles at Ghent University.',
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <GlobalNav />
        {children}
      </body>
    </html>
  );
}
