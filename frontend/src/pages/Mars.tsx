import { MarsRoverGallery } from '@/components/MarsRoverGallery';
import Navigation from '@/components/Navigation';

const Mars = () => {
  return (
    <div className="min-h-screen bg-gradient-nebula">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <MarsRoverGallery />
      </main>
    </div>
  );
};

export default Mars; 