import LandingContent from '@/components/LandingContent';
import LandingHero from '@/components/LandingHero';
import LandingNavbar from '@/components/LandingNabar';

export default function Home() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
