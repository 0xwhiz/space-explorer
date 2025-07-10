import { NearEarthObjects } from '@/components/NearEarthObjects';
import Navigation from '@/components/Navigation';

const NearEarth = () => {
  return (
    <div className="min-h-screen bg-gradient-nebula">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <NearEarthObjects />
      </main>
    </div>
  );
};

export default NearEarth; 