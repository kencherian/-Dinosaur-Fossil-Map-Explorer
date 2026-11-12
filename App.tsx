import React, { useState, useEffect, useRef } from 'react';
import { fetchPaleoData, fetchSitesForQuery, generateTaxaBlueprint } from './services/geminiService';
import { PaleoData, SiteMarker } from './types';
import { DINOSAUR_DB } from './data/dinosaurData';
import MapCanvas from './components/MapCanvas';
import { TechIcon, DinoIcon } from './components/Icons';
import { DinosaurBlueprint } from './components/DinosaurBlueprint';
import ClimateRadarChart from './components/ClimateRadarChart';
import { 
  Loader2, 
  Map as MapIcon, 
  Globe, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  RotateCcw, 
  Activity, 
  Bone, 
  Trees, 
  Users, 
  User, 
  Bird, 
  Zap, 
  Component,
  Sparkles,
  Compass,
  Footprints,
  Layers,
  Clock,
  ShieldAlert,
  Leaf,
  MapPin
} from 'lucide-react';

const TAXA = DINOSAUR_DB.map(d => d.name);

type TabType = 'overview' | 'inventory' | 'metrics';

const App: React.FC = () => {
  const [markers, setMarkers] = useState<SiteMarker[]>([]);
  const [selectedSite, setSelectedSite] = useState<PaleoData | null>(null);
  const [blueprintImage, setBlueprintImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentBlueprintTaxa = useRef<string | null>(null);

  const updateBlueprint = async (taxa: string, force = false) => {
    if (currentBlueprintTaxa.current === taxa && imgLoading && !force) return;
    
    currentBlueprintTaxa.current = taxa;
    setImgLoading(true);
    setImgError(false);
    
    try {
      const img = await generateTaxaBlueprint(taxa, force);
      if (currentBlueprintTaxa.current === taxa) {
        setBlueprintImage(img);
      }
    } catch {
      if (currentBlueprintTaxa.current === taxa) {
        setBlueprintImage(null);
      }
    } finally {
      if (currentBlueprintTaxa.current === taxa) {
        setImgLoading(false);
      }
    }
  };

  const handleQuerySelect = async (query: string) => {
    if (query === activeQuery) return;
    setLoading(true);
    setActiveQuery(query);
    setSelectedSite(null);
    setMarkers([]);
    setBlueprintImage(null);
    setImgError(false);
    currentBlueprintTaxa.current = null;
    setCurrentIndex(0);
    
    // Always update blueprint for the taxon
    updateBlueprint(query);

    try {
      const results = await fetchSitesForQuery(query);
      setMarkers(results);
      if (results.length > 0) {
        handleSiteSelect(results[0], true, query);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSelect = async (marker: SiteMarker, skipBlueprintFetch: boolean = false, speciesName?: string) => {
    setLoading(true);
    const taxaToSearch = speciesName || activeQuery;
    try {
      const details = await fetchPaleoData(marker.name, taxaToSearch);
      setSelectedSite(details);
      
      if (!skipBlueprintFetch && !blueprintImage && !imgLoading) {
        updateBlueprint(taxaToSearch);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goToNextSite = () => {
    if (markers.length === 0) return;
    const nextIdx = (currentIndex + 1) % markers.length;
    setCurrentIndex(nextIdx);
    handleSiteSelect(markers[nextIdx], true);
  };

  const goToPrevSite = () => {
    if (markers.length === 0) return;
    const prevIdx = (currentIndex - 1 + markers.length) % markers.length;
    setCurrentIndex(prevIdx);
    handleSiteSelect(markers[prevIdx], true);
  };

  useEffect(() => {
    // No initial query on load
  }, []);

  const sectionLabelStyle = "text-[12px] font-extrabold text-park-ink tracking-wider mb-2 flex items-center gap-1.5 font-rounded uppercase";

  return (
    <div className="flex flex-col h-screen w-screen bg-park-card text-park-ink font-sans overflow-hidden relative selection:bg-park-land/40">
      
      {/* Top Navigation Bar: Nature Park Guide Styling */}
      <header className="flex-none border-b border-park-card-border bg-[#faf8f2] z-20 flex items-center shadow-xs">
        <div className="px-6 py-3 flex flex-row items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth flex-1">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pr-4 border-r border-park-card-border flex-none">
            <div className="w-9 h-9 rounded-2xl bg-park-land/30 border border-park-border-green/40 flex items-center justify-center text-park-tree shadow-xs">
              <DinoIcon className="w-5 h-5 fill-park-tree" />
            </div>
            <div>
              <div className="text-[28px] font-hand font-bold text-park-ink leading-none">
                Dino-Draft
              </div>
              <span className="text-[9px] font-rounded font-semibold text-park-ink-muted block mt-0.5">
                Paleo Field Guide & Area Map
              </span>
            </div>
          </div>

          {/* Taxa Selection Course Pills */}
          <div className="flex items-center gap-2 flex-none">
            {TAXA.map((t, idx) => {
              const isActive = activeQuery === t;
              const pillColors = [
                'hover:border-emerald-500 hover:text-emerald-800',
                'hover:border-amber-500 hover:text-amber-800',
                'hover:border-sky-500 hover:text-sky-800',
                'hover:border-rose-500 hover:text-rose-800',
                'hover:border-purple-500 hover:text-purple-800',
                'hover:border-teal-500 hover:text-teal-800'
              ];
              const activeBg = 'bg-park-tree text-white border-park-tree shadow-xs font-bold scale-[1.03]';
              const inactiveBg = 'bg-white/80 border-park-card-border text-park-ink-muted hover:bg-white ' + pillColors[idx % pillColors.length];

              return (
                <button 
                  key={t} 
                  onClick={() => handleQuerySelect(t)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-rounded tracking-wide border transition-all duration-200 ${
                    isActive ? activeBg : inactiveBg
                  }`}
                >
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        
        {/* Left Column: Full Canvas Interactive Map */}
        <main className="flex-1 h-full relative group/map overflow-hidden">
           <MapCanvas 
             markers={markers} 
             selectedMarkerId={markers[currentIndex]?.name} 
             onMarkerClick={(site) => {
               const idx = markers.findIndex(m => m.id === site.id);
               if (idx !== -1) setCurrentIndex(idx);
               handleSiteSelect(site, true);
             }} 
             activeTaxaName={activeQuery}
           />
           
           {/* Previous Site Nav Button */}
           {activeQuery && markers.length > 0 && (
             <>
               <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none z-40">
                  <button 
                    onClick={(e) => { e.stopPropagation(); goToPrevSite(); }}
                    disabled={markers.length <= 1}
                    className="w-11 h-11 bg-white/95 border-2 border-white/80 rounded-full flex items-center justify-center text-park-tree pointer-events-auto hover:bg-park-land/30 hover:scale-110 active:scale-95 transition-all shadow-md disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed group"
                    title="Previous Fossil Site"
                  >
                    <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
               </div>

               {/* Next Site Nav Button */}
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none z-40">
                  <button 
                    onClick={(e) => { e.stopPropagation(); goToNextSite(); }}
                    disabled={markers.length <= 1}
                    className="w-11 h-11 bg-white/95 border-2 border-white/80 rounded-full flex items-center justify-center text-park-tree pointer-events-auto hover:bg-park-land/30 hover:scale-110 active:scale-95 transition-all shadow-md disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed group"
                    title="Next Fossil Site"
                  >
                    <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
               </div>
               
               {/* Bottom Center Site Indicator Pill */}
               <div className="absolute bottom-5 left-1/2 -translate-x-1/2 scale-[1.3] origin-bottom flex items-center gap-2 bg-white/95 border-2 border-white/80 px-4 py-2 rounded-full shadow-md z-30 pointer-events-auto">
                  <div className="w-2 h-2 rounded-full bg-park-accent-green animate-pulse"></div>
                  <span className="text-[11px] font-rounded font-extrabold text-park-ink tracking-wide">
                    Fossil Site {markers.length > 0 ? currentIndex + 1 : 0} of {markers.length}
                  </span>
                  <span className="text-[10px] font-hand font-bold text-park-ink-muted">
                    • {markers[currentIndex]?.name || 'Loading'}
                  </span>
               </div>
             </>
           )}
        </main>

        {/* Right Sidebar: Nature Field Journal / Expedition Guidebook */}
        <aside className="w-[460px] lg:w-[480px] xl:w-[510px] bg-[#faf8f3] flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.03)] z-10 overflow-hidden relative border-l border-park-card-border shrink-0">
          {selectedSite ? (
            <div className="flex flex-col h-full relative overflow-y-auto no-scrollbar p-5 space-y-4">
              
              {/* Journal Top Header */}
              <div className="flex justify-center items-center pb-1">
                <span className="font-hand text-lg font-bold text-park-tree tracking-wide">
                  Paleo Field Journal • Field Survey Record
                </span>
              </div>

              {/* Species Name Hero Card */}
              <div className="border-2 border-park-border-green/40 p-4 relative bg-white/90 rounded-2xl shadow-xs">
                <div className="text-[9px] font-rounded font-bold text-park-ink-muted uppercase tracking-wider mb-1">
                  SPECIES TAXON / CLASSIFICATION
                </div>
                <div className="text-3xl font-hand font-bold text-park-tree pt-1 pb-2">
                  {activeQuery}
                </div>
                <div className="text-[10px] font-rounded text-park-ink-muted font-medium flex items-center gap-1.5">
                  <MapPin size={12} className="text-park-accent-orange" />
                  <span>{selectedSite.name}</span>
                </div>
              </div>

              {/* Scientific Specimen Blueprint & Field Sketch */}
              <DinosaurBlueprint
                taxaName={activeQuery}
                blueprintImage={blueprintImage}
                imgLoading={imgLoading}
                imgError={imgError}
                onRetry={() => {
                  currentBlueprintTaxa.current = null;
                  updateBlueprint(activeQuery, true);
                }}
                metadata={selectedSite.metadata}
                stats={selectedSite.stats}
              />

              {/* Expedition Info Boards (Density Distribution, Bio Signatures, Ecology & Metrics) */}
              <div className="space-y-3">
                {/* Board 1: Taxa Density & Distribution */}
                <div className="bg-white/95 rounded-2xl border border-park-card-border p-4 flex flex-col justify-between relative shadow-xs group hover:border-park-border-green/60 transition-colors">
                  <div className="mb-2">
                    <span className={sectionLabelStyle}>
                      TAXA DENSITY • DISTRIBUTION
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-hand font-bold text-park-tree">{markers.length}</span>
                      <span className="text-xs font-rounded font-bold text-park-ink-muted">Confirmed Fossil Sites</span>
                    </div>
                  </div>
                </div>

                {/* Board 2: Bio Signatures & Geological Context */}
                <div className="bg-white/95 rounded-2xl border border-park-card-border p-4 flex flex-col justify-between relative shadow-xs group hover:border-park-border-green/60 transition-colors">
                  <div className="mb-2">
                    <span className={sectionLabelStyle}>
                      BIO SIGNATURES • GEOLOGICAL AGE
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto text-xs">
                    <div className="flex justify-between items-center font-rounded border-b border-dotted border-park-card-border pb-1">
                      <span className="text-park-ink-muted font-medium">Epoch / Era:</span>
                      <span className="font-bold text-park-ink bg-park-sand/70 px-2 py-0.5 rounded-md border border-park-card-border text-[11px]">
                        {selectedSite?.geologicalContext.era || 'MESOZOIC'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-rounded border-b border-dotted border-park-card-border pb-1">
                      <span className="text-park-ink-muted font-medium">Period:</span>
                      <span className="font-bold text-park-ink bg-park-sand/70 px-2 py-0.5 rounded-md border border-park-card-border text-[11px]">
                        {selectedSite?.geologicalContext.period || 'LATE CRETACEOUS'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-rounded border-b border-dotted border-park-card-border pb-1">
                      <span className="text-park-ink-muted font-medium">Environment / Climate:</span>
                      <span className="font-bold text-park-ink bg-park-sand/70 px-2 py-0.5 rounded-md border border-park-card-border text-[11px]">
                        {selectedSite?.geologicalContext.climate || 'SUBTROPICAL'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-rounded">
                      <span className="text-park-ink-muted font-medium">Geological Age:</span>
                      <span className="font-bold text-park-ink bg-park-sand/70 px-2 py-0.5 rounded-md border border-park-card-border text-[11px]">
                        {selectedSite?.geologicalContext.age || '68-66 Ma'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex justify-start gap-2 bg-park-card-muted/80 p-1 rounded-2xl border border-park-card-border">
                {(['overview', 'inventory', 'metrics'] as TabType[]).map((tab) => {
                  const tabLabels: Record<TabType, string> = {
                    overview: 'Overview',
                    inventory: 'Inventory',
                    metrics: 'Metrics'
                  };

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-rounded font-bold transition-all text-center ${
                        activeTab === tab 
                          ? 'bg-white text-park-tree shadow-xs border border-park-card-border' 
                          : 'text-park-ink-muted hover:text-park-ink'
                      }`}
                    >
                      {tabLabels[tab]}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Container */}
              <div className="border-t border-park-card-border pt-2">
                
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="animate-in space-y-4">
                    {/* Site Discovery Summary */}
                    <div className="p-4 bg-white rounded-2xl border border-park-card-border shadow-xs">
                      <div className="mb-2">
                        <h4 className="text-[13px] font-rounded font-extrabold text-park-tree">
                          {selectedSite.name}
                        </h4>
                      </div>
                      <p className="text-[12px] font-rounded leading-relaxed text-park-ink/90">
                        {selectedSite.summary}
                      </p>
                    </div>

                    {/* Geological Specs Tiles */}
                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-3 bg-white rounded-2xl border border-park-card-border shadow-xs">
                          <p className="text-[9px] font-rounded font-bold text-park-ink-muted uppercase">Period Index</p>
                          <p className="text-[12px] font-rounded font-bold text-park-tree mt-0.5">{selectedSite.geologicalContext.period}</p>
                       </div>
                       <div className="p-3 bg-white rounded-2xl border border-park-card-border shadow-xs">
                          <p className="text-[9px] font-rounded font-bold text-park-ink-muted uppercase">Climate Vector</p>
                          <p className="text-[12px] font-rounded font-bold text-park-tree mt-0.5">{selectedSite.geologicalContext.climate}</p>
                       </div>
                    </div>
                  </div>
                )}

                {/* INVENTORY TAB */}
                {activeTab === 'inventory' && (
                  <div className="animate-in space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] font-rounded font-bold text-park-ink-muted px-1">
                      <span>RECOVERED SPECIMENS • TAXA STRATUM</span>
                      <span>RECORD #</span>
                    </div>

                    {selectedSite.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="p-3 bg-white rounded-2xl border border-park-card-border shadow-xs hover:border-park-border-green/60 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-park-accent-green"></span>
                             <h4 className="text-[12px] font-rounded font-bold text-park-tree">{feature.name}</h4>
                           </div>
                           <p className="text-[11px] font-rounded text-park-ink-muted leading-snug">{feature.description}</p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-park-ink-muted bg-park-sand/80 px-2 py-0.5 rounded-md border border-park-card-border shrink-0">
                          {1990 + i * 2}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* METRICS TAB */}
                {activeTab === 'metrics' && (
                  <div className="animate-in space-y-4">
                    {/* Paleoclimate D3 Visual Radar Chart */}
                    <ClimateRadarChart selectedSite={selectedSite} />

                    <div className="bg-white p-4 rounded-2xl border border-park-card-border shadow-xs space-y-3">
                      <h3 className="text-[13px] font-rounded font-bold text-park-tree border-b border-park-card-border pb-2 flex items-center justify-between">
                        <span>Vital Statistics • Specimen Metrics</span>
                        <Sparkles size={14} className="text-park-accent-yellow" />
                      </h3>

                      <div className="flex flex-col gap-2.5">
                        {selectedSite.stats.map((stat, i) => (
                          <div key={i} className="flex justify-between items-baseline group">
                            <span className="text-[11px] font-rounded font-semibold text-park-ink-muted group-hover:text-park-ink transition-colors">
                              {stat.label}
                            </span>
                            <div className="flex-1 border-b border-dotted border-park-card-border mx-2 mb-1"></div>
                            <span className="text-[12px] font-rounded font-extrabold text-park-tree text-right bg-park-sand/40 px-2 py-0.5 rounded-md border border-park-card-border/60">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3.5 bg-park-sand/40 border border-park-card-border rounded-2xl">
                      <p className="text-[9px] font-rounded font-bold text-park-ink-muted uppercase mb-1">Field Note:</p>
                      <p className="text-[10px] font-rounded text-park-ink-muted leading-relaxed">
                        Data retrieved from authenticated paleontological fossil databases and verified through Gemini field visual analysis.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
               <Loader2 size={48} className="text-park-tree mb-4 animate-spin opacity-80" />
               <h3 className="text-2xl font-hand font-bold text-park-tree mb-1">Surveying Global Sites</h3>
               <p className="text-[10px] font-rounded mt-1.5 text-park-ink-muted">Accessing satellite geological data...</p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
               <Globe size={48} className="text-park-tree/40 mb-6" />
               <h3 className="text-[49px] leading-[41.5px] font-hand font-bold text-park-tree mb-4">Welcome to the world of dinosaurs.</h3>
               <p className="text-[17px] font-rounded text-park-ink-muted leading-relaxed max-w-sm">
                 Select any dinosaurs at the top to see fun information along with the animals. Explore the fossil sites, their biosignatures, geological periods, climate contexts, and inventory details.
               </p>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default App;
