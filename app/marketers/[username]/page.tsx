import MarketerClientProfile from '@/components/MarketerClientProfile';

export async function generateStaticParams() {
  return [
    { username: 'adaora-marketing' },
    { username: 'kwame-digital' },
    { username: 'fatima-social' },
    { username: 'fatima-digital' },
    { username: 'chidi-growth' },
    { username: 'chidi-conversion' },
    { username: 'amina-content' },
    { username: 'tunde-ads' },
    { username: 'zara-email' },
    { username: 'omar-analytics' },
    { username: 'kofi-analytics' },
    { username: 'kwame-growth' },
  ];
}

export default async function Page({ params }) {
  return <MarketerClientProfile />;
}
