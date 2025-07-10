import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Camera, Globe, Zap, Star, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const features = [
    {
      id: 'apod',
      title: 'Astronomy',
      path: '/astronomy',
      icon: Star,
    },
    {
      id: 'mars',
      title: 'Mars',
      path: '/mars',
      icon: Camera,
    },
    {
      id: 'neo',
      title: 'Near Earth',
      path: '/near-earth',
      icon: Zap,
    },
    {
      id: 'earth',
      title: 'Earth',
      path: '/earth',
      icon: Globe,
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Sidebar navigation content for mobile
  const NavDrawerContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 rounded-lg bg-gradient-cosmic">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <span className="font-orbitron font-bold text-xl">Space Hub</span>
      </div>
      <div className="flex flex-col gap-1">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.path}
            onClick={() => setDrawerOpen(false)}
          >
            <Button
              variant={isActive(feature.path) ? "default" : "ghost"}
              size="sm"
              className="font-medium justify-start w-full"
            >
              <feature.icon className="w-4 h-4 mr-2" />
              {feature.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <div className="p-2 rounded-lg bg-gradient-cosmic">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="font-orbitron font-bold text-xl">Space Hub</span>
            </Link>
          </div>
          {isMobile && (
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => setDrawerOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <NavDrawerContent />
              </SheetContent>
            </Sheet>
          )}
          {/* Desktop nav buttons */}
          {!isMobile && (
            <div className="flex space-x-1">
              {features.map((feature) => (
                <Link key={feature.id} to={feature.path}>
                  <Button
                    variant={isActive(feature.path) ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                  >
                    <feature.icon className="w-4 h-4 mr-2" />
                    {feature.title}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 