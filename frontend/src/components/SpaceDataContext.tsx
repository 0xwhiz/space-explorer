import React, { createContext, useContext, useState, ReactNode } from 'react';
import { API_ENDPOINTS } from '@/config/api';

// --- Data Types ---
export interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface MarsPhoto {
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

export interface MarsApiResponse {
  photos: MarsPhoto[];
}

export interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      kilometers: string;
    };
    orbiting_body: string;
  }>;
}

export interface NEOApiResponse {
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
  element_count: number;
}

export interface EPICImage {
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

// --- Context Types ---
interface SpaceDataContextType {
  // APOD
  apodData: APODData | null;
  apodLoading: boolean;
  apodError: string | null;
  fetchAPOD: (date?: Date) => Promise<void>;

  // Mars Rover
  marsPhotos: MarsPhoto[];
  marsLoading: boolean;
  marsError: string | null;
  fetchMarsPhotos: (rover: string, date: Date | null, camera?: string) => Promise<void>;

  // Near Earth Objects
  neoData: NEOApiResponse | null;
  neoLoading: boolean;
  neoError: string | null;
  fetchNEOs: (startDate: Date | null) => Promise<void>;

  // Earth Imagery
  epicImages: EPICImage[];
  epicLoading: boolean;
  epicError: string | null;
  fetchEPICImages: (date: Date | null, type: 'natural' | 'enhanced') => Promise<void>;
}

const SpaceDataContext = createContext<SpaceDataContextType | undefined>(undefined);

export const SpaceDataProvider = ({ children }: { children: ReactNode }) => {
  // --- APOD ---
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [apodLoading, setApodLoading] = useState(false);
  const [apodError, setApodError] = useState<string | null>(null);

  const fetchAPOD = async (date?: Date) => {
    setApodLoading(true);
    setApodError(null);
    try {
      const dateParam = date ? `?date=${date.toISOString().split('T')[0]}` : '';
      const response = await fetch(`${API_ENDPOINTS.APOD}${dateParam}`);
      if (!response.ok) throw new Error('Failed to fetch APOD data');
      const data = await response.json();
      setApodData(data);
    } catch (error: any) {
      setApodError(error.message || 'Unknown error');
      setApodData(null);
    } finally {
      setApodLoading(false);
    }
  };

  // --- Mars Rover ---
  const [marsPhotos, setMarsPhotos] = useState<MarsPhoto[]>([]);
  const [marsLoading, setMarsLoading] = useState(false);
  const [marsError, setMarsError] = useState<string | null>(null);

  const fetchMarsPhotos = async (rover: string, date: Date | null, camera?: string) => {
    setMarsLoading(true);
    setMarsError(null);
    try {
      if (!date) return;
      const dateStr = date.toISOString().split('T')[0];
      let url = `${API_ENDPOINTS.MARS_PHOTOS}?rover=${rover}&date=${dateStr}`;
      if (camera && camera !== 'all') {
        url += `&camera=${camera}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch Mars rover photos');
      const data: MarsApiResponse = await response.json();
      setMarsPhotos(data.photos);
    } catch (error: any) {
      setMarsError(error.message || 'Unknown error');
      setMarsPhotos([]);
    } finally {
      setMarsLoading(false);
    }
  };

  // --- Near Earth Objects ---
  const [neoData, setNeoData] = useState<NEOApiResponse | null>(null);
  const [neoLoading, setNeoLoading] = useState(false);
  const [neoError, setNeoError] = useState<string | null>(null);

  const fetchNEOs = async (startDate: Date | null) => {
    setNeoLoading(true);
    setNeoError(null);
    try {
      if (!startDate) return;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      const endDateStr = endDate.toISOString().split('T')[0];
      const startDateStr = startDate.toISOString().split('T')[0];
      const response = await fetch(
        `${API_ENDPOINTS.NEOWS}?start_date=${startDateStr}&end_date=${endDateStr}`
      );
      if (!response.ok) throw new Error('Failed to fetch Near Earth Objects data');
      const data: NEOApiResponse = await response.json();
      setNeoData(data);
    } catch (error: any) {
      setNeoError(error.message || 'Unknown error');
      setNeoData(null);
    } finally {
      setNeoLoading(false);
    }
  };

  // --- Earth Imagery ---
  const [epicImages, setEpicImages] = useState<EPICImage[]>([]);
  const [epicLoading, setEpicLoading] = useState(false);
  const [epicError, setEpicError] = useState<string | null>(null);

  const fetchEPICImages = async (date: Date | null, type: 'natural' | 'enhanced') => {
    setEpicLoading(true);
    setEpicError(null);
    try {
      if (!date) return;
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `${API_ENDPOINTS.EPIC}?date=${dateStr}&type=${type}`
      );
      if (!response.ok) throw new Error('Failed to fetch EPIC images');
      const data: EPICImage[] = await response.json();
      setEpicImages(data);
    } catch (error: any) {
      setEpicError(error.message || 'Unknown error');
      setEpicImages([]);
    } finally {
      setEpicLoading(false);
    }
  };

  return (
    <SpaceDataContext.Provider
      value={{
        apodData,
        apodLoading,
        apodError,
        fetchAPOD,
        marsPhotos,
        marsLoading,
        marsError,
        fetchMarsPhotos,
        neoData,
        neoLoading,
        neoError,
        fetchNEOs,
        epicImages,
        epicLoading,
        epicError,
        fetchEPICImages,
      }}
    >
      {children}
    </SpaceDataContext.Provider>
  );
};

export const useSpaceData = () => {
  const context = useContext(SpaceDataContext);
  if (context === undefined) {
    throw new Error('useSpaceData must be used within a SpaceDataProvider');
  }
  return context;
}; 