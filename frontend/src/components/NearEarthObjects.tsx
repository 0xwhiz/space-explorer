import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Calendar, Ruler, Zap, ExternalLink, Target } from 'lucide-react';
import { DateInput } from '@/components/ui/date-input';
import { useSpaceData } from '@/components/SpaceDataContext';

export const NearEarthObjects = () => {
  const { neoData, neoLoading, neoError, fetchNEOs } = useSpaceData();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetchNEOs(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const getAllNEOs = () => {
    if (!neoData) return [];
    return Object.values(neoData.near_earth_objects).flat();
  };

  const getHazardousNEOs = () => {
    return getAllNEOs().filter(neo => neo.is_potentially_hazardous_asteroid);
  };

  const todaysNEOs = neoData?.near_earth_objects[selectedDate?.toISOString().split('T')[0] || ''] || [];

  const formatDistance = (km: string): string => {
    const distance = parseFloat(km);
    if (distance > 1000000) {
      return `${(distance / 1000000).toFixed(2)}M km`;
    }
    return `${distance.toLocaleString()} km`;
  };

  const formatDiameter = (neo: any): string => {
    const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
    const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
    return `${min.toFixed(2)} - ${max.toFixed(2)} km`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative z-10">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-orbitron text-primary mb-2">
                Near Earth Objects
              </CardTitle>
              <p className="text-muted-foreground">
                Track asteroids and comets approaching our planet
              </p>
            </div>
            <DateInput
              selected={selectedDate}
              onChange={handleDateChange}
              maxDate={new Date()}
              placeholder="Select date"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-primary">
              {neoLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : (neoData?.element_count || 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Objects</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-destructive">
              {neoLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : getHazardousNEOs().length}
            </div>
            <div className="text-sm text-muted-foreground">Potentially Hazardous</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-secondary">
              {neoLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : todaysNEOs.length}
            </div>
            <div className="text-sm text-muted-foreground">Today's Approaches</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold font-orbitron text-accent">
              {neoLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : (() => {
                if (!neoData) return 'N/A';
                const allNEOs = getAllNEOs();
                if (!allNEOs.length) return 'N/A';
                const closest = allNEOs.reduce((closest, neo) => {
                  const distance = parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || '999999999');
                  return distance < closest ? distance : closest;
                }, 999999999);
                if (closest === 999999999) return 'N/A';
                const closestKm = allNEOs.reduce((closestKm, neo) => {
                  const distance = parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || '999999999');
                  const currentClosest = parseFloat(closestKm);
                  return distance < currentClosest ? neo.close_approach_data[0].miss_distance.kilometers : closestKm;
                }, '999999999');
                return formatDistance(closestKm);
              })()}
            </div>
            <div className="text-sm text-muted-foreground">Closest Approach</div>
          </CardContent>
        </Card>
      </div>

      {/* NEO Data Tabs/Grid */}
      {neoLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : neoData ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              All Objects ({getAllNEOs().length})
            </TabsTrigger>
            <TabsTrigger value="hazardous" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Hazardous ({getHazardousNEOs().length})
            </TabsTrigger>
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Today ({todaysNEOs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <NEOGrid neos={getAllNEOs().slice(0, 12)} />
          </TabsContent>

          <TabsContent value="hazardous" className="space-y-4">
            <NEOGrid neos={getHazardousNEOs()} />
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <NEOGrid neos={todaysNEOs} />
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">{neoError || 'Failed to load Near Earth Objects data.'}</p>
            <Button onClick={() => fetchNEOs(selectedDate)} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface NEOGridProps {
  neos: any[]; // Changed to any[] as NearEarthObject type is removed
}

const NEOGrid: React.FC<NEOGridProps> = ({ neos }) => {
  const formatDistance = (km: string): string => {
    const distance = parseFloat(km);
    if (distance > 1000000) {
      return `${(distance / 1000000).toFixed(2)}M km`;
    }
    return `${distance.toLocaleString()} km`;
  };

  const formatDiameter = (neo: any): string => { // Changed to any as NearEarthObject type is removed
    const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
    const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
    return `${min.toFixed(2)} - ${max.toFixed(2)} km`;
  };

  if (neos.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Objects Found</h3>
          <p className="text-muted-foreground">
            No Near Earth Objects found for the selected criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {neos.map((neo) => {
        const approach = neo.close_approach_data[0];
        return (
          <Card 
            key={neo.id} 
            className="group bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-cosmic transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-orbitron text-primary line-clamp-2">
                  {neo.name}
                </CardTitle>
                {neo.is_potentially_hazardous_asteroid && (
                  <Badge variant="destructive" className="shrink-0">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Hazardous
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Ruler className="w-4 h-4" />
                    <span>Diameter</span>
                  </div>
                  <div className="font-medium">{formatDiameter(neo)}</div>
                </div>
                
                {approach && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      <span>Velocity</span>
                    </div>
                    <div className="font-medium">
                      {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(1)} km/s
                    </div>
                  </div>
                )}
              </div>

              {approach && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Target className="w-4 h-4" />
                    <span>Miss Distance</span>
                  </div>
                  <div className="font-medium">{formatDistance(approach.miss_distance.kilometers)}</div>
                  <div className="text-xs text-muted-foreground">
                    {approach.close_approach_date} • {approach.orbiting_body}
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(neo.nasa_jpl_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};