import { Rocket, Camera, Globe, Zap, Star, Telescope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Index = () => {
  const features = [
    {
      id: 'apod',
      title: 'Astronomy Picture of the Day',
      description: 'Discover the cosmos through daily stunning images and explanations',
      icon: Star,
      color: 'from-primary to-primary-glow',
      badge: 'Daily Updates',
      path: '/astronomy'
    },
    {
      id: 'mars',
      title: 'Mars Rover Gallery',
      description: 'Explore the Red Planet through the eyes of NASA rovers',
      icon: Camera,
      color: 'from-destructive to-accent',
      badge: 'Latest Photos',
      path: '/mars'
    },
    {
      id: 'neo',
      title: 'Near Earth Objects',
      description: 'Track asteroids and comets approaching our planet',
      icon: Zap,
      color: 'from-secondary to-accent',
      badge: 'Real-time Data',
      path: '/near-earth'
    },
    {
      id: 'earth',
      title: 'Earth from Space',
      description: 'View our beautiful planet from NASA\'s EPIC camera',
      icon: Globe,
      color: 'from-primary to-secondary',
      badge: 'HD Images',
      path: '/earth'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-nebula">
      <Navigation />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-cosmic animate-pulse-glow">
                <Rocket className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-orbitron bg-gradient-cosmic bg-clip-text text-transparent">
              Space Explorers Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Journey through the cosmos with NASA's most captivating space data. 
              Explore distant galaxies, track celestial objects, and witness the beauty of our universe.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Link key={feature.id} to={feature.path}>
                  <Card 
                    className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-cosmic transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-muted/50 text-muted-foreground">
                          {feature.badge}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold font-orbitron mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Telescope className="w-4 h-4 mr-2" />
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

        </div>
      </main>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-secondary rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary-glow rounded-full animate-float opacity-30" style={{ animationDelay: '6s' }} />
      </div>
    </div>
  );
};

export default Index;