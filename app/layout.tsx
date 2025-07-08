import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Dingle - African Digital Products Platform',
  description: 'Host, buy, sell, and market digital products across Africa. Connect with expert marketers, leverage SMS & email marketing, and grow your digital business.',
  keywords: 'digital products, African marketplace, SMS marketing, email marketing, digital business, online marketing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}