import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Share2, Heart, ExternalLink } from 'lucide-react';
import { DateInput } from '@/components/ui/date-input';
import { useSpaceData } from '@/components/SpaceDataContext';

export const APODViewer = () => { 
  const { apodData, apodLoading, apodError, fetchAPOD } = useSpaceData();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (selectedDate) {
      fetchAPOD(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      fetchAPOD(date);
    }
  };

  if (apodLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Controls (always visible) */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative z-10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-orbitron text-primary mb-2">
                  Astronomy Picture of the Day
                </h2>
                <p className="text-muted-foreground">
                  Discover the cosmos with NASA's daily featured image
                </p>
              </div>
              <div className="flex items-center gap-3">
                <DateInput
                  selected={selectedDate}
                  onChange={handleDateChange}
                  maxDate={new Date()}
                  placeholder="Select date"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Skeleton (only essential part) */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Skeleton className="h-7 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Media Skeleton */}
            <div className="relative">
              <Skeleton className="h-96 w-full rounded-lg mb-6" />
            </div>
            {/* Description Skeleton */}
            <div className="p-6">
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-orbitron text-primary mb-2">
                Astronomy Picture of the Day
              </h2>
              <p className="text-muted-foreground">
                Discover the cosmos with NASA's daily featured image
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DateInput
                selected={selectedDate}
                onChange={handleDateChange}
                maxDate={new Date()}
                placeholder="Select date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {apodData ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              {/* Top left: Picture label */}
              <CardTitle className="text-xl font-orbitron text-primary mb-2">
                {apodData.title}
              </CardTitle>
              {/* Top right: View Original button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(apodData.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Media Display */}
            <div className="relative">
              {apodData.media_type === 'image' ? (
                <div className="group relative">
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full h-auto max-h-[600px] object-cover"
                    loading="lazy"
                  />
                  {apodData.hdurl && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        onClick={() => window.open(apodData.hdurl, '_blank')}
                        className="bg-background/90 backdrop-blur-sm text-white/50"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View HD Version
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
            {/* Description */}
            <div className="p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground leading-relaxed">
                  {apodData.explanation}
                </p>
              </div>
              {/* Footer: bottom left and bottom right labels */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                {/* Bottom left: NASA APOD */}
                <div className="text-sm text-muted-foreground">
                  NASA APOD
                </div>
                {/* Bottom right: Image Credit: NASA */}
                <div className="text-sm text-muted-foreground">
                  Image Credit: NASA
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              {apodError || 'Failed to load Astronomy Picture of the Day'}
            </p>
            <Button onClick={() => fetchAPOD(selectedDate || undefined)} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};