import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Calendar, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';
import { DateInput } from '@/components/ui/date-input';

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
    status: string;
  };
  camera: {
    name: string;
    full_name: string;
  };
}

interface MarsApiResponse {
  photos: MarsPhoto[];
}

export const MarsRoverGallery = () => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2023-01-01'));
  const { toast } = useToast();

  const rovers = [
    { value: 'curiosity', label: 'Curiosity' },
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'spirit', label: 'Spirit' },
    { value: 'perseverance', label: 'Perseverance' }
  ];

  const fetchMarsPhotos = async (rover: string, date: Date | null) => {
    setLoading(true);
    try {
      if (!date) return;
      
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `${API_ENDPOINTS.MARS_PHOTOS}?rover=${rover}&date=${dateStr}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Mars rover photos');
      }
      
      const data: MarsApiResponse = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Mars rover photos. Please try again.",
        variant: "destructive"
      });
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarsPhotos(selectedRover, selectedDate);
  }, [selectedRover, selectedDate]);

  const handleRoverChange = (rover: string) => {
    setSelectedRover(rover);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative z-10">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-orbitron text-primary mb-2">
                Mars Rover Gallery
              </CardTitle>
              <p className="text-muted-foreground">
                Explore the Red Planet through the eyes of NASA's Mars rovers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0">
              <Select value={selectedRover} onValueChange={handleRoverChange}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select rover" />
                </SelectTrigger>
                <SelectContent>
                  {rovers.map((rover) => (
                    <SelectItem key={rover.value} value={rover.value}>
                      {rover.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DateInput
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date('2004-01-04')}
                maxDate={new Date()}
                placeholder="Select date"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : photos.length}
            </div>
            <div className="text-sm text-muted-foreground">Photos Found</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-secondary">
              {loading ? <Skeleton className="h-8 w-20 mx-auto" /> : (photos[0]?.rover.name || selectedRover)}
            </div>
            <div className="text-sm text-muted-foreground">Active Rover</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-accent">
              {loading ? <Skeleton className="h-8 w-8 mx-auto" /> : new Set(photos.map(p => p.camera.name)).size}
            </div>
            <div className="text-sm text-muted-foreground">Camera Types</div>
          </CardContent>
        </Card>
      </div>
      {/* Photos Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : photos.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8 text-center">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Photos Found</h3>
            <p className="text-muted-foreground">
              No photos were taken by {selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1)} on {selectedDate?.toISOString().split('T')[0]}.
              Try selecting a different date.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSelectedDate(new Date('2023-01-01'))}
            >
              Reset to Default Date
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className="group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:shadow-cosmic transition-all duration-300 cursor-pointer"
              onClick={() => window.open(photo.img_src, '_blank')}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.img_src}
                  alt={`Mars photo by ${photo.rover.name}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    <Camera className="w-3 h-3 mr-1" />
                    {photo.camera.name}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>{photo.rover.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.earth_date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm truncate">
                    {photo.camera.full_name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Earth Date: {photo.earth_date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};