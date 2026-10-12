import './globals.css';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/data';
import { DEFAULT_THEME, themeInitScript } from '@/lib/themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const title = `${site.name} | ${site.role}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ['MERN stack developer', 'React developer', 'Next.js developer', 'front-end developer', 'freelance web developer', 'Rayyan Ahmed'],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: `${site.name} Portfolio`,
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#08070d' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: Object.values(site.links),
  knowsAbout: ['React', 'Next.js', 'Three.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the inline script may set data-theme before React hydrates
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
