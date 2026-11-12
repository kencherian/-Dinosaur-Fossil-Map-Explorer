import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { PaleoData } from '../types';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Sparkles, 
  Info, 
  ChevronRight,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export interface ClimateRadarVariable {
  key: string;
  label: string;
  shortLabel: string;
  unit: string;
  siteValue: number;
  globalValue: number;
  displaySite: string;
  displayGlobal: string;
  minDomain: number;
  maxDomain: number;
  interpretation: string;
  icon: React.ReactNode;
}

interface ClimateProfile {
  biomeName: string;
  classification: string;
  summary: string;
  variables: ClimateRadarVariable[];
}

interface ClimateRadarChartProps {
  selectedSite: PaleoData;
  className?: string;
}

// Global baseline profiles for comparison
const MESOZOIC_GLOBAL_AVERAGE = {
  temperature: 19.5, // °C (Mesozoic Greenhouse world)
  humidity: 62.0,    // %
  precipitation: 1050, // mm/year
  seasonality: 16.0,  // °C thermal fluctuation range
  moistureIndex: 55.0 // % saturation ratio
};

const MODERN_EARTH_AVERAGE = {
  temperature: 15.0, // °C
  humidity: 60.0,    // %
  precipitation: 990,  // mm/year
  seasonality: 22.0,  // °C
  moistureIndex: 50.0 // %
};

/**
 * Derives scientific paleoclimate parameters from site formation, geological period, and climate text.
 */
function deriveSiteClimate(site: PaleoData, baselineType: 'mesozoic' | 'modern'): ClimateProfile {
  const name = site.name.toLowerCase();
  const climateStr = (site.geologicalContext?.climate || '').toLowerCase();
  const period = (site.geologicalContext?.period || '').toLowerCase();
  const lat = Math.abs(site.coordinates?.lat ?? 45);

  const baseline = baselineType === 'mesozoic' ? MESOZOIC_GLOBAL_AVERAGE : MODERN_EARTH_AVERAGE;

  // Defaults
  let temp = 22.0;
  let humidity = 68.0;
  let precip = 1350;
  let seasonality = 15.0;
  let moisture = 65.0;
  let biomeName = "Subtropical Lowland";
  let classification = "Warm Humid Fluvial Plain";
  let summary = "Temperate to warm fluvial ecosystem with continuous canopy moisture.";

  // Specific fossil formations
  if (name.includes("hell creek")) {
    temp = 22.5;
    humidity = 76.0;
    precip = 1520;
    seasonality = 14.0;
    moisture = 75.0;
    biomeName = "Riparian Floodplain & Conifer Forest";
    classification = "Subtropical Cretaceous Coastal Plain";
    summary = "High rainfall nourished by the Western Interior Seaway, supporting broadleaf trees, ferns, and marshy flood basins.";
  } else if (name.includes("lance")) {
    temp = 21.0;
    humidity = 72.0;
    precip = 1380;
    seasonality = 15.0;
    moisture = 70.0;
    biomeName = "Warm Wetland & Alluvial Plain";
    classification = "Subtropical Forest Lowland";
    summary = "Lush riparian channels with seasonal monsoons and high vegetative biomass.";
  } else if (name.includes("scollard") || name.includes("frenchman")) {
    temp = 18.5;
    humidity = 70.0;
    precip = 1220;
    seasonality = 18.0;
    moisture = 68.0;
    biomeName = "Temperate Coastal Forest";
    classification = "Warm-Temperate Humid";
    summary = "Northern latitude maritime climate with mild winters and rich deltaic swamps.";
  } else if (name.includes("kem kem") || name.includes("bahariya") || name.includes("chenini")) {
    temp = 29.5;
    humidity = 88.0;
    precip = 2250;
    seasonality = 8.0;
    moisture = 92.0;
    biomeName = "Equatorial Mangrove & Tidal Delta";
    classification = "Tropical Super-Humid Estuary";
    summary = "Vast interconnected river systems, mangrove shores, and immense freshwater discharge teeming with aquatic fauna.";
  } else if (name.includes("flaming cliffs") || name.includes("nemegt") || name.includes("djadochta") || name.includes("barun goyot")) {
    temp = 26.5;
    humidity = 28.0;
    precip = 280;
    seasonality = 30.0;
    moisture = 22.0;
    biomeName = "Hyper-Arid Eolian Dunes & Oases";
    classification = "Continental Arid Desert";
    summary = "Wind-swept dunes punctuated by intermittent watercourses and localized caliche sandstones.";
  } else if (name.includes("morrison") || name.includes("como bluff") || name.includes("dinosaur national")) {
    temp = 23.5;
    humidity = 46.0;
    precip = 650;
    seasonality = 22.0;
    moisture = 42.0;
    biomeName = "Semi-Arid Savanna & Fern Prairie";
    classification = "Subtropical Savanna with Dry Season";
    summary = "Vast semi-arid lowlands with marked wet-dry seasons; braided river corridors sustained titan sauropods.";
  } else if (name.includes("yixian") || name.includes("jiufotang") || name.includes("liaoning")) {
    temp = 12.8;
    humidity = 64.0;
    precip = 1120;
    seasonality = 24.0;
    moisture = 65.0;
    biomeName = "Montane Lacustrine & Temperate Forest";
    classification = "Cool-Temperate Volcanic Basin";
    summary = "Distinct cool seasons with occasional montane frost; favored feathery proto-plumage for thermoregulation.";
  } else if (name.includes("tendaguru")) {
    temp = 27.5;
    humidity = 82.0;
    precip = 1850;
    seasonality = 11.0;
    moisture = 82.0;
    biomeName = "Tropical Coastal Lagoon & Barrier";
    classification = "Tropical Maritime Estuary";
    summary = "Shallow tidal lagoons backed by coastal hinterland forests in Gondwanan latitudes.";
  } else if (name.includes("solnhofen")) {
    temp = 26.0;
    humidity = 62.0;
    precip = 1050;
    seasonality = 13.0;
    moisture = 58.0;
    biomeName = "Arid Archipelago & Hypersaline Lagoon";
    classification = "Subtropical Island Seaway";
    summary = "Semi-arid archipelagos surrounded by calm, stagnant hypersaline basins preserving exquisite skeletal details.";
  } else {
    // Algorithmic fall-through based on climate description and latitude
    if (climateStr.includes("arid") || climateStr.includes("desert") || climateStr.includes("dune")) {
      temp = 27.0 - (lat * 0.1);
      humidity = 30.0;
      precip = 320;
      seasonality = 26.0;
      moisture = 25.0;
      biomeName = "Arid Sand Dunes & Desert Basin";
      classification = "Arid Continental Basin";
      summary = "Low precipitation regime dominated by episodic flash floods and ephemeral stream deposits.";
    } else if (climateStr.includes("tropical") || climateStr.includes("estuary") || climateStr.includes("swamp")) {
      temp = 28.5 - (lat * 0.15);
      humidity = 84.0;
      precip = 2100;
      seasonality = 9.0;
      moisture = 88.0;
      biomeName = "Tropical Estuary & Coastal Wetland";
      classification = "Tropical Monsoon Lowland";
      summary = "Warm, high-precipitation coastal margin with abundant riparian vegetation and standing water.";
    } else if (climateStr.includes("subtropical") || climateStr.includes("warm")) {
      temp = 23.0 - (lat * 0.12);
      humidity = 74.0;
      precip = 1450;
      seasonality = 14.0;
      moisture = 72.0;
      biomeName = "Subtropical Riverine Floodplain";
      classification = "Subtropical Humid Forest";
      summary = "Warm greenhouse climate with abundant moisture and lush gymnosperm woodlands.";
    } else if (climateStr.includes("temperate") || climateStr.includes("forest")) {
      temp = 16.0 - (lat * 0.15);
      humidity = 68.0;
      precip = 1150;
      seasonality = 20.0;
      moisture = 65.0;
      biomeName = "Temperate Coniferous Woodland";
      classification = "Temperate Forest Belt";
      summary = "Moderate climate with seasonal foliage shedding and persistent understory humidity.";
    } else {
      temp = Math.max(14, 25 - (lat * 0.2));
      humidity = 65.0;
      precip = 1200;
      seasonality = 16.0;
      moisture = 60.0;
      biomeName = "Mesozoic Mixed Woodland";
      classification = "Subtropical Mixed Alluvial";
      summary = "Typical Mesozoic greenhouse climate marked by elevated atmospheric CO2 and subdued polar temperature gradients.";
    }
  }

  const variables: ClimateRadarVariable[] = [
    {
      key: 'temperature',
      label: 'Mean Temperature',
      shortLabel: 'Temp',
      unit: '°C',
      siteValue: Math.round(temp * 10) / 10,
      globalValue: baseline.temperature,
      displaySite: `${temp.toFixed(1)}°C`,
      displayGlobal: `${baseline.temperature.toFixed(1)}°C`,
      minDomain: 0,
      maxDomain: 35,
      interpretation: temp > baseline.temperature 
        ? `+${(temp - baseline.temperature).toFixed(1)}°C warmer than global average` 
        : `${(temp - baseline.temperature).toFixed(1)}°C cooler than global average`,
      icon: <Thermometer size={13} className="text-rose-500" />
    },
    {
      key: 'humidity',
      label: 'Relative Humidity',
      shortLabel: 'Humidity',
      unit: '%',
      siteValue: Math.round(humidity),
      globalValue: baseline.humidity,
      displaySite: `${Math.round(humidity)}%`,
      displayGlobal: `${Math.round(baseline.humidity)}%`,
      minDomain: 0,
      maxDomain: 100,
      interpretation: humidity > baseline.humidity 
        ? `+${Math.round(humidity - baseline.humidity)}% higher atmospheric moisture` 
        : `${Math.round(humidity - baseline.humidity)}% drier atmospheric moisture`,
      icon: <Droplets size={13} className="text-sky-500" />
    },
    {
      key: 'precipitation',
      label: 'Annual Precipitation',
      shortLabel: 'Precip',
      unit: 'mm',
      siteValue: Math.round(precip),
      globalValue: baseline.precipitation,
      displaySite: `${Math.round(precip).toLocaleString()} mm`,
      displayGlobal: `${Math.round(baseline.precipitation).toLocaleString()} mm`,
      minDomain: 0,
      maxDomain: 2500,
      interpretation: precip > baseline.precipitation 
        ? `+${Math.round(precip - baseline.precipitation).toLocaleString()} mm surplus rainfall` 
        : `${Math.round(precip - baseline.precipitation).toLocaleString()} mm moisture deficit`,
      icon: <CloudRain size={13} className="text-teal-600" />
    },
    {
      key: 'seasonality',
      label: 'Thermal Seasonality',
      shortLabel: 'Seasonality',
      unit: '°C',
      siteValue: Math.round(seasonality * 10) / 10,
      globalValue: baseline.seasonality,
      displaySite: `±${seasonality.toFixed(1)}°C`,
      displayGlobal: `±${baseline.seasonality.toFixed(1)}°C`,
      minDomain: 0,
      maxDomain: 35,
      interpretation: seasonality < baseline.seasonality
        ? 'Mild equable seasons (buffered greenhouse stability)'
        : 'High seasonal flux (continental interior climate)',
      icon: <Wind size={13} className="text-amber-500" />
    },
    {
      key: 'moistureIndex',
      label: 'Moisture Saturation',
      shortLabel: 'Moisture',
      unit: '%',
      siteValue: Math.round(moisture),
      globalValue: baseline.moistureIndex,
      displaySite: `${Math.round(moisture)}%`,
      displayGlobal: `${Math.round(baseline.moistureIndex)}%`,
      minDomain: 0,
      maxDomain: 100,
      interpretation: moisture > 70 
        ? 'Riparian / flood basin saturated soils' 
        : moisture < 35 
        ? 'Well-drained arid eolian regolith' 
        : 'Moderately drained woodland soil',
      icon: <Sun size={13} className="text-emerald-600" />
    }
  ];

  return {
    biomeName,
    classification,
    summary,
    variables
  };
}

export const ClimateRadarChart: React.FC<ClimateRadarChartProps> = ({ 
  selectedSite,
  className = "" 
}) => {
  const [baselineType, setBaselineType] = useState<'mesozoic' | 'modern'>('mesozoic');
  const [mode, setMode] = useState<'core' | 'full'>('core');
  const [hoveredVarKey, setHoveredVarKey] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Derive climate data profile
  const profile = useMemo(() => {
    return deriveSiteClimate(selectedSite, baselineType);
  }, [selectedSite, baselineType]);

  // Selected variables for radar polygon (Core 3 variables: Temp, Humidity, Precip vs Full 5 variables)
  const activeVars = useMemo(() => {
    if (mode === 'core') {
      return profile.variables.filter(v => ['temperature', 'humidity', 'precipitation'].includes(v.key));
    }
    return profile.variables;
  }, [profile, mode]);

  // Dimensions & Radar Geometry
  const width = 340;
  const height = 240;
  const cx = width / 2;
  const cy = height / 2 - 4;
  const radius = 78;

  // Concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Radar scale: maps 0-100% normalized to radial distance
  const rScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 1]).range([0, radius]);
  }, [radius]);

  // Normalized values (0 to 1) for site & global
  const normalizedData = useMemo(() => {
    const total = activeVars.length;
    const angleSlice = (Math.PI * 2) / total;

    const sitePoints: { x: number; y: number; val: number; v: ClimateRadarVariable }[] = [];
    const globalPoints: { x: number; y: number; val: number; v: ClimateRadarVariable }[] = [];

    activeVars.forEach((v, i) => {
      // Angle: starting at -PI / 2 (top 12 o'clock)
      const angle = i * angleSlice - Math.PI / 2;
      
      // Normalize variable value between 0 and 1
      const normSite = Math.min(1, Math.max(0.08, (v.siteValue - v.minDomain) / (v.maxDomain - v.minDomain)));
      const normGlobal = Math.min(1, Math.max(0.08, (v.globalValue - v.minDomain) / (v.maxDomain - v.minDomain)));

      const rSite = rScale(normSite);
      const rGlobal = rScale(normGlobal);

      sitePoints.push({
        x: cx + rSite * Math.cos(angle),
        y: cy + rSite * Math.sin(angle),
        val: normSite,
        v
      });

      globalPoints.push({
        x: cx + rGlobal * Math.cos(angle),
        y: cy + rGlobal * Math.sin(angle),
        val: normGlobal,
        v
      });
    });

    return { sitePoints, globalPoints, angleSlice };
  }, [activeVars, cx, cy, rScale]);

  // D3 Path generator for closed radar polygon
  const sitePathD = useMemo(() => {
    const lineGen = d3.line<{ x: number; y: number }>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveLinearClosed);
    return lineGen(normalizedData.sitePoints) || "";
  }, [normalizedData.sitePoints]);

  const globalPathD = useMemo(() => {
    const lineGen = d3.line<{ x: number; y: number }>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveLinearClosed);
    return lineGen(normalizedData.globalPoints) || "";
  }, [normalizedData.globalPoints]);

  // Current active inspected variable (or default to temperature)
  const currentInspectVar = useMemo(() => {
    if (hoveredVarKey) {
      return profile.variables.find(v => v.key === hoveredVarKey) || profile.variables[0];
    }
    return profile.variables[0];
  }, [hoveredVarKey, profile.variables]);

  return (
    <div className={`bg-white rounded-2xl border border-park-card-border shadow-xs overflow-hidden ${className}`}>
      
      {/* Header bar: Nature Park Field Guide Aesthetic */}
      <div className="px-4 py-3 bg-[#faf8f2] border-b border-park-card-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-park-tree text-white flex items-center justify-center shadow-2xs">
            <Compass size={13} strokeWidth={2.4} />
          </div>
          <div>
            <h3 className="text-[13px] font-rounded font-bold text-park-tree leading-tight flex items-center gap-1.5">
              <span>Paleoclimate Radar</span>
              <span className="text-[8.5px] bg-park-land/40 text-park-tree font-bold px-1.5 py-0.2 rounded border border-park-border-green/50">
                D3 Analysis
              </span>
            </h3>
            <p className="text-[9.5px] font-rounded text-park-ink-muted leading-none mt-0.5">
              {profile.classification}
            </p>
          </div>
        </div>

        {/* Core (3-Axis) vs Full (5-Axis) Switcher */}
        <div className="flex items-center bg-park-card-muted/70 p-0.5 rounded-lg border border-park-card-border text-[9.5px] font-rounded font-bold">
          <button
            onClick={() => setMode('core')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              mode === 'core' 
                ? 'bg-park-tree text-white shadow-2xs' 
                : 'text-park-ink-muted hover:text-park-ink'
            }`}
            title="Core Climate: Temperature, Humidity, and Precipitation"
          >
            3-Axis Core
          </button>
          <button
            onClick={() => setMode('full')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              mode === 'full' 
                ? 'bg-park-tree text-white shadow-2xs' 
                : 'text-park-ink-muted hover:text-park-ink'
            }`}
            title="Complete 5-variable paleoclimatic matrix"
          >
            5-Axis Full
          </button>
        </div>
      </div>

      {/* Main Radar SVG Viewport */}
      <div className="relative pt-2 pb-1 flex flex-col items-center select-none bg-gradient-to-b from-[#fcfbf7] to-white">
        
        {/* Floating Interactive Variable Tooltip */}
        <div className="w-full px-4 mb-1">
          <div className="bg-[#f5f3e9]/90 border border-park-card-border rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] font-rounded">
            <div className="flex items-center gap-1.5">
              {currentInspectVar.icon}
              <span className="font-extrabold text-park-ink">
                {currentInspectVar.label}:
              </span>
              <span className="font-mono font-bold text-park-tree bg-white px-1.5 py-0.5 rounded border border-park-card-border shadow-2xs">
                {currentInspectVar.displaySite}
              </span>
              <span className="text-[9px] text-park-ink-muted">vs</span>
              <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {currentInspectVar.displayGlobal} avg
              </span>
            </div>

            <div className="flex items-center gap-1 text-[9px] font-bold">
              {currentInspectVar.siteValue >= currentInspectVar.globalValue ? (
                <span className="text-emerald-700 flex items-center">
                  <ArrowUpRight size={12} />
                  +{Math.round(((currentInspectVar.siteValue - currentInspectVar.globalValue) / (currentInspectVar.globalValue || 1)) * 100)}%
                </span>
              ) : (
                <span className="text-rose-700 flex items-center">
                  <ArrowDownRight size={12} />
                  {Math.round(((currentInspectVar.siteValue - currentInspectVar.globalValue) / (currentInspectVar.globalValue || 1)) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <svg 
          ref={svgRef} 
          width={width} 
          height={height} 
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <defs>
            {/* Site Polygon Gradient */}
            <radialGradient id="siteRadarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#87bd52" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#2b585c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2b585c" stopOpacity="0.10" />
            </radialGradient>

            {/* Global Polygon Gradient */}
            <radialGradient id="globalRadarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
            </radialGradient>

            {/* Soft drop shadow */}
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2b585c" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Background Concentric Radar Webs (D3 range) */}
          <g className="radar-grid">
            {levels.map((level, idx) => {
              const r = rScale(level);
              const total = activeVars.length;
              const angleSlice = (Math.PI * 2) / total;
              
              // Generate polygon points for this grid level
              const gridPoints = activeVars.map((_, i) => {
                const angle = i * angleSlice - Math.PI / 2;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
              }).join(" ");

              return (
                <g key={`level-${idx}`}>
                  <polygon
                    points={gridPoints}
                    fill={idx === levels.length - 1 ? "#faf8f2" : "none"}
                    stroke="#e6e1d1"
                    strokeWidth="1"
                    strokeDasharray={idx === levels.length - 1 ? "none" : "3,3"}
                  />
                  {/* Scale percentage label along top axis */}
                  <text
                    x={cx + 4}
                    y={cy - r + 3}
                    fill="#9ca3af"
                    fontSize="7.5"
                    fontFamily="'Nunito', sans-serif"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {Math.round(level * 100)}%
                  </text>
                </g>
              );
            })}
          </g>

          {/* Radial Spokes from Center to Outer Vertex */}
          <g className="radar-spokes">
            {activeVars.map((v, i) => {
              const angle = i * normalizedData.angleSlice - Math.PI / 2;
              const x2 = cx + radius * Math.cos(angle);
              const y2 = cy + radius * Math.sin(angle);
              const isHovered = hoveredVarKey === v.key;

              return (
                <line
                  key={`spoke-${v.key}`}
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke={isHovered ? "#2b585c" : "#dfd9c7"}
                  strokeWidth={isHovered ? "1.8" : "1"}
                  className="transition-colors duration-150"
                />
              );
            })}
          </g>

          {/* Global Average Baseline Polygon (Amber Dashed) */}
          <g className="radar-global-polygon">
            <path
              d={globalPathD}
              fill="url(#globalRadarGradient)"
              stroke="#d97706"
              strokeWidth="1.8"
              strokeDasharray="4,3"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
            {/* Global vertex anchors */}
            {normalizedData.globalPoints.map((pt) => (
              <circle
                key={`global-pt-${pt.v.key}`}
                cx={pt.x}
                cy={pt.y}
                r="3"
                fill="#d97706"
                stroke="#ffffff"
                strokeWidth="1"
                className="transition-all duration-200"
              />
            ))}
          </g>

          {/* Current Site Climate Polygon (Vibrant Park Tree / Accent Green) */}
          <g className="radar-site-polygon">
            <path
              d={sitePathD}
              fill="url(#siteRadarGradient)"
              stroke="#2b585c"
              strokeWidth="2.4"
              strokeLinejoin="round"
              filter="url(#radarGlow)"
              className="transition-all duration-300"
            />

            {/* Site vertex circles with hover effects */}
            {normalizedData.sitePoints.map((pt) => {
              const isHovered = hoveredVarKey === pt.v.key;
              return (
                <g 
                  key={`site-pt-${pt.v.key}`}
                  onMouseEnter={() => setHoveredVarKey(pt.v.key)}
                  onMouseLeave={() => setHoveredVarKey(null)}
                  className="cursor-pointer"
                >
                  {/* Subtle pulsing aura on hover */}
                  {isHovered && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="9"
                      fill="#87bd52"
                      fillOpacity="0.3"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? "5.5" : "4.2"}
                    fill="#2b585c"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    className="transition-all duration-150"
                  />
                </g>
              );
            })}
          </g>

          {/* Axis Labels & Values Placed around the perimeter */}
          <g className="radar-labels">
            {activeVars.map((v, i) => {
              const angle = i * normalizedData.angleSlice - Math.PI / 2;
              const labelRadius = radius + 22;
              const lx = cx + labelRadius * Math.cos(angle);
              const ly = cy + labelRadius * Math.sin(angle);
              const isHovered = hoveredVarKey === v.key;

              // Text anchor based on horizontal angle
              let textAnchor = "middle";
              if (Math.cos(angle) > 0.3) textAnchor = "start";
              else if (Math.cos(angle) < -0.3) textAnchor = "end";

              return (
                <g
                  key={`label-${v.key}`}
                  transform={`translate(${lx}, ${ly})`}
                  onMouseEnter={() => setHoveredVarKey(v.key)}
                  onMouseLeave={() => setHoveredVarKey(null)}
                  className="cursor-pointer group"
                >
                  <text
                    x="0"
                    y="-2"
                    textAnchor={textAnchor}
                    fill={isHovered ? "#2b585c" : "#1f3835"}
                    fontSize="9.5"
                    fontFamily="'Nunito', sans-serif"
                    fontWeight={isHovered ? "800" : "700"}
                    className="transition-colors"
                  >
                    {v.label}
                  </text>
                  <text
                    x="0"
                    y="9"
                    textAnchor={textAnchor}
                    fill={isHovered ? "#87bd52" : "#6b7280"}
                    fontSize="8.5"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="600"
                  >
                    {v.displaySite}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Radar Map Legend */}
        <div className="flex items-center justify-center gap-5 mt-1 text-[10px] font-rounded">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2 rounded bg-park-tree/40 border border-park-tree inline-block shadow-2xs"></span>
            <span className="font-extrabold text-park-tree">
              Site Paleoclimate
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-600 inline-block"></span>
            <span className="font-bold text-amber-800">
              {baselineType === 'mesozoic' ? 'Mesozoic Avg' : 'Modern Earth Avg'}
            </span>
          </div>

          {/* Baseline Switch Toggle */}
          <button
            onClick={() => setBaselineType(b => b === 'mesozoic' ? 'modern' : 'mesozoic')}
            className="text-[9px] font-bold text-park-ink-muted hover:text-park-tree underline transition-colors"
            title="Switch comparison between Mesozoic Greenhouse World and Modern Earth"
          >
            Switch Baseline
          </button>
        </div>
      </div>

      {/* Comparative Climate Variable Cards (Core 3: Temperature, Humidity, Precipitation) */}
      <div className="p-3 bg-[#fbfaf6] border-t border-park-card-border space-y-2">
        <div className="flex items-center justify-between text-[9.5px] font-rounded font-extrabold uppercase text-park-ink-muted px-0.5">
          <span>Target Climate Variables</span>
          <span>Difference vs Baseline</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* 1. Temperature Card */}
          {(() => {
            const tempVar = profile.variables[0];
            const diff = tempVar.siteValue - tempVar.globalValue;
            return (
              <div 
                onMouseEnter={() => setHoveredVarKey('temperature')}
                onMouseLeave={() => setHoveredVarKey(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  hoveredVarKey === 'temperature'
                    ? 'bg-rose-50/80 border-rose-300 shadow-xs'
                    : 'bg-white border-park-card-border hover:border-park-border-green/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-rounded font-bold text-park-ink-muted">Temperature</span>
                  <Thermometer size={12} className="text-rose-500" />
                </div>
                <div className="text-[13px] font-mono font-extrabold text-park-ink leading-none">
                  {tempVar.displaySite}
                </div>
                <div className="flex items-center gap-0.5 mt-1 text-[8.5px] font-bold font-mono">
                  {diff >= 0 ? (
                    <span className="text-emerald-700">+{diff.toFixed(1)}°C</span>
                  ) : (
                    <span className="text-rose-700">{diff.toFixed(1)}°C</span>
                  )}
                  <span className="text-park-ink-muted font-normal">vs avg</span>
                </div>
              </div>
            );
          })()}

          {/* 2. Humidity Card */}
          {(() => {
            const humVar = profile.variables[1];
            const diff = humVar.siteValue - humVar.globalValue;
            return (
              <div 
                onMouseEnter={() => setHoveredVarKey('humidity')}
                onMouseLeave={() => setHoveredVarKey(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  hoveredVarKey === 'humidity'
                    ? 'bg-sky-50/80 border-sky-300 shadow-xs'
                    : 'bg-white border-park-card-border hover:border-park-border-green/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-rounded font-bold text-park-ink-muted">Humidity</span>
                  <Droplets size={12} className="text-sky-500" />
                </div>
                <div className="text-[13px] font-mono font-extrabold text-park-ink leading-none">
                  {humVar.displaySite}
                </div>
                <div className="flex items-center gap-0.5 mt-1 text-[8.5px] font-bold font-mono">
                  {diff >= 0 ? (
                    <span className="text-emerald-700">+{diff}%</span>
                  ) : (
                    <span className="text-amber-700">{diff}%</span>
                  )}
                  <span className="text-park-ink-muted font-normal">vs avg</span>
                </div>
              </div>
            );
          })()}

          {/* 3. Precipitation Card */}
          {(() => {
            const precVar = profile.variables[2];
            const diff = precVar.siteValue - precVar.globalValue;
            return (
              <div 
                onMouseEnter={() => setHoveredVarKey('precipitation')}
                onMouseLeave={() => setHoveredVarKey(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  hoveredVarKey === 'precipitation'
                    ? 'bg-teal-50/80 border-teal-300 shadow-xs'
                    : 'bg-white border-park-card-border hover:border-park-border-green/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-rounded font-bold text-park-ink-muted">Precipitation</span>
                  <CloudRain size={12} className="text-teal-600" />
                </div>
                <div className="text-[12.5px] font-mono font-extrabold text-park-ink leading-none">
                  {precVar.displaySite}
                </div>
                <div className="flex items-center gap-0.5 mt-1 text-[8.5px] font-bold font-mono">
                  {diff >= 0 ? (
                    <span className="text-emerald-700">+{diff.toLocaleString()} mm</span>
                  ) : (
                    <span className="text-rose-700">{diff.toLocaleString()} mm</span>
                  )}
                  <span className="text-park-ink-muted font-normal">vs avg</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Paleoclimatic Habitat Field Note */}
        <div className="p-2.5 bg-white rounded-xl border border-park-card-border text-[10px] font-rounded flex items-start gap-2">
          <Info size={13} className="text-park-tree shrink-0 mt-0.5" />
          <div className="text-park-ink-muted leading-relaxed">
            <span className="font-extrabold text-park-tree">{profile.biomeName}: </span>
            {profile.summary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateRadarChart;
