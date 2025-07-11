import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Calendar, Zap } from 'lucide-react';
import { DateInput } from '@/components/ui/date-input';
import { useSpaceData } from '@/components/SpaceDataContext';
import React from 'react';

export const MarsRoverGallery = () => {
  const { marsPhotos, marsLoading, marsError, fetchMarsPhotos } = useSpaceData();
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedCamera, setSelectedCamera] = useState('all');
  const [availableCameras, setAvailableCameras] = useState<{ value: string; label: string }[]>([]);

  // Helper to extract unique cameras from photos
  const extractCameras = (photos: typeof marsPhotos) => {
    const cameraMap = new Map<string, string>();
    photos.forEach((photo) => {
      cameraMap.set(photo.camera.name, photo.camera.full_name);
    });
    return Array.from(cameraMap.entries()).map(([value, label]) => ({ value, label }));
  };

  // Fetch all photos for rover/date to get available cameras
  React.useEffect(() => {
    if (!selectedRover || !selectedDate) return;
    // Fetch all cameras (no camera filter)
    fetchMarsPhotos(selectedRover, selectedDate, undefined).then(() => {
      // Wait for marsPhotos to update (next render)
      setTimeout(() => {
        setAvailableCameras(extractCameras(marsPhotos));
      }, 0);
    });
    setSelectedCamera('all'); // Reset camera filter on rover/date change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRover, selectedDate]);

  // Fetch filtered photos when camera changes
  React.useEffect(() => {
    if (!selectedRover || !selectedDate) return;
    if (selectedCamera === 'all') {
      fetchMarsPhotos(selectedRover, selectedDate, undefined);
    } else {
      fetchMarsPhotos(selectedRover, selectedDate, selectedCamera);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamera]);

  const rovers = [
    { value: 'curiosity', label: 'Curiosity' },
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'spirit', label: 'Spirit' },
    { value: 'perseverance', label: 'Perseverance' }
  ];

  // Camera combobox options
  const dynamicCameraOptions = [
    { value: 'all', label: 'All Cameras' },
    ...availableCameras
  ];

  const handleRoverChange = (rover: string) => {
    setSelectedRover(rover);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCameraChange = (camera: string) => {
    setSelectedCamera(camera);
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
              <Select value={selectedCamera} onValueChange={handleCameraChange}>
                <SelectTrigger className="w-full sm:w-52">
                  <SelectValue placeholder="Camera type" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicCameraOptions.map((camera) => (
                    <SelectItem key={camera.value} value={camera.value}>
                      {camera.label}
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
              {marsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : marsPhotos.length}
            </div>
            <div className="text-sm text-muted-foreground">Photos Found</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-secondary">
              {marsLoading ? <Skeleton className="h-8 w-20 mx-auto" /> : (marsPhotos[0]?.rover.name || selectedRover)}
            </div>
            <div className="text-sm text-muted-foreground">Active Rover</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-accent">
              {marsLoading ? <Skeleton className="h-8 w-8 mx-auto" /> : (dynamicCameraOptions.length > 0 ? dynamicCameraOptions.length - 1 : 0)}
            </div>
            <div className="text-sm text-muted-foreground">Camera Types</div>
          </CardContent>
        </Card>
      </div>
      {/* Photos Grid */}
      {marsLoading ? (
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
      ) : marsPhotos.length === 0 ? (
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
              onClick={() => fetchMarsPhotos(selectedRover, selectedDate)}
            >
              Retry
            </Button>
            {marsError && <div className="text-destructive mt-2">{marsError}</div>}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marsPhotos.map((photo) => (
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
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-white/50">
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