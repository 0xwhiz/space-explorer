import { EarthImagery } from '@/components/EarthImagery';
import Navigation from '@/components/Navigation';

const Earth = () => {
  return (
    <div className="min-h-screen bg-gradient-nebula">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <EarthImagery />
      </main>
    </div>
  );
};

export default Earth; 