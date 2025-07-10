import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Calendar, Download, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';
import { DateInput } from '@/components/ui/date-input';

interface EPICImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
  };
}

export const EarthImagery = () => {
  const [images, setImages] = useState<EPICImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2023-06-01'));
  const [imageType, setImageType] = useState<'natural' | 'enhanced'>('natural');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { toast } = useToast();

  const fetchEPICImages = async (date: Date | null, type: 'natural' | 'enhanced') => {
    setLoading(true);
    try {
      if (!date) return;
      
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `${API_ENDPOINTS.EPIC}?date=${dateStr}&type=${type}`
      );
      if (!response.ok) throw new Error('Failed to fetch EPIC images');
      const data: EPICImage[] = await response.json();
      setImages(data);
      setSelectedIdx(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Earth imagery. Please try a different date.",
        variant: "destructive"
      });
      setImages([]);
      setSelectedIdx(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEPICImages(selectedDate, imageType);
  }, [selectedDate, imageType]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleImageTypeChange = (type: 'natural' | 'enhanced') => {
    setImageType(type);
  };

  const getImageUrl = (image: EPICImage, size: 'png' | 'thumbs' = 'png') => {
    const dateStr = image.date.split(' ')[0].replace(/-/g, '/');
    
    return `https://api.nasa.gov/EPIC/archive/${imageType}/${dateStr}/png/${image.image}.png?api_key=1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU`;
  };

  const selectedImage = images[selectedIdx];

  // Carousel navigation
  const prevImage = () => setSelectedIdx((idx) => (idx > 0 ? idx - 1 : images.length - 1));
  const nextImage = () => setSelectedIdx((idx) => (idx < images.length - 1 ? idx + 1 : 0));

  // Format helpers
  const formatLatLon = (lat: number, lon: number) => `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
  const formatKm = (val: number) => `${val.toLocaleString()} km`;
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold font-orbitron bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Earth from <span className="text-blue-300">Space</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            View our beautiful planet as seen by NASA's EPIC camera aboard the DSCOVR satellite,<br />
            positioned at the L1 Lagrange point.
          </p>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4">
          <Select value={imageType} onValueChange={handleImageTypeChange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Image type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Natural Color</SelectItem>
              <SelectItem value="enhanced">Enhanced</SelectItem>
            </SelectContent>
          </Select>
          <DateInput
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date('2015-06-13')}
            maxDate={new Date()}
            placeholder="Select date"
          />
        </div>
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Image Carousel */}
          <Card className="bg-black rounded-2xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
            <Skeleton className="h-[400px] w-full" />
          </Card>
          {/* Right: Info Panel */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold font-orbitron text-white">Earth Observation</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Card className="bg-card/80 border-none">
                <CardContent className="flex flex-col items-start p-4">
                  <span className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Capture Date</span>
                  <span className="text-lg font-semibold text-white mt-1">-</span>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-none">
                <CardContent className="flex flex-col items-start p-4">
                  <span className="text-xs text-muted-foreground">Earth Center</span>
                  <span className="text-lg font-semibold text-white mt-1">-</span>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-card/80 border-none mb-4">
              <CardContent className="flex flex-col items-start p-4">
                <span className="text-xs text-muted-foreground mb-1">DSCOVR Satellite Position</span>
                <div className="flex gap-6 text-white">
                  <div><span className="font-bold">X:</span> -</div>
                  <div><span className="font-bold">Y:</span> -</div>
                  <div><span className="font-bold">Z:</span> -</div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">Position relative to Earth-Sun L1 Lagrange point in J2000 coordinates</span>
              </CardContent>
            </Card>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="rounded-lg h-14 w-14" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold font-orbitron bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Earth from <span className="text-blue-300">Space</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          View our beautiful planet as seen by NASA's EPIC camera aboard the DSCOVR satellite,<br />
          positioned at the L1 Lagrange point.
        </p>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4">
        <Select value={imageType} onValueChange={handleImageTypeChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Image type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="natural">Natural Color</SelectItem>
            <SelectItem value="enhanced">Enhanced</SelectItem>
          </SelectContent>
        </Select>
        <DateInput
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date('2015-06-13')}
          maxDate={new Date()}
          placeholder="Select date"
        />
      </div>
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Image Carousel */}
        <Card className="bg-black rounded-2xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
          {loading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : images.length > 0 ? (
            <>
              <img
                src={getImageUrl(selectedImage)}
                alt={selectedImage.caption}
                className="w-full h-[400px] object-contain bg-black rounded-2xl"
                style={{ maxWidth: 480 }}
              />
              {/* Carousel Controls */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-sm bg-black/60 rounded-full px-3 py-1">
                {selectedIdx + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] w-full text-muted-foreground">
              <Globe className="w-12 h-12 mb-4" />
              <span>No images found for this date.</span>
            </div>
          )}
        </Card>
        {/* Right: Info Panel */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold font-orbitron text-white">Earth Observation</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Card className="bg-card/80 border-none">
              <CardContent className="flex flex-col items-start p-4">
                <span className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Capture Date</span>
                <span className="text-lg font-semibold text-white mt-1">{selectedImage ? formatDate(selectedImage.date) : '-'}</span>
              </CardContent>
            </Card>
            <Card className="bg-card/80 border-none">
              <CardContent className="flex flex-col items-start p-4">
                <span className="text-xs text-muted-foreground">Earth Center</span>
                <span className="text-lg font-semibold text-white mt-1">
                  {selectedImage ? formatLatLon(selectedImage.centroid_coordinates.lat, selectedImage.centroid_coordinates.lon) : '-'}
                </span>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card/80 border-none mb-4">
            <CardContent className="flex flex-col items-start p-4">
              <span className="text-xs text-muted-foreground mb-1">DSCOVR Satellite Position</span>
              <div className="flex gap-6 text-white">
                <div><span className="font-bold">X:</span> {selectedImage ? formatKm(selectedImage.dscovr_j2000_position.x) : '-'}</div>
                <div><span className="font-bold">Y:</span> {selectedImage ? formatKm(selectedImage.dscovr_j2000_position.y) : '-'}</div>
                <div><span className="font-bold">Z:</span> {selectedImage ? formatKm(selectedImage.dscovr_j2000_position.z) : '-'}</div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">Position relative to Earth-Sun L1 Lagrange point in J2000 coordinates</span>
            </CardContent>
          </Card>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2 earth-thumbnails-scrollbar">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="rounded-lg h-14 w-14" />
              ))
            ) : (
              images.map((img, idx) => (
                <button
                  key={img.identifier}
                  className={`rounded-lg border-2 ${idx === selectedIdx ? 'border-blue-400' : 'border-transparent'} focus:outline-none`}
                  style={{ minWidth: 56, minHeight: 56 }}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <img
                    src={getImageUrl(img, 'thumbs')}
                    alt={img.caption}
                    className="rounded-lg object-cover h-14 w-14"
                  />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}