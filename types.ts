
export interface PaleoData {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  summary: string;
  stats: PaleoStat[];
  features: PaleoFeature[];
  geologicalContext: {
    era: string;
    period: string;
    climate: string;
    age: string;
  };
  metadata: {
    threatLevel: string;
    threatScore: number; // 1-5 scale
    diet: string;
    packBehavior: string;
    integument: string;
    flight: string;
    osteologicalCompleteness: number; // 0-100 percentage
  };
}

export interface SiteMarker {
  name: string;
  lat: number;
  lng: number;
  id: string;
}

export interface PaleoStat {
  label: string;
  value: string;
  subtext: string;
  iconType: 'era' | 'geology' | 'discovery' | 'status';
}

export interface PaleoFeature {
  name: string;
  description: string;
  category: 'skull' | 'skeleton' | 'footprint' | 'environment';
}

// Added missing MapStyleConfig interface used in constants.ts for Google Maps styling
export interface MapStyleConfig {
  featureType?: string;
  elementType?: string;
  stylers: Array<{ [key: string]: string | number | boolean }>;
}
