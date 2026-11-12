import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Layers, 
  Bone, 
  Activity, 
  Dna, 
  Component, 
  PawPrint, 
  Trees, 
  MapPin, 
  Compass, 
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';

// Dino footprint SVG path
const DINO_FOOTPRINT_PATH = "M511.517,370.284c-5.971-20.294-92.954-22.906-113.159-18.866c-20.216,4.041-76.79,2.68-88.913-9.443c-12.124-12.124,4.041-32.329,16.175-44.451c12.124-12.124,38.389-50.524,46.472-58.606c8.082-8.082,50.166-50.378,65.325-74.758c30.988-49.843,41.437-98.68,25.262-114.845c-16.164-16.164-65.003-5.727-114.834,25.262c-24.38,15.17-66.688,57.244-74.769,65.325c-8.083,8.083-46.472,34.36-58.606,46.483c-12.122,12.124-32.328,28.287-44.451,16.164c-12.122-12.124-13.474-68.698-9.433-88.902c4.041-20.205,1.419-107.187-18.866-113.16C121.438-5.483,83.798,44.94,68.984,87.37c-8.685,24.871-82.852,141.446-66.688,226.319c16.175,84.872,31,127.982,49.507,146.503c18.519,18.519,61.642,33.343,146.503,49.507c84.872,16.164,201.448-57.991,226.319-66.676C467.056,428.198,517.478,390.557,511.517,370.284z";

type LegendCategory = 'all' | 'sites' | 'ages' | 'status';

interface MapLegendProps {
  className?: string;
  activeTaxaName?: string;
  activeSiteCount?: number;
}

export const MapLegend: React.FC<MapLegendProps> = ({ 
  className = "",
  activeTaxaName,
  activeSiteCount = 0
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<LegendCategory>('all');

  return (
    <div 
      className={`z-30 pointer-events-auto select-none transition-all duration-200 ${className}`}
      aria-label="Map Legend"
    >
      {/* Compact Collapsed Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2 bg-park-card/95 hover:bg-white backdrop-blur-md border-2 border-white/90 rounded-2xl shadow-md text-park-ink hover:text-park-tree transition-all"
          title="Open Map Legend (Field Guide Symbols)"
        >
          <div className="w-7 h-7 rounded-xl bg-park-tree text-white flex items-center justify-center shadow-xs">
            <BookOpen size={14} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="font-extrabold text-[11px] font-rounded text-park-ink">
              Map Legend
            </span>
            <span className="text-[9px] font-medium font-rounded text-park-ink-muted">
              Sites • Ages • Status
            </span>
          </div>
          <ChevronDown size={14} className="text-park-ink-muted group-hover:translate-y-0.5 transition-transform ml-0.5" />
        </button>
      ) : (
        /* Expanded Persistent Legend Panel */
        <div className="bg-park-card/95 backdrop-blur-md border-2 border-white/90 rounded-2xl shadow-xl w-[290px] sm:w-[310px] overflow-hidden flex flex-col transition-all">
          
          {/* Header Bar */}
          <div className="px-3.5 py-2.5 bg-[#f6f3e6]/80 border-b border-park-card-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-park-tree text-white flex items-center justify-center shadow-2xs">
                <BookOpen size={13} strokeWidth={2.2} />
              </div>
              <div>
                <span className="font-hand text-[15px] font-bold text-park-tree leading-none block">
                  Field Survey Legend
                </span>
                <span className="text-[9px] font-rounded font-semibold text-park-ink-muted leading-none">
                  Cartography & Stratum Key
                </span>
              </div>
            </div>

            {/* Minimize / Collapse Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-lg bg-white/80 hover:bg-white border border-park-card-border flex items-center justify-center text-park-ink-muted hover:text-park-ink transition-colors shadow-2xs"
              title="Minimize Legend"
            >
              <ChevronUp size={14} />
            </button>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="px-2.5 py-1.5 bg-white/60 border-b border-park-card-border/60 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'All Keys' },
                { id: 'sites', label: 'Fossil Sites' },
                { id: 'ages', label: 'Geological Ages' },
                { id: 'status', label: 'Site Status' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 py-1 rounded-lg text-[9.5px] font-rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-park-tree text-white shadow-2xs scale-[1.02]'
                    : 'text-park-ink-muted hover:bg-black/5 hover:text-park-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Legend Content */}
          <div className="p-3 space-y-3.5 max-h-[320px] overflow-y-auto no-scrollbar text-left">
            
            {/* SECTION 1: FOSSIL SITES & MAP SYMBOLS */}
            {(activeTab === 'all' || activeTab === 'sites') && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pb-0.5 border-b border-dotted border-park-card-border">
                  <MapPin size={11} className="text-park-accent-orange" />
                  <span className="text-[10px] font-rounded font-extrabold uppercase tracking-wider text-park-tree">
                    Fossil Sites & Formations
                  </span>
                </div>

                <div className="space-y-2 text-[10.5px] font-rounded">
                  {/* Selected Active Site */}
                  <div className="flex items-start gap-2.5 bg-white/80 p-2 rounded-xl border border-park-card-border/70 hover:border-park-border-green transition-colors">
                    <div className="relative w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="absolute inset-0 rounded-full border border-park-accent-yellow bg-park-accent-yellow/20 animate-pulse"></div>
                      <div className="w-5 h-5 rounded-full bg-park-accent-green border-2 border-white flex items-center justify-center shadow-xs">
                        <svg viewBox="0 0 512 512" className="w-2.5 h-2.5 fill-white">
                          <path d={DINO_FOOTPRINT_PATH} />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="font-extrabold text-park-ink flex items-center gap-1.5">
                        <span>Active Survey Site</span>
                        <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1 rounded border border-amber-200">Selected</span>
                      </div>
                      <p className="text-[9.5px] text-park-ink-muted leading-tight mt-0.5">
                        Focused locality currently recorded in the Field Journal with full osteology.
                      </p>
                    </div>
                  </div>

                  {/* Standard Expedition Sites */}
                  <div className="flex items-start gap-2.5 bg-white/80 p-2 rounded-xl border border-park-card-border/70 hover:border-park-border-green transition-colors">
                    <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-park-accent-yellow border-2 border-white shadow-xs"></div>
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block">
                        Expedition Locality (1–6)
                      </span>
                      <p className="text-[9.5px] text-park-ink-muted leading-tight mt-0.5">
                        Numbered field stations along the surveyed route. Color matches itinerary sequence.
                      </p>
                    </div>
                  </div>

                  {/* Proximity Cluster Formation */}
                  <div className="flex items-start gap-2.5 bg-white/80 p-2 rounded-xl border border-park-card-border/70 hover:border-park-border-green transition-colors">
                    <div className="relative w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-park-tree border-2 border-white text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs">
                        3
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-park-accent-yellow border border-white"></div>
                    </div>
                    <div>
                      <div className="font-bold text-park-ink flex items-center gap-1">
                        <span>Fossil Site Cluster</span>
                        <span className="text-[8px] bg-park-tree/10 text-park-tree font-bold px-1 rounded">Interactive</span>
                      </div>
                      <p className="text-[9.5px] text-park-ink-muted leading-tight mt-0.5">
                        Multiple fossil beds in close proximity. Click cluster to zoom and expand individual sites.
                      </p>
                    </div>
                  </div>

                  {/* Expedition Trail Path */}
                  <div className="flex items-start gap-2.5 bg-white/80 p-2 rounded-xl border border-park-card-border/70 hover:border-park-border-green transition-colors">
                    <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-6 h-1.5 bg-park-accent-yellow rounded-full relative overflow-hidden border border-park-accent-orange/40">
                        <div className="w-full h-full border-t border-dashed border-white"></div>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block">
                        Expedition Trail Route
                      </span>
                      <p className="text-[9.5px] text-park-ink-muted leading-tight mt-0.5">
                        Dashed yellow ribbon tracing the overland geological route between dig sites.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: GEOLOGICAL AGES & STRATA */}
            {(activeTab === 'all' || activeTab === 'ages') && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pb-0.5 border-b border-dotted border-park-card-border">
                  <Clock size={11} className="text-park-accent-blue" />
                  <span className="text-[10px] font-rounded font-extrabold uppercase tracking-wider text-park-tree">
                    Geological Periods & Epochs
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-[10px] font-rounded">
                  {/* Late Cretaceous */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs shrink-0"></span>
                      <div>
                        <span className="font-bold text-park-ink block leading-none">Late Cretaceous</span>
                        <span className="text-[8.5px] text-park-ink-muted">Hell Creek, Scollard, Lance</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                      66–100 Ma
                    </span>
                  </div>

                  {/* Early Cretaceous */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-2xs shrink-0"></span>
                      <div>
                        <span className="font-bold text-park-ink block leading-none">Early Cretaceous</span>
                        <span className="text-[8.5px] text-park-ink-muted">Kem Kem, Chenini, Cloverly</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 shrink-0">
                      100–145 Ma
                    </span>
                  </div>

                  {/* Late Jurassic */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-2xs shrink-0"></span>
                      <div>
                        <span className="font-bold text-park-ink block leading-none">Late Jurassic</span>
                        <span className="text-[8.5px] text-park-ink-muted">Morrison, Tendaguru, Como Bluff</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                      145–163 Ma
                    </span>
                  </div>

                  {/* Early / Mid Jurassic */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-2xs shrink-0"></span>
                      <div>
                        <span className="font-bold text-park-ink block leading-none">Early Jurassic</span>
                        <span className="text-[8.5px] text-park-ink-muted">Kayenta, Moenave, Lufeng</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                      163–201 Ma
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: SITE STATUS & RECOVERED SPECIMENS */}
            {(activeTab === 'all' || activeTab === 'status') && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pb-0.5 border-b border-dotted border-park-card-border">
                  <Activity size={11} className="text-park-accent-green" />
                  <span className="text-[10px] font-rounded font-extrabold uppercase tracking-wider text-park-tree">
                    Site Status & Inventory Metrics
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-rounded">
                  {/* Cranium / Dentition */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Dna size={11} />
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block leading-none">Cranium</span>
                      <span className="text-[8.5px] text-park-ink-muted">Skulls & teeth</span>
                    </div>
                  </div>

                  {/* Articulated Skeleton */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Component size={11} />
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block leading-none">Skeleton</span>
                      <span className="text-[8.5px] text-park-ink-muted">Postcranial bones</span>
                    </div>
                  </div>

                  {/* Trackway / Footprint */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <PawPrint size={11} />
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block leading-none">Footprint</span>
                      <span className="text-[8.5px] text-park-ink-muted">Preserved trackways</span>
                    </div>
                  </div>

                  {/* Environment / Matrix */}
                  <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Trees size={11} />
                    </div>
                    <div>
                      <span className="font-bold text-park-ink block leading-none">Environment</span>
                      <span className="text-[8.5px] text-park-ink-muted">Flora & egg clutches</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Badges */}
                <div className="bg-white/80 p-2 rounded-xl border border-park-card-border/70 space-y-1 text-[9.5px]">
                  <div className="flex justify-between items-center text-park-ink">
                    <span className="font-semibold text-park-ink-muted flex items-center gap-1">
                      <Bone size={10} className="text-park-tree" /> Osteology Rate:
                    </span>
                    <span className="font-mono font-bold text-park-tree">0–100% Complete</span>
                  </div>
                  <div className="flex justify-between items-center text-park-ink">
                    <span className="font-semibold text-park-ink-muted flex items-center gap-1">
                      <Layers size={10} className="text-park-tree" /> Stratum Matrix:
                    </span>
                    <span className="font-bold text-park-ink">Sandstone / Shale</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-3 py-1.5 bg-[#f6f3e6]/60 border-t border-park-card-border/80 flex items-center justify-between text-[9px] font-rounded text-park-ink-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-park-accent-green" />
              <span>International Chronostratigraphic Standard</span>
            </span>
            <span className="font-mono text-[8.5px] font-bold text-park-tree">v2026</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLegend;
