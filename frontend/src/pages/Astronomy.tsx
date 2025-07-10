import { APODViewer } from '@/components/APODViewer';
import Navigation from '@/components/Navigation';

const Astronomy = () => {
  return (
    <div className="min-h-screen bg-gradient-nebula">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <APODViewer />
      </main>
    </div>
  );
};

export default Astronomy; 