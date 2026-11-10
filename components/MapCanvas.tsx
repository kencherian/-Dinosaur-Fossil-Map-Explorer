import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { SiteMarker } from '../types';
import { Plus, Minus, Compass, Navigation, Trees, MapPin, Footprints, Wind, Anchor } from 'lucide-react';

// Dino footprint path data
const DINO_FOOTPRINT_PATH = "M511.517,370.284c-5.971-20.294-92.954-22.906-113.159-18.866c-20.216,4.041-76.79,2.68-88.913-9.443c-12.124-12.124,4.041-32.329,16.175-44.451c12.124-12.124,38.389-50.524,46.472-58.606c8.082-8.082,50.166-50.378,65.325-74.758c30.988-49.843,41.437-98.68,25.262-114.845c-16.164-16.164-65.003-5.727-114.834,25.262c-24.38,15.17-66.688,57.244-74.769,65.325c-8.083,8.083-46.472,34.36-58.606,46.483c-12.122,12.124-32.328,28.287-44.451,16.164c-12.122-12.124-13.474-68.698-9.433-88.902c4.041-20.205,1.419-107.187-18.866-113.16C121.438-5.483,83.798,44.94,68.984,87.37c-8.685,24.871-82.852,141.446-66.688,226.319c16.175,84.872,31,127.982,49.507,146.503c18.519,18.519,61.642,33.343,146.503,49.507c84.872,16.164,201.448-57.991,226.319-66.676C467.056,428.198,517.478,390.557,511.517,370.284z";

// Predefined decorative tree cluster coordinates for natural continents
const DECORATIVE_TREES = [
  // North America
  { lat: 48.5, lng: -110.0, scale: 1.1 },
  { lat: 44.0, lng: -103.0, scale: 0.9 },
  { lat: 53.0, lng: -115.0, scale: 1.2 },
  { lat: 38.0, lng: -105.0, scale: 1.0 },
  { lat: 32.0, lng: -90.0, scale: 1.0 },
  { lat: 45.0, lng: -75.0, scale: 0.9 },
  { lat: 58.0, lng: -120.0, scale: 1.1 },
  { lat: 35.0, lng: -118.0, scale: 0.8 },
  // South America
  { lat: -5.0, lng: -60.0, scale: 1.3 },
  { lat: -15.0, lng: -55.0, scale: 1.1 },
  { lat: -35.0, lng: -65.0, scale: 1.0 },
  { lat: -25.0, lng: -50.0, scale: 0.9 },
  { lat: 5.0, lng: -70.0, scale: 0.8 },
  // Europe
  { lat: 48.0, lng: 10.0, scale: 1.0 },
  { lat: 42.0, lng: -3.0, scale: 0.9 },
  { lat: 55.0, lng: 15.0, scale: 1.1 },
  { lat: 45.0, lng: 25.0, scale: 1.0 },
  { lat: 60.0, lng: 10.0, scale: 1.1 },
  // Africa
  { lat: 5.0, lng: 25.0, scale: 1.2 },
  { lat: -5.0, lng: 30.0, scale: 1.1 },
  { lat: -20.0, lng: 28.0, scale: 1.0 },
  { lat: 28.0, lng: 30.0, scale: 0.8 },
  { lat: 10.0, lng: 10.0, scale: 0.9 },
  // Asia
  { lat: 55.0, lng: 80.0, scale: 1.2 },
  { lat: 42.0, lng: 105.0, scale: 1.0 },
  { lat: 30.0, lng: 110.0, scale: 1.1 },
  { lat: 20.0, lng: 80.0, scale: 1.0 },
  { lat: 60.0, lng: 110.0, scale: 1.2 },
  { lat: 35.0, lng: 135.0, scale: 0.9 },
  { lat: 45.0, lng: 125.0, scale: 1.0 },
  // Australia
  { lat: -25.0, lng: 135.0, scale: 1.0 },
  { lat: -32.0, lng: 145.0, scale: 1.1 },
  { lat: -18.0, lng: 140.0, scale: 0.9 }
];

// Decorative ocean clouds
const DECORATIVE_CLOUDS = [
  { lat: 25.0, lng: -155.0, size: 45 },
  { lat: -20.0, lng: -140.0, size: 55 },
  { lat: 10.0, lng: -35.0, size: 40 },
  { lat: -45.0, lng: -20.0, size: 50 },
  { lat: -10.0, lng: 75.0, size: 48 },
  { lat: 35.0, lng: 165.0, size: 52 },
  { lat: -35.0, lng: 110.0, size: 42 },
  { lat: 60.0, lng: -40.0, size: 38 }
];

// Decorative expedition sailboats
const DECORATIVE_BOATS = [
  { lat: 18.0, lng: -160.0, angle: -15, label: "Expedition Vessel" },
  { lat: -15.0, lng: -30.0, angle: 20, label: "Survey Sloop" },
  { lat: 5.0, lng: 85.0, angle: -10, label: "Paleo Boat" },
  { lat: 28.0, lng: 155.0, angle: 12, label: "Isle Research" }
];

interface MapCanvasProps {
  markers: SiteMarker[];
  selectedMarkerId?: string;
  onMarkerClick: (marker: SiteMarker) => void;
  activeTaxaName?: string;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ 
  markers, 
  selectedMarkerId, 
  onMarkerClick,
  activeTaxaName = "Tyrannosaurus Rex"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const isFirstLoadRef = useRef(true);
  const prevSelectedMarkerId = useRef<string | undefined>(undefined);
  const prevTaxaRef = useRef<string>(activeTaxaName);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(data => setWorldData(data))
      .catch(err => console.error("Map Data Fetch Error:", err));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    ro.observe(el);
    
    const rect = el.getBoundingClientRect();
    if (rect.width > 0) {
      setDimensions({ width: rect.width, height: rect.height });
    }

    return () => ro.disconnect();
  }, []);

  // Initialize Zoom behavior
  useEffect(() => {
    if (!svgRef.current || !gRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 24])
      .on('zoom', (event) => {
        setZoomTransform(event.transform);
        d3.select(gRef.current).attr('transform', event.transform.toString());
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;
  }, [dimensions, worldData]);

  const mapData = useMemo(() => {
    if (!worldData || dimensions.width === 0 || dimensions.height === 0) return null;

    const padding = 28;
    const projection = d3.geoNaturalEarth1()
      .fitExtent([[padding, padding], [dimensions.width - padding, dimensions.height - padding]], { type: "Sphere" } as any);

    const pathGenerator = d3.geoPath().projection(projection);
    const countries = topojson.feature(worldData, worldData.objects.countries) as any;
    const land = topojson.feature(worldData, worldData.objects.land || worldData.objects.countries) as any;
    const graticule = d3.geoGraticule()();

    return { countries, land, graticule, projection, pathGenerator };
  }, [worldData, dimensions]);

  // Handle default world view on initial load and smooth zoom when user selects a site
  useEffect(() => {
    if (!mapData || !svgRef.current || !zoomBehaviorRef.current || dimensions.width === 0) return;

    // Initial page load: default to full world view
    if (isFirstLoadRef.current) {
      const svg = d3.select(svgRef.current);
      svg.call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
      setZoomTransform(d3.zoomIdentity);
      isFirstLoadRef.current = false;
      prevSelectedMarkerId.current = selectedMarkerId;
      return;
    }

    // If active dinosaur taxon changes, reset back to full world view so user sees global distribution
    if (prevTaxaRef.current !== activeTaxaName) {
      prevTaxaRef.current = activeTaxaName;
      prevSelectedMarkerId.current = selectedMarkerId;
      const svg = d3.select(svgRef.current);
      svg.transition()
        .duration(800)
        .ease(d3.easeCubicInOut)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
      return;
    }

    // When selectedMarkerId changes due to user interaction (site click / next / prev)
    if (selectedMarkerId && selectedMarkerId !== prevSelectedMarkerId.current) {
      prevSelectedMarkerId.current = selectedMarkerId;
      const marker = markers.find(m => m.name === selectedMarkerId);
      if (!marker) return;

      const [x, y] = mapData.projection([marker.lng, marker.lat]) || [0, 0];
      const k = 3.6; // Focused continent level zoom
      
      const svg = d3.select(svgRef.current);
      const transform = d3.zoomIdentity
        .translate(dimensions.width / 2, dimensions.height / 2)
        .scale(k)
        .translate(-x, -y);

      svg.transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .call(zoomBehaviorRef.current.transform, transform);
    }
  }, [selectedMarkerId, activeTaxaName, mapData, markers, dimensions]);

  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy as any, 1.4);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy as any, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(500).call(zoomBehaviorRef.current.transform as any, d3.zoomIdentity);
  };

  const currentActiveMarker = useMemo(() => {
    return markers.find(m => m.name === selectedMarkerId) || markers[0];
  }, [markers, selectedMarkerId]);

  const currentIndex = useMemo(() => {
    return markers.findIndex(m => m.name === selectedMarkerId);
  }, [markers, selectedMarkerId]);

  // Trail route path connecting the markers in sequence
  const trailPathData = useMemo(() => {
    if (!mapData || markers.length < 2) return null;
    
    const points: [number, number][] = [];
    markers.forEach(m => {
      const pos = mapData.projection([m.lng, m.lat]);
      if (pos) points.push(pos);
    });

    if (points.length < 2) return null;
    
    // Create a smooth curved path between markers
    const lineGen = d3.line<[number, number]>()
      .curve(d3.curveCatmullRom.alpha(0.5))
      .x(d => d[0])
      .y(d => d[1]);

    return lineGen(points);
  }, [mapData, markers]);

  const activeScale = 1 / zoomTransform.k;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-park-water flex items-center justify-center select-none"
      style={{
        backgroundColor: '#4ea6a9',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #5fb7ba 0%, #4ea6a9 60%, #3e9497 100%)'
      }}
    >
      {/* Texture overlay for hand-drawn / natural paper finish */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.18'/%3E%3C/svg%3E")`
        }}
      />

      {!mapData ? (
        <div className="flex flex-col items-center gap-4 z-20">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <Footprints size={24} className="text-white/80 absolute animate-pulse" />
          </div>
          <div className="text-center">
            <span className="font-rounded font-bold text-sm text-white tracking-widest block drop-shadow-sm">
              Synchronizing Cartography...
            </span>
            <span className="font-hand text-lg text-white/80 tracking-wide block">
              Surveying Expedition Trails...
            </span>
          </div>
        </div>
      ) : (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="block cursor-grab active:cursor-grabbing z-0"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <defs>
            {/* Soft Green Checkerboard / Grass Patch Pattern for Natural Park Look */}
            <pattern id="park-grass-check" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#a4cb60" opacity="0.45" />
              <rect x="10" y="0" width="10" height="10" fill="#b8dc7c" opacity="0.45" />
              <rect x="0" y="10" width="10" height="10" fill="#b8dc7c" opacity="0.45" />
              <rect x="10" y="10" width="10" height="10" fill="#a4cb60" opacity="0.45" />
            </pattern>

            {/* Subtle Water Ripples Pattern */}
            <pattern id="water-wave-pattern" width="60" height="40" patternUnits="userSpaceOnUse">
              <path d="M 5,15 Q 15,10 25,15 T 45,15" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.22" strokeLinecap="round" />
              <path d="M 25,30 Q 35,25 45,30 T 65,30" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.18" strokeLinecap="round" />
            </pattern>

            {/* Drop Shadows for Pins and Callout Boxes */}
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1a3b3a" floodOpacity="0.2" />
            </filter>
            <filter id="bubble-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#193836" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Water Wave Texture */}
          <rect width="100%" height="100%" fill="url(#water-wave-pattern)" />

          <g ref={gRef}>
            {/* Subtle Graticule Lines (Like gentle navigation latitude/longitude lines) */}
            <path
              d={mapData.pathGenerator(mapData.graticule) || ''}
              fill="none"
              stroke="#ffffff"
              strokeWidth={0.6 / zoomTransform.k}
              strokeDasharray={`${6 / zoomTransform.k},${6 / zoomTransform.k}`}
              opacity="0.2"
            />

            {/* 1. Coastal Sand Halo / Beach Fringe Layer (Bottom Land Layer) */}
            {mapData.countries.features.map((feature: any, i: number) => (
              <path
                key={`halo-${i}`}
                d={mapData.pathGenerator(feature) || ''}
                fill="#f5f2e3"
                stroke="#f5f2e3"
                strokeWidth={5 / zoomTransform.k}
                strokeLinejoin="round"
                opacity="0.95"
              />
            ))}

            {/* 2. Main Landmass Layer - Chartreuse Meadow Green */}
            {mapData.countries.features.map((feature: any, i: number) => (
              <path
                key={`land-${i}`}
                d={mapData.pathGenerator(feature) || ''}
                fill="#b5d774"
                stroke="#94bd52"
                strokeWidth={0.8 / zoomTransform.k}
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
            ))}

            {/* 3. Decorative Checkerboard Grass Patches across Continents */}
            {mapData.countries.features.map((feature: any, i: number) => (
              <path
                key={`check-${i}`}
                d={mapData.pathGenerator(feature) || ''}
                fill="url(#park-grass-check)"
                opacity="0.35"
                pointerEvents="none"
              />
            ))}

            {/* 4. Decorative Nature Clouds over Oceans */}
            {DECORATIVE_CLOUDS.map((cloud, i) => {
              const pos = mapData.projection([cloud.lng, cloud.lat]);
              if (!pos) return null;
              const scale = (cloud.size / 50) * (0.8 / Math.pow(zoomTransform.k, 0.4));
              return (
                <g 
                  key={`cloud-${i}`} 
                  transform={`translate(${pos[0]}, ${pos[1]}) scale(${scale})`}
                  opacity="0.88"
                  className="pointer-events-none"
                >
                  {/* Fluffy white hand-drawn cloud */}
                  <g filter="url(#soft-shadow)">
                    <path
                      d="M -30,0 A 15,15 0 0,1 -10,-14 A 20,20 0 0,1 18,-12 A 16,16 0 0,1 32,2 A 14,14 0 0,1 20,16 L -20,16 A 14,14 0 0,1 -30,0 Z"
                      fill="#ffffff"
                    />
                    <path
                      d="M -22,4 A 8,8 0 0,0 -8,10 L 14,10"
                      fill="none"
                      stroke="#e4eff0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              );
            })}

            {/* 5. Decorative Expedition Sailboats in the Ocean */}
            {DECORATIVE_BOATS.map((boat, i) => {
              const pos = mapData.projection([boat.lng, boat.lat]);
              if (!pos) return null;
              const boatScale = 0.045 / Math.pow(zoomTransform.k, 0.4);
              return (
                <g 
                  key={`boat-${i}`} 
                  transform={`translate(${pos[0]}, ${pos[1]}) rotate(${boat.angle}) scale(${boatScale})`}
                  className="pointer-events-none"
                  filter="url(#soft-shadow)"
                >
                  {/* Yellow Wooden Hull */}
                  <path d="M -200,60 L 200,60 C 170,140 -150,140 -200,60 Z" fill="#f8ba35" stroke="#e09d1b" strokeWidth="8" />
                  <path d="M -160,80 L 160,80" stroke="#ffffff" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
                  
                  {/* Wooden Mast */}
                  <line x1="0" y1="60" x2="0" y2="-170" stroke="#6e4f35" strokeWidth="12" strokeLinecap="round" />
                  
                  {/* Crisp White Main Sails */}
                  <path d="M 12,-150 L 160,30 L 12,30 Z" fill="#ffffff" stroke="#e5edf0" strokeWidth="6" />
                  <path d="M -12,-140 L -140,30 L -12,30 Z" fill="#ffffff" stroke="#e5edf0" strokeWidth="6" />
                  <path d="M 12,-70 L 120,30" stroke="#d5e3e6" strokeWidth="4" />
                  
                  {/* Red Pennant Flag */}
                  <polygon points="0,-170 45,-155 0,-140" fill="#f43f5e" />
                  
                  {/* Water Ripples underneath */}
                  <path d="M -220,130 Q -100,150 0,135 T 220,135" fill="none" stroke="#ffffff" strokeWidth="8" opacity="0.7" strokeLinecap="round" />
                </g>
              );
            })}

            {/* 6. Illustrated Nature Lollipop Trees on Continents */}
            {DECORATIVE_TREES.map((tree, i) => {
              const pos = mapData.projection([tree.lng, tree.lat]);
              if (!pos) return null;
              const treeScale = (tree.scale || 1.0) * (0.85 / zoomTransform.k);
              return (
                <g 
                  key={`tree-${i}`} 
                  transform={`translate(${pos[0]}, ${pos[1]}) scale(${treeScale})`}
                  className="pointer-events-none"
                >
                  {/* Tiny Brown Trunk */}
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#735238" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Dark Teal / Forest Green Lollipop Crown */}
                  <circle cx="0" cy="-4" r="7.5" fill="#2b585c" stroke="#1f4246" strokeWidth="0.8" />
                  {/* Gentle Highlight */}
                  <circle cx="-2.5" cy="-6.5" r="2.2" fill="#447d83" opacity="0.75" />
                </g>
              );
            })}

            {/* 7. Illustrated Expedition Trails between Confirmed Fossil Sites */}
            {trailPathData && (
              <g className="pointer-events-none">
                {/* Outer Yellow Ribbon Path */}
                <path
                  d={trailPathData}
                  fill="none"
                  stroke="#f5a623"
                  strokeWidth={5 / zoomTransform.k}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
                {/* Inner Dashed Orange Trail Line */}
                <path
                  d={trailPathData}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth={2 / zoomTransform.k}
                  strokeDasharray={`${5 / zoomTransform.k},${4 / zoomTransform.k}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
                {/* Crisp White Walking Track Dots */}
                <path
                  d={trailPathData}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={0.8 / zoomTransform.k}
                  strokeDasharray={`${2 / zoomTransform.k},${7 / zoomTransform.k}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {/* 8. Dinosaur Fossil Site Markers (sorted so active selected marker renders on top) */}
            {[...markers]
              .sort((a, b) => {
                const aSelected = a.name === selectedMarkerId ? 1 : 0;
                const bSelected = b.name === selectedMarkerId ? 1 : 0;
                return aSelected - bSelected;
              })
              .map((site) => {
                const index = markers.findIndex(m => m.id === site.id);
                const pos = mapData.projection([site.lng, site.lat]);
                if (!pos) return null;
                const isSelected = site.name === selectedMarkerId;
                const isHovered = hoveredSiteId === site.id;
                
                const pinScale = (isSelected ? 1.15 : 0.45) * (1 / zoomTransform.k);
                const courseColors = ['#10b981', '#f5a623', '#0284c7', '#f43f5e', '#8b5cf6', '#06b6d4'];
                const pinColor = courseColors[(index >= 0 ? index : 0) % courseColors.length];

              return (
                <g 
                  key={site.id} 
                  transform={`translate(${pos[0]}, ${pos[1]})`} 
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkerClick(site);
                  }}
                  onMouseEnter={() => setHoveredSiteId(site.id)}
                  onMouseLeave={() => setHoveredSiteId(null)}
                >
                  {/* Selected Site Animated Radar Rings in Warm Gold & Sage Green */}
                  {isSelected && (
                    <>
                      <circle 
                        r={28 * activeScale} 
                        fill="none" 
                        stroke="#f5a623" 
                        strokeWidth={1.8 * activeScale} 
                        className="animate-ping" 
                        opacity="0.4" 
                      />
                      <circle 
                        r={18 * activeScale} 
                        fill="#fef08a" 
                        fillOpacity="0.25"
                        stroke="#87bd52" 
                        strokeWidth={1.2 * activeScale} 
                        strokeDasharray={`${3 * activeScale},${3 * activeScale}`}
                      />
                    </>
                  )}

                  {/* Marker Pin Icon */}
                  <g transform={`scale(${pinScale})`} filter="url(#bubble-shadow)">
                    {/* Outer Border */}
                    <circle cx="0" cy="0" r={isSelected ? 16 : 14} fill="#ffffff" stroke={pinColor} strokeWidth={isSelected ? 3 : 2.5} />
                    
                    {/* Inner Color Fill */}
                    <circle cx="0" cy="0" r={isSelected ? 13 : 9} fill={pinColor} />

                    {/* Cute Dinosaur Footprint Icon for Selected Site */}
                    {isSelected && (
                      <g transform="scale(0.038) translate(-256, -256)">
                        <path
                          d={DINO_FOOTPRINT_PATH}
                          fill="#ffffff"
                        />
                      </g>
                    )}
                  </g>

                  {/* Hover Tooltip for Non-Selected Sites */}
                  {isHovered && !isSelected && (
                    <g 
                      transform={`translate(0, ${-28 * activeScale}) scale(${activeScale})`} 
                      filter="url(#soft-shadow)"
                      className="pointer-events-none"
                    >
                      <rect
                        x="-60"
                        y="-22"
                        width="120"
                        height="22"
                        rx="6"
                        fill="#faf8f2"
                        stroke="#87bd52"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="-7"
                        textAnchor="middle"
                        fill="#1f3835"
                        fontSize="9.5"
                        fontFamily="'Nunito', sans-serif"
                        fontWeight="bold"
                      >
                        {site.name.length > 18 ? site.name.slice(0, 17) + '…' : site.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* Bottom-Right: Illustrated Course Timetable / Expedition Trail Legend (Bottom-aligned with Zoom controls) */}
      {markers.length > 0 && (
        <div className="absolute bottom-5 right-5 z-30 pointer-events-auto bg-park-card/95 backdrop-blur-sm border-2 border-white/80 rounded-2xl px-5 py-3.5 shadow-lg max-w-[280px] hidden md:block">
          <div className="flex items-center justify-between pb-1.5 mb-1.5">
            <span className="text-sm font-hand font-bold text-park-ink flex items-center tracking-wide">
              Expedition Trails
            </span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto px-[12px] no-scrollbar">
            {markers.map((marker, idx) => {
              const isCur = marker.name === selectedMarkerId;
              const courseColors = ['bg-emerald-500', 'bg-amber-500', 'bg-sky-500', 'bg-rose-500', 'bg-purple-500', 'bg-teal-500'];
              const colorClass = courseColors[idx % courseColors.length];
              const estMins = (idx + 1) * 8 + 3;

              return (
                <button
                  key={marker.id}
                  onClick={() => onMarkerClick(marker)}
                  className={`flex items-center justify-between px-2 py-1 rounded-lg text-left transition-all text-[11px] ${
                    isCur 
                      ? 'bg-park-land/30 text-park-ink font-bold border border-park-border-green/50 shadow-xs scale-[1.02]' 
                      : 'text-park-ink/75 hover:bg-black/5 hover:text-park-ink'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span className={`w-4 h-4 rounded-full ${colorClass} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}>
                      {idx + 1}
                    </span>
                    <span className="truncate font-rounded font-medium">
                      {marker.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-hand font-bold text-park-ink-muted shrink-0 bg-white/60 px-1.5 py-0.5 rounded border border-black/5">
                    {estMins} min
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom-Left: Nature Guide Style Zoom & Recenter Controls */}
      <div className="absolute bottom-5 left-5 flex items-end gap-2 z-30">
        <div className="flex flex-col gap-1.5 bg-park-card/95 backdrop-blur-sm p-1.5 rounded-2xl border-2 border-white/80 shadow-md">
          <button 
            onClick={handleZoomIn}
            className="w-9 h-9 bg-white rounded-xl border border-park-card-border flex items-center justify-center text-park-tree hover:bg-park-land/20 active:scale-95 transition-all shadow-xs"
            title="Zoom In"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-9 h-9 bg-white rounded-xl border border-park-card-border flex items-center justify-center text-park-tree hover:bg-park-land/20 active:scale-95 transition-all shadow-xs"
            title="Zoom Out"
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <button 
            onClick={handleResetZoom}
            className="w-9 h-9 bg-white rounded-xl border border-park-card-border flex items-center justify-center text-park-tree hover:bg-park-land/20 active:scale-95 transition-all shadow-xs"
            title="Reset to Full World View"
          >
            <Compass size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* Current Coordinates Tag */}
        {currentActiveMarker && (
          <div className="bg-park-card/90 backdrop-blur-sm border border-white/80 px-3 py-2 rounded-2xl shadow-md hidden sm:flex flex-col">
            <span className="text-[9px] font-rounded font-extrabold text-park-ink-muted uppercase">
              Location / Viewport
            </span>
            <span className="text-[11px] font-mono text-park-ink font-semibold">
              {currentActiveMarker.lat.toFixed(4)}°N, {currentActiveMarker.lng.toFixed(4)}°E
            </span>
          </div>
        )}
      </div>

      {/* Compass Rose / North Indicator in Top Right Ocean (Matching the elegant fine-line arrow in reference map) */}
      <div className="absolute top-6 right-6 pointer-events-none opacity-85 hidden sm:flex flex-col items-center z-20">
        <div className="text-white font-hand text-3xl font-extrabold tracking-widest leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          N
        </div>
        <div className="w-[1.5px] h-12 bg-white drop-shadow-md relative mt-1">
          {/* North Arrowhead */}
          <div className="absolute -top-1 -left-[3px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-white"></div>
          {/* Horizontal Crossbar */}
          <div className="absolute top-4 -left-3 w-6 h-[1.5px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default MapCanvas;