import React, { useState } from 'react';
import { Loader2, Sparkles, Compass, Eye, ShieldCheck, Ruler, Layers } from 'lucide-react';
import { DinosaurDatabaseEntry } from '../data/dinosaurData';

interface DinosaurBlueprintProps {
  taxaName: string;
  blueprintImage: string | null;
  imgLoading: boolean;
  imgError: boolean;
  onRetry: () => void;
  metadata?: DinosaurDatabaseEntry['metadata'];
  stats?: { label: string; value: string }[];
}

export const DinosaurBlueprint: React.FC<DinosaurBlueprintProps> = ({
  taxaName,
  blueprintImage,
  imgLoading,
  imgError,
  onRetry,
  metadata,
  stats = []
}) => {
  const [viewMode, setViewMode] = useState<'sketch' | 'ai'>('sketch');

  // Switch to AI view automatically if an AI image loads
  React.useEffect(() => {
    if (blueprintImage) {
      setViewMode('ai');
    }
  }, [blueprintImage]);

  // Determine dinosaur category/clade for tailored anatomical silhouette
  const nameLower = taxaName.toLowerCase();
  
  const getSilhouette = () => {
    // Ceratopsian (Triceratops)
    if (nameLower.includes('triceratops')) {
      return (
        <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
          {/* Ceratopsian Body */}
          <path
            d="M 120,175 C 90,140 70,110 50,115 C 40,117 35,130 30,150 C 25,170 30,195 45,210 C 60,225 90,220 120,210 L 150,225 L 175,270 L 205,270 L 195,215 L 290,210 L 320,265 L 350,265 L 340,195 C 410,185 470,195 530,220 C 550,228 565,225 570,218 C 565,205 510,180 430,160 C 370,145 310,140 250,142 C 200,144 175,135 155,120 C 135,100 125,70 120,40 C 115,25 105,25 100,35 C 95,50 90,90 75,105 L 45,108 L 40,115 L 75,118 C 85,125 105,155 120,175 Z"
            fill="currentColor"
            className="text-park-tree/85"
          />
          {/* Horns */}
          <path d="M 75,105 C 50,80 30,60 15,35 C 20,45 40,75 65,110 Z" fill="#e5a83b" />
          <path d="M 90,95 C 65,70 45,50 30,25 C 35,35 55,65 80,100 Z" fill="#e5a83b" />
          <path d="M 40,115 C 25,110 15,105 5,100 C 12,108 22,114 35,118 Z" fill="#e5a83b" />
          {/* Frill Ridge Details */}
          <circle cx="120" cy="40" r="4" fill="#87bd52" />
          <circle cx="108" cy="55" r="3.5" fill="#87bd52" />
          <circle cx="100" cy="72" r="3.5" fill="#87bd52" />
        </svg>
      );
    }

    // Sauropod (Brachiosaurus, Diplodocus, Argentinosaurus, Amargasaurus)
    if (nameLower.includes('brachio') || nameLower.includes('diplo') || nameLower.includes('argen') || nameLower.includes('amarga')) {
      const isHighBrowser = nameLower.includes('brachio');
      return (
        <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
          {/* Sauropod Body */}
          <path
            d={isHighBrowser 
              ? "M 130,50 C 125,35 110,25 95,30 C 85,34 82,45 88,52 C 105,65 125,100 135,140 C 145,180 155,200 160,205 L 145,275 L 175,275 L 195,210 L 285,210 L 280,270 L 310,270 L 325,195 C 375,190 440,200 520,225 C 570,240 590,245 595,242 C 590,235 540,210 460,180 C 400,160 330,150 260,155 C 210,160 180,130 165,95 C 150,60 140,55 130,50 Z"
              : "M 80,130 C 70,120 50,115 40,122 C 35,128 40,135 55,140 C 95,150 140,165 170,185 L 160,270 L 190,270 L 205,210 L 300,210 L 295,270 L 325,270 L 340,195 C 410,190 480,205 580,230 C 595,235 595,225 580,220 C 500,190 420,165 330,155 C 270,150 220,140 160,130 C 120,122 95,125 80,130 Z"
            }
            fill="currentColor"
            className="text-park-tree/85"
          />
          {nameLower.includes('amarga') && (
            <path d="M 120,130 L 125,95 L 132,135 L 140,105 L 147,142 L 158,118 L 165,155" stroke="#e5a83b" strokeWidth="3" fill="none" />
          )}
        </svg>
      );
    }

    // Stegosaurid (Stegosaurus)
    if (nameLower.includes('stego')) {
      return (
        <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
          {/* Stegosaurus Body */}
          <path
            d="M 60,210 C 45,200 40,190 48,185 C 60,180 80,185 110,190 C 130,195 150,190 160,200 L 150,265 L 180,265 L 195,215 L 290,215 L 285,270 L 320,270 L 335,195 C 390,190 450,200 520,220 C 550,228 560,220 540,210 C 470,180 410,160 340,145 C 280,135 220,140 170,160 C 130,175 90,185 60,210 Z"
            fill="currentColor"
            className="text-park-tree/85"
          />
          {/* Alternating Dorsal Plates */}
          <polygon points="150,160 165,115 180,155" fill="#e5a83b" opacity="0.95" />
          <polygon points="185,150 205,95 225,145" fill="#f5a623" opacity="0.95" />
          <polygon points="230,140 255,80 280,135" fill="#e5a83b" opacity="0.95" />
          <polygon points="285,135 315,85 340,140" fill="#f5a623" opacity="0.95" />
          <polygon points="345,145 375,100 400,155" fill="#e5a83b" opacity="0.95" />
          <polygon points="405,155 430,120 450,170" fill="#f5a623" opacity="0.95" />
          {/* Thagomizer Tail Spikes */}
          <line x1="510" y1="210" x2="540" y2="175" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
          <line x1="520" y1="212" x2="555" y2="188" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    }

    // Ankylosaurid (Ankylosaurus)
    if (nameLower.includes('ankylo')) {
      return (
        <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
          {/* Heavy Armored Body */}
          <path
            d="M 80,195 C 65,190 55,180 65,170 C 75,160 100,165 130,160 C 170,140 250,135 340,145 C 390,155 440,175 490,190 L 530,190 C 535,180 555,180 560,192 C 555,205 535,205 530,195 L 490,197 C 440,210 390,215 340,215 L 320,265 L 290,265 L 295,215 L 185,215 L 175,265 L 145,265 L 150,210 C 110,210 90,205 80,195 Z"
            fill="currentColor"
            className="text-park-tree/85"
          />
          {/* Tail Club */}
          <ellipse cx="545" cy="192" rx="18" ry="12" fill="#ea580c" />
          {/* Armor Knobs */}
          <circle cx="180" cy="155" r="4" fill="#f5a623" />
          <circle cx="220" cy="150" r="4" fill="#f5a623" />
          <circle cx="260" cy="148" r="4" fill="#f5a623" />
          <circle cx="300" cy="150" r="4" fill="#f5a623" />
          <circle cx="340" cy="155" r="4" fill="#f5a623" />
        </svg>
      );
    }

    // Spinosaurid (Spinosaurus, Baryonyx)
    if (nameLower.includes('spino') || nameLower.includes('baryonyx')) {
      const hasBigSail = nameLower.includes('spino');
      return (
        <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
          {/* Sail */}
          {hasBigSail && (
            <path
              d="M 210,155 C 230,85 270,50 320,50 C 370,50 400,95 420,165 Z"
              fill="#e5a83b"
              opacity="0.9"
            />
          )}
          {/* Body */}
          <path
            d="M 40,165 C 20,160 10,150 20,140 C 35,130 70,135 110,145 C 150,155 180,155 210,155 C 260,155 350,155 420,165 C 470,175 530,195 580,210 C 585,212 580,218 570,218 C 510,210 450,200 400,200 L 380,270 L 350,270 L 360,205 L 290,205 L 270,250 L 250,250 L 265,195 L 200,195 C 160,195 130,200 110,215 L 75,200 C 60,185 50,170 40,165 Z"
            fill="currentColor"
            className="text-park-tree/85"
          />
        </svg>
      );
    }

    // Default Theropod (T-Rex, Allosaurus, Giganotosaurus, Carnotaurus, etc.)
    return (
      <svg viewBox="0 0 600 300" className="w-full h-full max-h-56 filter drop-shadow-md">
        {/* Theropod Silhouette */}
        <path
          d="M 80,110 C 50,105 35,95 45,80 C 60,65 95,75 130,90 C 160,105 180,120 200,135 C 250,140 330,145 400,160 C 470,175 530,200 580,215 C 590,218 585,225 570,222 C 500,205 430,190 370,188 L 340,270 L 305,270 L 330,190 C 290,190 260,185 240,180 L 225,220 L 210,220 L 220,170 C 190,165 160,160 145,150 L 120,160 C 95,145 85,120 80,110 Z"
          fill="currentColor"
          className="text-park-tree/85"
        />
        {/* Powerful Jaws & Teeth Highlights */}
        <path d="M 52,85 L 60,90 L 70,85 L 80,90" stroke="#f5a623" strokeWidth="2" fill="none" />
        {/* Eye socket */}
        <circle cx="85" cy="85" r="3" fill="#faf8f2" />
      </svg>
    );
  };

  return (
    <div className="w-full bg-[#fdfcfa] rounded-2xl border border-park-card-border shadow-xs overflow-hidden flex flex-col relative transition-all">
      {/* Blueprint Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-park-card-border/80 bg-[#f7f5ed]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-park-accent-green"></div>
          <span className="text-[10px] font-rounded font-extrabold text-park-tree uppercase tracking-wider">
            {viewMode === 'ai' && blueprintImage ? 'AI Photoreal Reconstruction' : 'Field Sketch • Specimen Blueprint'}
          </span>
        </div>

        {/* View Switcher / Action Button */}
        <div className="flex items-center gap-1.5">
          {blueprintImage && (
            <button
              onClick={() => setViewMode(viewMode === 'sketch' ? 'ai' : 'sketch')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-rounded font-bold border border-park-card-border bg-white text-park-tree hover:bg-park-land/20 transition-all shadow-2xs"
            >
              <Eye size={11} />
              <span>{viewMode === 'sketch' ? 'View AI Render' : 'View Blueprint'}</span>
            </button>
          )}

          {!blueprintImage && !imgLoading && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-rounded font-bold border border-park-card-border bg-white text-park-tree hover:bg-park-land/20 transition-all shadow-2xs"
              title="Generate photoreal reconstruction using Gemini Image API"
            >
              <Sparkles size={11} className="text-park-accent-yellow" />
              <span>Generate Photoreal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative min-h-[250px] flex items-center justify-center p-4 overflow-hidden bg-white">
        {imgLoading ? (
          <div className="flex flex-col items-center gap-2.5 py-12">
            <Loader2 className="animate-spin text-park-accent-green" size={32} />
            <span className="text-[11px] font-rounded font-bold text-park-ink-muted animate-pulse">
              Generating paleontological reconstruction with Gemini...
            </span>
            <span className="text-[9px] font-mono text-park-ink-light">
              Synthesizing osteological morphology
            </span>
          </div>
        ) : viewMode === 'ai' && blueprintImage ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <img
              src={blueprintImage}
              alt={`${taxaName} reconstruction`}
              className="max-h-64 w-full object-contain rounded-xl"
            />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-mono">
              Photoreal AI • Gemini 3.1 Flash Image
            </div>
          </div>
        ) : (
          /* Technical Blueprint / Field Sketch */
          <div className="relative w-full h-full flex flex-col items-center justify-center py-2">
            {/* Technical Blueprint Millimeter Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #4ea6a918 1px, transparent 1px),
                  linear-gradient(to bottom, #4ea6a918 1px, transparent 1px)
                `,
                backgroundSize: '16px 16px'
              }}
            />

            {/* Blueprint Crosshairs & Corner Calipers */}
            <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-park-ink-light">
              FIG 1.0 • {taxaName.toUpperCase()}
            </div>
            <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-park-ink-light">
              PROFILE: LATERAL 180°
            </div>

            {/* Silhouette Illustration */}
            <div className="relative z-10 w-full flex items-center justify-center py-2 px-4">
              {getSilhouette()}
            </div>

            {/* Scale Bar at Bottom */}
            <div className="relative z-10 w-full mt-2 pt-2 border-t border-dotted border-park-card-border flex items-center justify-between text-[9px] font-mono text-park-ink-muted px-2">
              <div className="flex items-center gap-1.5">
                <Ruler size={11} className="text-park-tree" />
                <span>SCALE: 1:50</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-park-accent-green"></span>
                  Verified Stratum
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-park-accent-yellow"></span>
                  {metadata?.diet || 'Terrestrial'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Sub-footer Banner */}
      <div className="px-3.5 py-2 bg-[#f9f8f4] border-t border-park-card-border/80 flex items-center justify-between text-[10px] font-rounded">
        <div className="flex items-center gap-1.5 text-park-ink-muted">
          <ShieldCheck size={12} className="text-park-accent-green shrink-0" />
          <span className="font-semibold truncate">
            {imgError
              ? 'Free-Tier Quota Limit Reached • Field Sketch Active'
              : blueprintImage
              ? 'AI Reconstruction Active'
              : 'Technical Field Sketch • Morphological Record'}
          </span>
        </div>
        <div className="font-mono text-[9px] text-park-tree font-bold bg-park-sand px-2 py-0.5 rounded border border-park-card-border shrink-0">
          {metadata?.threatLevel?.split(' ')[0] || 'VERIFIED'}
        </div>
      </div>
    </div>
  );
};
