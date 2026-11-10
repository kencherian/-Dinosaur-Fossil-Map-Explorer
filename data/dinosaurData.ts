
import { PaleoData, SiteMarker } from "../types";

export interface DinosaurDatabaseEntry {
  name: string;
  summary: string;
  metadata: {
    threatLevel: string;
    threatScore: number;
    diet: string;
    packBehavior: string;
    integument: string;
    flight: string;
    osteologicalCompleteness: number;
  };
  sites: {
    name: string;
    coordinates: { lat: number; lng: number };
    geologicalContext: { era: string; period: string; climate: string; age: string };
    inventory: { name: string; description: string; category: 'skull' | 'skeleton' | 'footprint' | 'environment' }[];
    stats: { label: string; value: string; subtext: string; iconType: 'era' | 'geology' | 'discovery' | 'status' }[];
  }[];
}

export const DINOSAUR_DB: DinosaurDatabaseEntry[] = [
  {
    name: "Tyrannosaurus Rex",
    summary: "The 'King of the Tyrant Lizards', T-Rex was an apex predator with one of the strongest bite forces in terrestrial history. Its massive skull and robust skeleton suggest a hunter capable of taking down even the largest armored herbivores of the Late Cretaceous.",
    metadata: {
      threatLevel: "APEX PREDATOR - EXTREME",
      threatScore: 5,
      diet: "Carnivore",
      packBehavior: "Solitary / Pair",
      integument: "Scaly with Sparse Filaments",
      flight: "None",
      osteologicalCompleteness: 85
    },
    sites: [
      {
        name: "Hell Creek Formation, Montana",
        coordinates: { lat: 47.6097, lng: -106.9142 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical", age: "66-68 Ma" },
        inventory: [
          { name: "AMNH 5027 Skull", description: "Near-complete cranium showing massive bite-force attachment points.", category: "skull" },
          { name: "SUE Specimen", description: "Largest near-complete T-Rex skeleton ever recovered.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "12.3 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,000 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "57,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lance Formation, Wyoming",
        coordinates: { lat: 43.435, lng: -104.223 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Warm/Humid", age: "67 Ma" },
        inventory: [
          { name: "Partial Cervical Vertebrae", description: "Evidence of massive neck musculature.", category: "skeleton" },
          { name: "Theropod Trackway", description: "Preserved footprints in sandstone.", category: "footprint" }
        ],
        stats: [
          { label: "LENGTH", value: "11.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,500 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "55,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Scollard Formation, Alberta",
        coordinates: { lat: 51.78, lng: -112.65 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Wetland", age: "66.5 Ma" },
        inventory: [
          { name: "Dermal Scales", description: "Preserved skin impressions from the pelvic region.", category: "environment" },
          { name: "Scollard Maxilla", description: "Upper jaw element with massive recurved teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "12.1 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,200 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "58,500 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Denver Formation, Colorado",
        coordinates: { lat: 39.73, lng: -104.99 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Riverine Plains", age: "67.2 Ma" },
        inventory: [
          { name: "Caudal Vertebrae Series", description: "Distal tail elements showing weight-bearing structure.", category: "skeleton" },
          { name: "Isolated Dentition", description: "Shed teeth found alongside Edmontosaurus remains.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "11.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,200 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "54,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Frenchman Formation, Saskatchewan",
        coordinates: { lat: 49.15, lng: -108.64 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Temperate Forest", age: "66.8 Ma" },
        inventory: [
          { name: "Scotty Specimen", description: "One of the most massive T-Rex individuals found in Canada.", category: "skeleton" },
          { name: "Pelvic Girdle", description: "Robust bone structure indicative of a fully mature adult.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "13.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,800 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "62,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Black Peaks Formation, Texas",
        coordinates: { lat: 29.3, lng: -103.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Coastline", age: "67 Ma" },
        inventory: [
          { name: "Phalanges", description: "Toes fragments from a large theropod.", category: "skeleton" },
          { name: "Tooth Crown", description: "Excellently preserved enamel with D-shaped cross section.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "11.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,000 KG", subtext: "", iconType: "status" },
          { label: "BITE FORCE", value: "52,000 N", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Triceratops",
    summary: "Known for its three horns and large bony frill, Triceratops was a massive ceratopsid herbivore. It likely used its frill for both protection and courtship display, living in large herds during the terminal Cretaceous.",
    metadata: {
      threatLevel: "HERBIVORE - HIGH DEFENSIVE",
      threatScore: 4,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly with Quill-like structures",
      flight: "None",
      osteologicalCompleteness: 70
    },
    sites: [
      {
        name: "Hell Creek, South Dakota",
        coordinates: { lat: 45.3, lng: -102.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical", age: "66 Ma" },
        inventory: [
          { name: "Frill Section v.9", description: "Massive solid bone frill with defensive scarring.", category: "skull" },
          { name: "Orbital Horn Core", description: "Large bony core of the brow horn.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "10,500 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.1 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Evanston Formation, Wyoming",
        coordinates: { lat: 41.2, lng: -110.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Warm Wetland", age: "66.5 Ma" },
        inventory: [
          { name: "Ceratopsid Trackway", description: "Multiple footprints suggesting a social herd movement.", category: "footprint" },
          { name: "Isolated Nasal Horn", description: "Thick, short horn typical of T. horridus.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "11,200 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.3 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Black Peaks Formation, Texas",
        coordinates: { lat: 29.3, lng: -103.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Coastline", age: "67 Ma" },
        inventory: [
          { name: "Partial Metatarsals", description: "Foot bones showing significant weight-bearing adaptations.", category: "skeleton" },
          { name: "Vertebral Centra", description: "Mid-back vertebrae fragments.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "9,800 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Frenchman Formation, Saskatchewan",
        coordinates: { lat: 49.3, lng: -108.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Humid Continental", age: "66 Ma" },
        inventory: [
          { name: "Skull 'Prorsus'", description: "Exquisitely preserved skull of T. prorsus.", category: "skull" },
          { name: "Ossified Tendons", description: "Bony structures found along the spine for support.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "11,500 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.2 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lance Formation, Montana",
        coordinates: { lat: 45.8, lng: -106.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Floodplain", age: "67.5 Ma" },
        inventory: [
          { name: "Shoulder Blade", description: "Massive scapula element from a large bull.", category: "skeleton" },
          { name: "Cervical Collar", description: "Syncervical bones (fused neck vertebrae).", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "12,500 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.4 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Denver Formation, Colorado",
        coordinates: { lat: 39.75, lng: -104.85 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Braided Stream", age: "66.8 Ma" },
        inventory: [
          { name: "Epoccipitals", description: "Decorative bony spikes from the edge of the frill.", category: "skull" },
          { name: "Manual Ungual", description: "Hoof-like nail from the front foot.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.7 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "10,200 KG", subtext: "", iconType: "status" },
          { label: "HORN LENGTH", value: "1.1 Meters", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Velociraptor",
    summary: "A small, bird-like dromaeosaurid, Velociraptor was an agile hunter armed with a retractable sickle-shaped claw on its second toe. Contrary to popular media, it was roughly the size of a turkey and fully feathered.",
    metadata: {
      threatLevel: "AMBUSH PREDATOR - MODERATE",
      threatScore: 3,
      diet: "Carnivore",
      packBehavior: "Solitary / Small Group",
      integument: "Confirmed Feathers",
      flight: "None",
      osteologicalCompleteness: 95
    },
    sites: [
      {
        name: "Flaming Cliffs, Gobi Desert",
        coordinates: { lat: 44.2, lng: 103.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Desert", age: "75 Ma" },
        inventory: [
          { name: "Fighting Dinosaurs", description: "Iconic specimen of Velociraptor locked in combat with Protoceratops.", category: "skeleton" },
          { name: "Sickle Claw Beta", description: "Highly curved manual ungual for slashing.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "2.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "15 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "40 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Djadokhta Formation, Mongolia",
        coordinates: { lat: 44.1, lng: 103.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Eolian Dunes", age: "71-75 Ma" },
        inventory: [
          { name: "Feather Quill Knobs", description: "Ulna bone showing attachment points for large feathers.", category: "skeleton" },
          { name: "Slender Cranium", description: "Near-complete skull showing high binocular vision capacity.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "1.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "14 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "38 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Bayan Mandahu, China",
        coordinates: { lat: 41.5, lng: 107.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Sand Dunes", age: "72 Ma" },
        inventory: [
          { name: "Juvenile Mandible", description: "Small jaw element showing rapid growth markers.", category: "skull" },
          { name: "Tail Stabilizer", description: "Fused caudal vertebrae used for balancing during high-speed maneuvers.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "1.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "10 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "42 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Barun Goyot Formation, Mongolia",
        coordinates: { lat: 43.5, lng: 101.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Oasis Margins", age: "73 Ma" },
        inventory: [
          { name: "V. osmolskae Holotype", description: "Distinct skull elements of the second Velociraptor species.", category: "skull" },
          { name: "Manual Digits", description: "Grasping hands with large claws for securing small prey.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "2.1 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "18 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "36 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Tugrikin Shireh, Mongolia",
        coordinates: { lat: 44.0, lng: 103.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Dry Steppe", age: "74 Ma" },
        inventory: [
          { name: "Protoceratops Assemblage", description: "Velociraptor teeth found in direct association with hadrosaur kills.", category: "environment" },
          { name: "Sclerotic Rings", description: "Bony eye supports indicating nocturnal or crepuscular activity.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "1.9 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "16 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "39 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Nemegt Formation, Mongolia",
        coordinates: { lat: 43.6, lng: 100.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "River Valley", age: "70 Ma" },
        inventory: [
          { name: "Caudal Rods", description: "Elongated spinal processes providing rigidity to the tail.", category: "skeleton" },
          { name: "Metatarsus", description: "Mid-foot bones optimized for fast bursts of speed.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "2.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "15 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "40 KM/H", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Spinosaurus",
    summary: "The largest known carnivorous dinosaur, Spinosaurus was uniquely adapted for a semi-aquatic lifestyle. With its sail-like neural spines and long, narrow snout, it likely hunted fish in North African river systems.",
    metadata: {
      threatLevel: "SEMI-AQUATIC APEX",
      threatScore: 5,
      diet: "Carnivore / Piscivore",
      packBehavior: "Solitary",
      integument: "Smooth / Scaly Skin",
      flight: "None",
      osteologicalCompleteness: 40
    },
    sites: [
      {
        name: "Kem Kem Beds, Morocco",
        coordinates: { lat: 31.0, lng: -4.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Riverine Delta", age: "95 Ma" },
        inventory: [
          { name: "Sail Spines v.1", description: "Neural spines from the dorsal region forming the sail.", category: "skeleton" },
          { name: "Piscivore Dentition", description: "Conical teeth specialized for gripping fish.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "15.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,000 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "15 KNOTS", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Bahariya Oasis, Egypt",
        coordinates: { lat: 28.3, lng: 28.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Swampy Estuary", age: "98 Ma" },
        inventory: [
          { name: "Original Holotype", description: "Fragments of the original specimen destroyed in WWII.", category: "skeleton" },
          { name: "Lower Jaw Alpha", description: "Massive dentary showing crocodile-like snout shape.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "16.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,500 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "12 KNOTS", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Chenini Formation, Tunisia",
        coordinates: { lat: 32.9, lng: 10.3 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Coastal Delta", age: "112 Ma" },
        inventory: [
          { name: "Conical Tooth Array", description: "Large collection of shed teeth from multiple individuals.", category: "skull" },
          { name: "Metatarsal Fragments", description: "Evidence of flat, paddle-like feet for swimming.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "14.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "6,800 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "14 KNOTS", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Alcântara Formation, Brazil",
        coordinates: { lat: -2.4, lng: -44.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Tropical Estuary", age: "96 Ma" },
        inventory: [
          { name: "Spinosaurid Tooth", description: "Trans-Atlantic evidence of the species range.", category: "skull" },
          { name: "Vertebral Centrum", description: "Large tail vertebra supporting a paddle-like structure.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "15.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,800 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "16 KNOTS", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Adrar des Ifoghas, Mali",
        coordinates: { lat: 19.5, lng: 1.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Inland Sea Margins", age: "94 Ma" },
        inventory: [
          { name: "Nasal Fragments", description: "Dorsally retracted nostrils for underwater breathing.", category: "skull" },
          { name: "Gastralia Series", description: "Belly ribs indicative of a dense, heavy skeleton for buoyancy.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "14.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,200 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "13 KNOTS", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Tegana Formation, Morocco",
        coordinates: { lat: 31.2, lng: -3.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Swamp", age: "95.5 Ma" },
        inventory: [
          { name: "Paddle-Tail Specimen", description: "Excellently preserved caudal series with high neural spines.", category: "skeleton" },
          { name: "Rib Fragments", description: "Pachyostotic ribs providing high density for diving.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "14.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "7,400 KG", subtext: "", iconType: "status" },
          { label: "SWIM SPEED", value: "15 KNOTS", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Allosaurus",
    summary: "The 'Different Lizard' was the dominant predator of the Jurassic. It had relatively small horns above its eyes and a jaw that could open exceptionally wide, allowing it to use its skull as a biological axe.",
    metadata: {
      threatLevel: "APEX PREDATOR - HIGH",
      threatScore: 4,
      diet: "Carnivore",
      packBehavior: "Solitary / Small Groups",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 75
    },
    sites: [
      {
        name: "Cleveland-Lloyd Quarry, Utah",
        coordinates: { lat: 39.3, lng: -110.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Ephemeral Lake", age: "145 Ma" },
        inventory: [
          { name: "Mass Death Assemblage", description: "Over 40 individuals found in a single predator trap.", category: "skeleton" },
          { name: "Pathological Ribs", description: "Evidence of healed combat wounds from Stegosaurus tails.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,000 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "4,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dinosaur Ridge, Colorado",
        coordinates: { lat: 39.7, lng: -105.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Braided Rivers", age: "150 Ma" },
        inventory: [
          { name: "Big Al 2", description: "Near-complete adult skeleton found in high-energy river deposit.", category: "skeleton" },
          { name: "Theropod Trackway", description: "Large three-toed prints showing walking stride.", category: "footprint" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,400 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "4,500 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Como Bluff, Wyoming",
        coordinates: { lat: 41.9, lng: -106.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Semi-Arid Savanna", age: "152 Ma" },
        inventory: [
          { name: "A. fragilis Holotype", description: "Primary reference specimen for the species.", category: "skeleton" },
          { name: "Orbital Horn Core", description: "Small bony protrusion above the eye used for display.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,800 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "3,800 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Garden Park, Colorado",
        coordinates: { lat: 38.5, lng: -105.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Floodplain", age: "148 Ma" },
        inventory: [
          { name: "Skull v.12", description: "Highly articulated cranium with kinetic joints.", category: "skull" },
          { name: "Manual Ungual", description: "Large recurved claw from the first digit of the hand.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,100 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "4,200 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lourinhã Formation, Portugal",
        coordinates: { lat: 39.2, lng: -9.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Tropical Coastal", age: "151 Ma" },
        inventory: [
          { name: "A. europaeus Remains", description: "European variant of the Allosaurus lineage.", category: "skeleton" },
          { name: "Nesting Site", description: "Fossilized eggs found in association with theropod remains.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "7.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,500 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "3,500 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dry Mesa Quarry, Colorado",
        coordinates: { lat: 38.6, lng: -108.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Savanna Delta", age: "149 Ma" },
        inventory: [
          { name: "Scapula-Coracoid", description: "Large shoulder girdle indicating massive arm muscles.", category: "skeleton" },
          { name: "Maxilla v.3", description: "Upper jaw showing deep sockets for ziphodont teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.6 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,050 KG", subtext: "", iconType: "status" },
          { label: "AXE-STRIKE", value: "4,100 N", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Stegosaurus",
    summary: "A thyreophoran dinosaur famous for the dual row of bony plates along its back and its 'thagomizer' tail spikes. It had a remarkably small brain-to-body ratio but was highly successful across the Late Jurassic.",
    metadata: {
      threatLevel: "ARMORED HERBIVORE - LOW",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly with Dermal Plates",
      flight: "None",
      osteologicalCompleteness: 65
    },
    sites: [
      {
        name: "Morrison Formation, Colorado",
        coordinates: { lat: 39.6, lng: -105.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Savanna / Floodplain", age: "150 Ma" },
        inventory: [
          { name: "Thagomizer Spikes", description: "Four massive defensive spikes from the tail tip.", category: "skeleton" },
          { name: "Dorsal Plates", description: "Vascularized plates used for thermoregulation.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,000 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "17-19", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Como Bluff, Wyoming",
        coordinates: { lat: 41.9, lng: -106.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Braided Stream", age: "152 Ma" },
        inventory: [
          { name: "Sophie Specimen", description: "The most complete Stegosaurus skeleton ever found.", category: "skeleton" },
          { name: "Tail Spine v.4", description: "Asymmetric spine showing wear from combat.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,800 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "18", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dry Mesa Quarry, Colorado",
        coordinates: { lat: 38.6, lng: -108.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Semi-Arid Savanna", age: "148 Ma" },
        inventory: [
          { name: "Cervical Osteoderms", description: "Small bony plates that protected the neck.", category: "skeleton" },
          { name: "Mandible Frag", description: "Narrow jaw with small leaf-shaped teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "7.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,200 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "17", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dinosaur National Monument, Utah",
        coordinates: { lat: 40.4, lng: -109.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Riverine Bend", age: "149 Ma" },
        inventory: [
          { name: "Plate Array Gamma", description: "Large diamond-shaped plates preserved in sequence.", category: "skeleton" },
          { name: "Pectoral Girdle", description: "Robust shoulder bones supporting the heavy forelimbs.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,300 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "20", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lourinhã Formation, Portugal",
        coordinates: { lat: 39.2, lng: -9.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Coastal Tropical", age: "151 Ma" },
        inventory: [
          { name: "S. adana Skeleton", description: "Portuguese species confirming the clade's presence in Europe.", category: "skeleton" },
          { name: "Nest Site Beta", description: "Clutch of fossilized stegosaurid eggs.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "8.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,500 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "17", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Garden Park, Colorado",
        coordinates: { lat: 38.4, lng: -105.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Arid Coast", age: "147 Ma" },
        inventory: [
          { name: "Ischium v.2", description: "Hip bone element from a large adult.", category: "skeleton" },
          { name: "Dermal Spikes", description: "Spikes found in association with Allosaurus teeth.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.3 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,600 KG", subtext: "", iconType: "status" },
          { label: "PLATE COUNT", value: "19", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Brachiosaurus",
    summary: "A titan among giants, Brachiosaurus was notable for its longer forelimbs compared to its hindlimbs, giving it a giraffe-like posture. It was a high-level browser, feeding on the canopy of prehistoric forests.",
    metadata: {
      threatLevel: "TITAN HERBIVORE - NEUTRAL",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Loose Herd",
      integument: "Leathery / Scaly",
      flight: "None",
      osteologicalCompleteness: 55
    },
    sites: [
      {
        name: "Tendaguru Formation, Tanzania",
        coordinates: { lat: -9.5, lng: 39.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Tropical Coastal", age: "150 Ma" },
        inventory: [
          { name: "Humerus Alpha", description: "Massive forelimb bone exceeding 2 meters in length.", category: "skeleton" },
          { name: "Cervical Column", description: "Large vertebrae for neck support.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "25.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "50,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "13.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Morrison Formation, Colorado",
        coordinates: { lat: 38.5, lng: -105.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Savanna", age: "152 Ma" },
        inventory: [
          { name: "B. altithorax Holotype", description: "Primary reference for North American brachiosaurids.", category: "skeleton" },
          { name: "Scapulocoracoid", description: "Giant shoulder bone over 2.1 meters long.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "26.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "55,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "14.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Como Bluff, Wyoming",
        coordinates: { lat: 41.9, lng: -106.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Semi-Arid", age: "154 Ma" },
        inventory: [
          { name: "Pelvic Girdle Fragment", description: "Massive ilium showing high-stress load markers.", category: "skeleton" },
          { name: "Gastroliths", description: "Polished stones used for aiding digestion.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "24.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "48,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "12.5 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lusitanian Basin, Portugal",
        coordinates: { lat: 39.2, lng: -9.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Coastal Tropical", age: "151 Ma" },
        inventory: [
          { name: "Lusotitan Remains", description: "European brachiosaurid closely related to Brachiosaurus.", category: "skeleton" },
          { name: "Metatarsal v.2", description: "Heavy-duty foot bone for supporting immense weight.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "23.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "45,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "12.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dry Mesa Quarry, Colorado",
        coordinates: { lat: 38.6, lng: -108.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Floodplain Savanna", age: "148 Ma" },
        inventory: [
          { name: "Neural Spines", description: "Elongated spinal processes for neck muscle attachment.", category: "skeleton" },
          { name: "Cranial Vault", description: "Rare skull fragments showing high-set nostrils.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "27.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "58,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "15.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Potter Creek, Colorado",
        coordinates: { lat: 38.2, lng: -108.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Fluvial Basin", age: "153 Ma" },
        inventory: [
          { name: "Forelimb Elements", description: "Humerus and radius found in articulated sequence.", category: "skeleton" },
          { name: "Osteoderms", description: "Bony plates found associated with large sauropod remains.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "25.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "53,000 KG", subtext: "", iconType: "status" },
          { label: "BROWSE HT.", value: "13.5 Meters", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Ankylosaurus",
    summary: "The ultimate tank. Ankylosaurus was covered in thick bony armor plates (osteoderms) and possessed a heavy club at the end of its tail capable of breaking the legs of even the largest predators.",
    metadata: {
      threatLevel: "ARMORED HERBIVORE - HIGH",
      threatScore: 4,
      diet: "Herbivore",
      packBehavior: "Solitary",
      integument: "Dermal Armor Plates",
      flight: "None",
      osteologicalCompleteness: 30
    },
    sites: [
      {
        name: "Scollard Formation, Alberta",
        coordinates: { lat: 51.8, lng: -112.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Swampy Plains", age: "66 Ma" },
        inventory: [
          { name: "Tail Club v.1", description: "Fused distal vertebrae forming a massive bony club.", category: "skeleton" },
          { name: "Cervical Half-Ring", description: "Bony collar protecting the neck.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "6,000 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "100,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Hell Creek, Montana",
        coordinates: { lat: 47.6, lng: -106.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Wetland", age: "66.5 Ma" },
        inventory: [
          { name: "Armor Plates Gamma", description: "Collection of individual osteoderms found in situ.", category: "skeleton" },
          { name: "Wide Beak", description: "Keratinous beak fragment for stripping vegetation.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "7.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,800 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "95,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Frenchman Formation, Saskatchewan",
        coordinates: { lat: 49.2, lng: -108.6 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Temperate Forest", age: "66.2 Ma" },
        inventory: [
          { name: "Skull AMNH 5214", description: "The most complete Ankylosaurus skull known.", category: "skull" },
          { name: "Rib Array", description: "Extra-wide ribcage supporting the massive gut.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "6,500 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "110,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lance Formation, Wyoming",
        coordinates: { lat: 43.4, lng: -104.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Savanna Savanna", age: "67 Ma" },
        inventory: [
          { name: "Shoulder Spikes", description: "Large lateral osteoderms that protected the flanks.", category: "skeleton" },
          { name: "Nasal Passages", description: "Complex internal skull structures for scent and cooling.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "7.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,500 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "90,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Kirtland Formation, New Mexico",
        coordinates: { lat: 36.2, lng: -108.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Arid", age: "74 Ma" },
        inventory: [
          { name: "Pelvic Shield", description: "Fused armor plates over the hip region.", category: "skeleton" },
          { name: "Small Ossicles", description: "Pea-sized bones that filled gaps in the main armor.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,200 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "85,000 N", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Edmonton Formation, Alberta",
        coordinates: { lat: 53.5, lng: -113.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Cool Temperate", age: "69 Ma" },
        inventory: [
          { name: "Metatarsals", description: "Deeply scarred foot bones showing high impact loads.", category: "skeleton" },
          { name: "Lateral Spines", description: "Row of osteoderms protecting the torso side.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "7.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,600 KG", subtext: "", iconType: "status" },
          { label: "CLUB IMPACT", value: "98,000 N", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Giganotosaurus",
    summary: "Hailing from South America, this Carcharodontosaurid was larger than a T-Rex but had a lighter build. It was likely a specialist in hunting large sauropods using its blade-like teeth.",
    metadata: {
      threatLevel: "APEX PREDATOR - EXTREME",
      threatScore: 5,
      diet: "Carnivore",
      packBehavior: "Loose Pack",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 70
    },
    sites: [
      {
        name: "Candeleros Formation, Argentina",
        coordinates: { lat: -39.0, lng: -68.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Hot Savanna", age: "97 Ma" },
        inventory: [
          { name: "MUCPv-Ch1", description: "70% complete skeleton including a massive jaw.", category: "skeleton" },
          { name: "Blade Teeth", description: "Serrated teeth optimized for slicing flesh.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "13.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,500 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "35 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Huincul Formation, Argentina",
        coordinates: { lat: -38.9, lng: -69.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Seasonal Arid", age: "95 Ma" },
        inventory: [
          { name: "Secondary Jaw", description: "Part of a second individual found in proximity to sauropods.", category: "skull" },
          { name: "Femur Alpha", description: "Robust thigh bone indicating high walking efficiency.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "12.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,200 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "34 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Rio Limay Formation, Patagonia",
        coordinates: { lat: -39.3, lng: -68.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Fluvial Basin", age: "98 Ma" },
        inventory: [
          { name: "Neural Arch", description: "Part of the spinal column supporting massive back muscles.", category: "skeleton" },
          { name: "Pubic Boot", description: "Large anchor point for abdominal muscles.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "13.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,800 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "33 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Neuquén Basin, Argentina",
        coordinates: { lat: -38.5, lng: -68.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Savanna Delta", age: "96 Ma" },
        inventory: [
          { name: "Scapula Fragment", description: "Shoulder blade element showing evidence of large muscle attachment.", category: "skeleton" },
          { name: "Braincase CT", description: "CT scan of fossilized braincase showing olfactory focus.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "13.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,400 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "35 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Plaza Huincul, Argentina",
        coordinates: { lat: -39.2, lng: -69.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Humid Coastal", age: "97.5 Ma" },
        inventory: [
          { name: "Dentary Fragment", description: "Lower jaw piece with deep-set tooth sockets.", category: "skull" },
          { name: "Fibula Core", description: "Lower leg bone demonstrating the species' height.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "13.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "9,000 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "32 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Añelo Formation, Argentina",
        coordinates: { lat: -38.3, lng: -68.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Inland", age: "94.5 Ma" },
        inventory: [
          { name: "Theropod Footprint", description: "Giant tridactyl track matching the size of Giganotosaurus.", category: "footprint" },
          { name: "Cervical Vertebra", description: "Neck bone fragments showing pneumatic (air-filled) structure.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "13.1 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "8,300 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "34 KM/H", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Parasaurolophus",
    summary: "Famous for its long, tube-like head crest, Parasaurolophus was a hadrosaur that likely used its crest for vocalization, acting as a natural trombone for low-frequency communication.",
    metadata: {
      threatLevel: "HERBIVORE - LOW",
      threatScore: 1,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly Skin Impressions",
      flight: "None",
      osteologicalCompleteness: 80
    },
    sites: [
      {
        name: "Fruitland Formation, New Mexico",
        coordinates: { lat: 36.5, lng: -108.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Plain", age: "75 Ma" },
        inventory: [
          { name: "Cranial Crest", description: "2-meter long hollow nasal tube.", category: "skull" },
          { name: "Hadrosaur Skin", description: "Carbonized skin impressions showing fine scales.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "10.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,500 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "50-100 HZ", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Kaiparowits Formation, Utah",
        coordinates: { lat: 37.4, lng: -111.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Swampy Forest", age: "76 Ma" },
        inventory: [
          { name: "Juvenile Crest", description: "Small crest showing developmental stages of the sound tube.", category: "skull" },
          { name: "Sclerotic Ring", description: "Bony eye structure for large, wide-angle eyes.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,200 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "80-150 HZ", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dinosaur Park Formation, Alberta",
        coordinates: { lat: 50.7, lng: -111.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Floodplain", age: "75.5 Ma" },
        inventory: [
          { name: "Walkeri Holotype", description: "Found with near-complete skeleton including skin.", category: "skeleton" },
          { name: "Dental Battery", description: "Hundreds of grinding teeth in the back of the jaw.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "10.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,000 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "40-90 HZ", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Kirtland Formation, New Mexico",
        coordinates: { lat: 36.3, lng: -108.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Arid", age: "73 Ma" },
        inventory: [
          { name: "Caudal Tendons", description: "Bony tendons that stiffened the tail for balance.", category: "skeleton" },
          { name: "Forelimb Elements", description: "Strong bones for supporting occasional four-legged walking.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,400 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "60-110 HZ", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Bisti/De-Na-Zin Wilderness, NM",
        coordinates: { lat: 36.1, lng: -108.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Badlands Oasis", age: "74.5 Ma" },
        inventory: [
          { name: "P. tubicen Skull", description: "Largest skull found with extremely complex internal crest tubes.", category: "skull" },
          { name: "Vertebral Arch", description: "Evidence of high back structure for supporting the neck and crest.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "11.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,200 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "30-70 HZ", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Ojo Alamo Formation, New Mexico",
        coordinates: { lat: 36.6, lng: -108.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Savanna Plain", age: "72.5 Ma" },
        inventory: [
          { name: "Scapula v.3", description: "Shoulder blade element from a large individual.", category: "skeleton" },
          { name: "Tooth Row", description: "Single dental battery row showing rapid tooth replacement.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "10.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,600 KG", subtext: "", iconType: "status" },
          { label: "CREST FREQ.", value: "55-105 HZ", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Carnotaurus",
    summary: "The 'Meat-Eating Bull' was a highly specialized abelisaurid with two distinct horns over its eyes and incredibly short forelimbs. It was likely one of the fastest large theropods.",
    metadata: {
      threatLevel: "AMBUSH PREDATOR - HIGH",
      threatScore: 4,
      diet: "Carnivore",
      packBehavior: "Solitary",
      integument: "Scaly with Osteoderms",
      flight: "None",
      osteologicalCompleteness: 90
    },
    sites: [
      {
        name: "La Colonia Formation, Argentina",
        coordinates: { lat: -43.5, lng: -67.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Savanna", age: "71 Ma" },
        inventory: [
          { name: "Horned Cranium", description: "Only known skull with paired frontal horns.", category: "skull" },
          { name: "Extensive Skin", description: "Preserved impressions of scaly hide over the body.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,500 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "50 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Rio Limay Basin, Patagonia",
        coordinates: { lat: -39.1, lng: -68.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Seasonal Floodplain", age: "73 Ma" },
        inventory: [
          { name: "Abelisaurid Femur", description: "Thick, high-load femur showing rapid sprint capacity.", category: "skeleton" },
          { name: "Vestigial Humerus", description: "Tiny arm bone with four non-functional digits.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "7.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,400 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "52 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Anacleto Formation, Argentina",
        coordinates: { lat: -38.7, lng: -68.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Desert Oasis", age: "75 Ma" },
        inventory: [
          { name: "Caudal Vertebrae Series", description: "Tail bones showing high-speed stabilization markers.", category: "skeleton" },
          { name: "Ilium Fragment", description: "Hip bone structure for powering massive leg muscles.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "7.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,350 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "55 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Allen Formation, Argentina",
        coordinates: { lat: -39.4, lng: -67.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Swamp", age: "72 Ma" },
        inventory: [
          { name: "Osteoderm Array", description: "Individual bony knobs found associated with theropod tracks.", category: "environment" },
          { name: "Lower Jaw v.2", description: "Slender mandible showing weak bite force but high speed.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,600 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "48 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Neuquén Group, Argentina",
        coordinates: { lat: -38.3, lng: -68.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Inland Savanna", age: "74 Ma" },
        inventory: [
          { name: "Metatarsal Core", description: "Long, slender foot bones typical of a cursorial hunter.", category: "skeleton" },
          { name: "Cervical Spike", description: "Bony ridge found on a neck vertebra.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "7.9 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,450 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "51 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Candeleros Formation, Patagonia",
        coordinates: { lat: -39.5, lng: -68.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Hot Arid", age: "96 Ma" },
        inventory: [
          { name: "Abelisaurid Teeth", description: "Blade-like teeth with small serrations.", category: "skull" },
          { name: "Pubis v.3", description: "Pelvic bone indicating the lean, athletic build of the abelisaurids.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.1 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,550 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "49 KM/H", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Baryonyx",
    summary: "A fish-eating spinosaurid from Europe, Baryonyx possessed a large thumb claw and a crocodile-like snout. It likely hunted along riverbanks, swiping at fish in shallow waters.",
    metadata: {
      threatLevel: "PISCIVORE - MODERATE",
      threatScore: 3,
      diet: "Piscivore / Carnivore",
      packBehavior: "Solitary",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 60
    },
    sites: [
      {
        name: "Weald Clay, Surrey, UK",
        coordinates: { lat: 51.1, lng: -0.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Deltaic Lagoon", age: "125 Ma" },
        inventory: [
          { name: "Heavy Claw", description: "31-centimeter long manual ungual.", category: "skeleton" },
          { name: "Gastroliths", description: "Evidence of stomach contents including fish scales.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,700 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "31 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Isle of Wight, UK",
        coordinates: { lat: 50.6, lng: -1.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Coastal Swamp", age: "128 Ma" },
        inventory: [
          { name: "Wessex Tooth", description: "Shed conical tooth showing fine serrations.", category: "skull" },
          { name: "Partial Coracoid", description: "Shoulder bone element for supporting a strong forelimb.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,600 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "28 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Burgos Province, Spain",
        coordinates: { lat: 42.3, lng: -3.7 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "River Channel", age: "120 Ma" },
        inventory: [
          { name: "Iberian Mandible", description: "Lower jaw piece with 32 tooth positions.", category: "skull" },
          { name: "Caudal Spine", description: "Tail vertebra showing low neural arch.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,900 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "33 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Elrhaz Formation, Niger",
        coordinates: { lat: 16.5, lng: 9.3 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Fluvial Oasis", age: "115 Ma" },
        inventory: [
          { name: "Suchomimus Link", description: "Closely related spinosaurid fossils found in similar strata.", category: "skeleton" },
          { name: "Snout Tip", description: "Premaxilla showing the characteristic 'rostral terminal rosette'.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "11.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,200 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "35 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lusitanian Basin, Portugal",
        coordinates: { lat: 39.1, lng: -9.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Lagoonal", age: "122 Ma" },
        inventory: [
          { name: "Dorsal Vertebra", description: "Mid-back vertebra fragment with tall neural spine.", category: "skeleton" },
          { name: "Manual Digit III", description: "Outer finger bone element.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,500 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "27 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Ibaraki Prefecture, Japan",
        coordinates: { lat: 36.3, lng: 140.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Coastal Pacific", age: "110 Ma" },
        inventory: [
          { name: "Isolated Teeth", description: "Spinosaurid teeth from the Japanese archipelago.", category: "skull" },
          { name: "Ischium Frag", description: "Part of the hip girdle showing large size.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,650 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "30 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Diplodocus",
    summary: "A classic long-necked sauropod, Diplodocus had a whip-like tail that it might have used for defense or communication. It was built lighter than many of its contemporaries.",
    metadata: {
      threatLevel: "SAUROPOD - NEUTRAL",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly / Leathery",
      flight: "None",
      osteologicalCompleteness: 75
    },
    sites: [
      {
        name: "Bone Cabin Quarry, Wyoming",
        coordinates: { lat: 41.8, lng: -106.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Savanna", age: "154 Ma" },
        inventory: [
          { name: "Caudal Whip", description: "Thin distal tail vertebrae for supersonic cracking.", category: "skeleton" },
          { name: "Peg-like Teeth", description: "Teeth optimized for stripping leaves from branches.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "27.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "15,000 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 1.1", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dinosaur National Monument, UT",
        coordinates: { lat: 40.4, lng: -109.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "River Bend", age: "150 Ma" },
        inventory: [
          { name: "D. carnegii Skeleton", description: "Near-complete articulated specimen found in the quarry wall.", category: "skeleton" },
          { name: "Juvenile Mandible", description: "Small jaw element from a sub-adult individual.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "25.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "14,500 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 1.0", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Como Bluff, Wyoming",
        coordinates: { lat: 41.9, lng: -106.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Semi-Arid Savanna", age: "152 Ma" },
        inventory: [
          { name: "D. longus Holotype", description: "Primary reference for the elongated sauropod.", category: "skeleton" },
          { name: "Metatarsal G", description: "Large foot bones demonstrating weight distribution.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "24.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "13,000 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 0.9", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Morrison, Colorado",
        coordinates: { lat: 39.6, lng: -105.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Braided Stream", age: "148 Ma" },
        inventory: [
          { name: "Cervical Series 4", description: "Long neck vertebrae showing air sacs for weight reduction.", category: "skeleton" },
          { name: "Diplodocus Trackway", description: "Parallel tracks suggesting herd migration.", category: "footprint" }
        ],
        stats: [
          { label: "LENGTH", value: "28.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "16,500 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 1.2", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lourinhã Formation, Portugal",
        coordinates: { lat: 39.2, lng: -9.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Tropical Coastal", age: "151 Ma" },
        inventory: [
          { name: "Dinheirosaurus Frag", description: "Closely related genus with diplodocid features.", category: "skeleton" },
          { name: "Caudal Vertebrae v.9", description: "High-neural-arch tail bones.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "23.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "12,000 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 0.8", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Sheep Creek, Wyoming",
        coordinates: { lat: 42.1, lng: -106.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Arid Floodplain", age: "152 Ma" },
        inventory: [
          { name: "Articulated Tail", description: "Near-perfect distal tail showing ossified tendons.", category: "skeleton" },
          { name: "Humerus v.1", description: "Left forelimb bone from a mature individual.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "26.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "15,500 KG", subtext: "", iconType: "status" },
          { label: "TAIL VEL.", value: "MACH 1.1", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Argentinosaurus",
    summary: "Potentially the largest land animal to ever live. This titanosaur reached weights comparable to a blue whale and moved in slow, earth-shaking herds across South America.",
    metadata: {
      threatLevel: "SUPER-TITAN - NEUTRAL",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly / Osteoderms",
      flight: "None",
      osteologicalCompleteness: 15
    },
    sites: [
      {
        name: "Huincul Formation, Argentina",
        coordinates: { lat: -39.1, lng: -69.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical Savanna", age: "94 Ma" },
        inventory: [
          { name: "Dorsal Vertebra", description: "Single vertebra standing 1.6 meters tall.", category: "skeleton" },
          { name: "Femur Beta", description: "Massive leg bone fragments showing load stress.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "35.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "80,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.5 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Neuquén Basin, Patagonia",
        coordinates: { lat: -38.5, lng: -68.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Savanna Basin", age: "96 Ma" },
        inventory: [
          { name: "Tibia Core", description: "Heavy lower leg bone over 1.5 meters long.", category: "skeleton" },
          { name: "Titanosaur Osteoderm", description: "Large bony plate that protected the back.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "33.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "75,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.2 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Plaza Huincul, Argentina",
        coordinates: { lat: -39.2, lng: -69.1 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Seasonal Wet", age: "95 Ma" },
        inventory: [
          { name: "Cervical Rib Alpha", description: "Elongated rib that supported the massive neck.", category: "skeleton" },
          { name: "Fibula Section", description: "Fragments of the outer leg bone.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "36.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "85,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.8 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Rio Limay Group, Argentina",
        coordinates: { lat: -39.3, lng: -68.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "River Floodplain", age: "97 Ma" },
        inventory: [
          { name: "Sacral Core", description: "Fused pelvic vertebrae for hip stability.", category: "skeleton" },
          { name: "Titanosaur Nest", description: "Large clutch of fossilized eggs found in proximity.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "34.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "78,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.4 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Anacleto Formation, Argentina",
        coordinates: { lat: -38.8, lng: -68.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Semiarid Steppe", age: "93 Ma" },
        inventory: [
          { name: "Caudal Centrum", description: "Tail vertebra element showing reduced neural spine.", category: "skeleton" },
          { name: "Metatarsal v.5", description: "Solid foot bone fragments.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "32.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "72,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lago Barreales, Argentina",
        coordinates: { lat: -38.4, lng: -68.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Lake Marginal", age: "95 Ma" },
        inventory: [
          { name: "Titanosaur Fibula", description: "Exceptionally tall lower leg bone.", category: "skeleton" },
          { name: "Dorsal Neural Arch", description: "Back bone element showing muscle attachment sites.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "34.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "79,000 KG", subtext: "", iconType: "status" },
          { label: "STRIDE LEN.", value: "4.5 Meters", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Iguanodon",
    summary: "One of the first dinosaurs ever described. Iguanodon had a large thumb spike likely used for defense and could move both on two and four legs.",
    metadata: {
      threatLevel: "HERBIVORE - MODERATE",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Herd",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 85
    },
    sites: [
      {
        name: "Bernissart Mine, Belgium",
        coordinates: { lat: 50.5, lng: 3.7 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Swampy Delta", age: "125 Ma" },
        inventory: [
          { name: "Bernissart Herd", description: "Over 30 complete skeletons found in a single fissure.", category: "skeleton" },
          { name: "Thumb Spike", description: "Defensive conical spike on the manual digit.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,000 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Weald Clay, Isle of Wight, UK",
        coordinates: { lat: 50.6, lng: -1.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Coastal Swamp", age: "128 Ma" },
        inventory: [
          { name: "Mantell's Tooth", description: "Original fossil found in 1822.", category: "skull" },
          { name: "Hindlimb v.4", description: "Robust leg bones for bipedal and quadrupedal movement.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,800 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Nehden, Germany",
        coordinates: { lat: 51.4, lng: 8.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Karst Basin", age: "130 Ma" },
        inventory: [
          { name: "I. bernissartensis", description: "Articulated skeleton showing dental battery details.", category: "skeleton" },
          { name: "Partial Coracoid", description: "Shoulder bone providing evidence of bipedal stance.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,200 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Maestrazgo Basin, Spain",
        coordinates: { lat: 40.5, lng: -0.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Riverine Delta", age: "126 Ma" },
        inventory: [
          { name: "Iguanodontid Tracks", description: "Three-toed footprints preserved in sandstone.", category: "footprint" },
          { name: "Maxilla Fragment", description: "Jawbone with self-sharpening teeth positions.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,600 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Sainte-Victoire, France",
        coordinates: { lat: 43.5, lng: 5.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Mediterranean Basin", age: "124 Ma" },
        inventory: [
          { name: "Vertebral Centra", description: "Dorsal vertebrae with ossified tendons preserved.", category: "skeleton" },
          { name: "Manual Ungual Spike", description: "Near-perfectly preserved defensive thumb spike.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,100 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Burgos Province, Spain",
        coordinates: { lat: 42.1, lng: -3.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Delta Estuary", age: "122 Ma" },
        inventory: [
          { name: "Sacrum Core", description: "Fused pelvic bones supporting the heavy trunk.", category: "skeleton" },
          { name: "Cervical Spike", description: "Spike element found on the neck vertebra.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,950 KG", subtext: "", iconType: "status" },
          { label: "DIGIT COUNT", value: "5", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Therizinosaurus",
    summary: "A bizarre theropod with the longest claws of any animal in history. Despite its intimidating scythe-like claws, it was primarily a herbivore with a pot-bellied body.",
    metadata: {
      threatLevel: "ARMED HERBIVORE - HIGH",
      threatScore: 4,
      diet: "Herbivore",
      packBehavior: "Solitary",
      integument: "Feathered Filaments",
      flight: "None",
      osteologicalCompleteness: 45
    },
    sites: [
      {
        name: "Nemegt Formation, Mongolia",
        coordinates: { lat: 43.5, lng: 100.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Fluvial Basin", age: "70 Ma" },
        inventory: [
          { name: "Scythe Claws", description: "1-meter long manual unguals for feeding or defense.", category: "skeleton" },
          { name: "Massive Scapula", description: "Evidence of powerful forelimbs used to pull branches.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,000 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "1.0 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Bayan Shireh Formation, Mongolia",
        coordinates: { lat: 44.5, lng: 106.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arid Inland", age: "90 Ma" },
        inventory: [
          { name: "Erlikosaurus Skull", description: "Closely related taxon providing skull data for the clade.", category: "skull" },
          { name: "Therizinosaur Metatarsals", description: "Short, robust foot bones for supporting a slow-moving body.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,200 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "0.8 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Gobi Desert, Northern China",
        coordinates: { lat: 41.5, lng: 107.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Desert Steppe", age: "85 Ma" },
        inventory: [
          { name: "Segnosaurus Jaw", description: "Downturned beak with small serrated teeth.", category: "skull" },
          { name: "Pubic Girdle v.4", description: "Backwards-pointing pubis typical of 'pot-bellied' dinosaurs.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "8.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,800 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "0.7 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Alxa Desert, Inner Mongolia",
        coordinates: { lat: 39.5, lng: 105.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Dry Savannah", age: "80 Ma" },
        inventory: [
          { name: "Therizinosaurid Phalanx", description: "Finger bone fragments showing extreme elongation.", category: "skeleton" },
          { name: "Dermal Impressions", description: "Carbonized traces of filamentous feathers.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,500 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "0.9 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Khermeen Tsav, Mongolia",
        coordinates: { lat: 43.3, lng: 99.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Badlands Oasis", age: "72 Ma" },
        inventory: [
          { name: "Nemegetomaia Nest", description: "Nesting site of related oviraptorosaur found in same strata.", category: "environment" },
          { name: "Caudal Vertebrae v.12", description: "Small tail bones indicative of a short, non-functional tail.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "5,500 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "1.1 Meters", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Iren Dabasu Formation, China",
        coordinates: { lat: 43.7, lng: 112.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Arid", age: "70 Ma" },
        inventory: [
          { name: "Manual Ungual Gamma", description: "Large recurved claw found in high-energy sediment.", category: "skeleton" },
          { name: "Ischium Core", description: "Pelvic bone showing distinct abelisaurid-like features.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,300 KG", subtext: "", iconType: "status" },
          { label: "CLAW LEN.", value: "0.85 Meters", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Pachycephalosaurus",
    summary: "The 'Thick-Headed Lizard' had a dome-shaped skull roof up to 25 cm thick. It likely used this for head-butting or flank-butting during territorial disputes.",
    metadata: {
      threatLevel: "HERBIVORE - MODERATE",
      threatScore: 2,
      diet: "Herbivore / Omnivore",
      packBehavior: "Small Group",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 50
    },
    sites: [
      {
        name: "Hell Creek, South Dakota",
        coordinates: { lat: 45.4, lng: -102.6 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical", age: "66 Ma" },
        inventory: [
          { name: "Thickened Dome", description: "Pachyostotic skull roof with minimal brain cavity.", category: "skull" },
          { name: "Bony Spikes", description: "Small nodes surrounding the base of the dome.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "4.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "450 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "25 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lance Formation, Wyoming",
        coordinates: { lat: 43.4, lng: -104.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Humid Coastal", age: "67 Ma" },
        inventory: [
          { name: "Stygimoloch Skull", description: "Now thought to be a juvenile Pachycephalosaurus with longer spikes.", category: "skull" },
          { name: "Tibia Fragment", description: "Leg bone element showing cursorial (running) ability.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "4.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "400 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "20 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Frenchman Formation, Saskatchewan",
        coordinates: { lat: 49.3, lng: -108.6 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Temperate Forest", age: "66.5 Ma" },
        inventory: [
          { name: "Caudal Tendons", description: "Stiffening tendons for tail-assisted balancing during combat.", category: "skeleton" },
          { name: "Premaxillary Teeth", description: "Front teeth used for grabbing vegetation or insects.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "4.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "500 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "28 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Scollard Formation, Alberta",
        coordinates: { lat: 51.8, lng: -112.7 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Swamp", age: "66.2 Ma" },
        inventory: [
          { name: "Dracorex Skull", description: "Flat-headed juvenile form with extremely long spikes.", category: "skull" },
          { name: "Humerus Alpha", description: "Upper arm bone from a mature individual.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "4.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "380 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "15 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Kirtland Formation, New Mexico",
        coordinates: { lat: 36.3, lng: -108.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Arid", age: "74 Ma" },
        inventory: [
          { name: "Incomplete Squamosal", description: "Back skull fragment showing decorative nodes.", category: "skull" },
          { name: "Rib Section", description: "Thin ribs typical of the smaller pachycephalosaurids.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "350 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "12 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Ferris Formation, Wyoming",
        coordinates: { lat: 41.9, lng: -107.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Floodplain Swamp", age: "66.7 Ma" },
        inventory: [
          { name: "Dome v.5", description: "Mid-sized dome showing significant cranial vascularity.", category: "skull" },
          { name: "Pubis Fragment", description: "Part of the pelvic girdle supporting a wide gut.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "4.4 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "430 KG", subtext: "", iconType: "status" },
          { label: "DOME THICK.", value: "22 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Utahraptor",
    summary: "The largest known raptor. Utahraptor was built like a heavy-duty predator, far stockier than its smaller relatives, with a massive killing claw on each foot.",
    metadata: {
      threatLevel: "APEX RAPTOR - EXTREME",
      threatScore: 5,
      diet: "Carnivore",
      packBehavior: "Pack Hunter",
      integument: "Feathered Filaments",
      flight: "None",
      osteologicalCompleteness: 35
    },
    sites: [
      {
        name: "Cedar Mountain Formation, UT",
        coordinates: { lat: 38.9, lng: -109.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Floodplains", age: "125 Ma" },
        inventory: [
          { name: "Mega-Claw", description: "24-centimeter long sickle claw on the pedal digit.", category: "skeleton" },
          { name: "Robust Femur", description: "Evidence of powerful leg musculature for tackling large prey.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "500 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "24 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dalton Wells Quarry, Utah",
        coordinates: { lat: 38.8, lng: -109.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Braided Rivers", age: "126 Ma" },
        inventory: [
          { name: "Premaxilla v.2", description: "Upper front jaw element with sharp, curved teeth.", category: "skull" },
          { name: "Metatarsal G", description: "Strong mid-foot bone designed for high acceleration.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "5.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "480 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "22 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Stikes Quarry, Utah",
        coordinates: { lat: 39.1, lng: -109.7 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Ephemeral Lake", age: "124 Ma" },
        inventory: [
          { name: "Massive Tail Base", description: "Large tail vertebrae supporting the heavy stabilizer.", category: "skeleton" },
          { name: "Abdominal Gastralia", description: "Belly ribs found in articulated sequence.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "520 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "26 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Gaston Quarry, Utah",
        coordinates: { lat: 39.0, lng: -109.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Savanna Plain", age: "127 Ma" },
        inventory: [
          { name: "Radius Fragment", description: "Lower arm bone showing feather attachment markers.", category: "skeleton" },
          { name: "Dentary Alpha", description: "Near-complete lower jaw with 16 functional teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "6.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "550 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "28 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Yellow Cat Member, Utah",
        coordinates: { lat: 38.7, lng: -109.2 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Fluvial Estuary", age: "123 Ma" },
        inventory: [
          { name: "Manual Ungual", description: "Large claw from the three-fingered hand.", category: "skeleton" },
          { name: "Cervical Vertebra v.4", description: "Robust neck bone for supporting a heavy head.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "5.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "450 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "21 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Arches National Park area, Utah",
        coordinates: { lat: 38.6, lng: -109.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Arid Floodplain", age: "125.5 Ma" },
        inventory: [
          { name: "Raptor Footprints", description: "Two-toed tracks showing the raised second claw.", category: "footprint" },
          { name: "Phalanx Section", description: "Toe bone from the killing-claw digit.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "500 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "24 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Compsognathus",
    summary: "One of the smallest known dinosaurs, roughly the size of a modern chicken. It was an agile insectivore and small vertebrate hunter of the Late Jurassic lagoons.",
    metadata: {
      threatLevel: "MINI-PREDATOR - LOW",
      threatScore: 1,
      diet: "Insectivore / Carnivore",
      packBehavior: "Solitary",
      integument: "Scaly / Smooth",
      flight: "None",
      osteologicalCompleteness: 98
    },
    sites: [
      {
        name: "Solnhofen Limestone, Germany",
        coordinates: { lat: 48.9, lng: 11.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Archipelago", age: "150 Ma" },
        inventory: [
          { name: "Gut Contents", description: "Last meal (Bavarisaurus lizard) preserved in stomach.", category: "environment" },
          { name: "Fine Skeleton", description: "Exquisitely preserved juvenile specimen.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "1.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "60 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Canjuers plateau, France",
        coordinates: { lat: 43.7, lng: 6.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Tropical Lagoon", age: "152 Ma" },
        inventory: [
          { name: "C. corallestris", description: "Largest known specimen showing distinct limb proportions.", category: "skeleton" },
          { name: "Cranial Impression", description: "Fine details of the slender, long snout.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "1.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3.5 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "58 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Portland Limestone, England",
        coordinates: { lat: 50.5, lng: -2.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Coastal Arid", age: "148 Ma" },
        inventory: [
          { name: "Isolated Femur", description: "Small theropod thigh bone matching Compsognathus.", category: "skeleton" },
          { name: "Theropod Trackway", description: "Minuscule three-toed tracks on ancient shoreline.", category: "footprint" }
        ],
        stats: [
          { label: "LENGTH", value: "0.9 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2.8 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "62 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Jachenshausen, Germany",
        coordinates: { lat: 48.9, lng: 11.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Lagoonal Oasis", age: "151 Ma" },
        inventory: [
          { name: "Metatarsal Series", description: "Perfectly preserved mid-foot for high-speed running.", category: "skeleton" },
          { name: "Pectoral Girdle", description: "Delicate shoulder bones indicating small but active arms.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "1.1 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3.2 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "59 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Nusplingen, Germany",
        coordinates: { lat: 48.2, lng: 8.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Deep Lagoon", age: "153 Ma" },
        inventory: [
          { name: "Dorsal Ribs", description: "Fine rib fragments found in plattenkalk limestone.", category: "skeleton" },
          { name: "Mandible Frag", description: "Lower jaw with tiny, needle-sharp teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "0.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2.5 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "65 KM/H", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Kelheim, Germany",
        coordinates: { lat: 48.9, lng: 11.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Jurassic", climate: "Island Archipelago", age: "150.5 Ma" },
        inventory: [
          { name: "Cervical Vertebrae", description: "Long, flexible neck bones for rapid head movement.", category: "skeleton" },
          { name: "Pubic Core", description: "Delicate pelvic element showing basic theropod form.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "1.05 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3.1 KG", subtext: "", iconType: "status" },
          { label: "SPEED VEC.", value: "61 KM/H", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Microraptor",
    summary: "A four-winged dromaeosaurid from China. It possessed long flight feathers on both its arms and legs, likely using them for gliding or powered flight in dense forests.",
    metadata: {
      threatLevel: "GLIDER - LOW",
      threatScore: 1,
      diet: "Carnivore / Piscivore",
      packBehavior: "Solitary",
      integument: "Confirmed Feathers / Iridescent",
      flight: "Capable",
      osteologicalCompleteness: 100
    },
    sites: [
      {
        name: "Jiufotang Formation, China",
        coordinates: { lat: 41.5, lng: 120.3 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Temperate Forest", age: "120 Ma" },
        inventory: [
          { name: "Wing Impression", description: "Preserved melanin structures suggesting iridescent black color.", category: "environment" },
          { name: "Asymmetric Feathers", description: "Flight-capable feather morphology on all four limbs.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "0.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Yixian Formation, China",
        coordinates: { lat: 41.6, lng: 121.2 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Volcanic Forest", age: "125 Ma" },
        inventory: [
          { name: "Holotype M. zhaoianus", description: "First four-winged dinosaur discovered with feather halos.", category: "skeleton" },
          { name: "Gut Contents v.2", description: "Bird remains (Enantiornithes) found in the abdominal cavity.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "0.75 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "0.9 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Sihetun, China",
        coordinates: { lat: 41.4, lng: 120.7 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Ash-Covered Woodland", age: "124 Ma" },
        inventory: [
          { name: "Cranial Detail", description: "Perfectly preserved skull showing sharp recurved teeth.", category: "skull" },
          { name: "Sclerotic Rings", description: "Bony eye supports suggesting day-hunting habits.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "0.85 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1.1 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dawangzhangzi, China",
        coordinates: { lat: 41.7, lng: 119.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Lush Basin", age: "122 Ma" },
        inventory: [
          { name: "M. gui Specimen", description: "Large individual with clearly defined leg wings.", category: "skeleton" },
          { name: "Tail Fan", description: "Diamond-shaped feather fan at the tail tip for aerial control.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "0.9 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1.2 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lujiatun, China",
        coordinates: { lat: 41.2, lng: 120.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "River Marginal", age: "126 Ma" },
        inventory: [
          { name: "Isolated Femur", description: "Leg bone showing pneumatic structure for weight reduction.", category: "skeleton" },
          { name: "Feather Barbs", description: "Microscopic detail of individual flight feathers.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "0.7 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "0.8 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Jianshangou, China",
        coordinates: { lat: 41.9, lng: 120.8 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Montane Forest", age: "124.5 Ma" },
        inventory: [
          { name: "M. hanangi Slab", description: "Articulated skeleton showing interlocking tail rods.", category: "skeleton" },
          { name: "Manual Claws", description: "Sharply curved claws for climbing trees.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "0.82 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1.0 KG", subtext: "", iconType: "status" },
          { label: "WINGS", value: "4 INDIV.", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Albertosaurus",
    summary: "A tyrannosaurid from North America that was smaller and more agile than its famous cousin T-Rex. Evidence suggests it may have been a gregarious pack hunter.",
    metadata: {
      threatLevel: "PACK PREDATOR - HIGH",
      threatScore: 4,
      diet: "Carnivore",
      packBehavior: "Pack Hunter",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 85
    },
    sites: [
      {
        name: "Horseshoe Canyon Formation, Alberta",
        coordinates: { lat: 51.5, lng: -112.9 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Swamp", age: "70 Ma" },
        inventory: [
          { name: "Dry Island Bonebed", description: "Mass grave of 22 individuals ranging in age from 2 to 20 years.", category: "skeleton" },
          { name: "A. sarcophagus Skull", description: "Highly kinetic skull with D-shaped premaxillary teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,500 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "22 INDIV.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dry Island Buffalo Jump, Alberta",
        coordinates: { lat: 51.9, lng: -113.0 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Fluvial Delta", age: "71 Ma" },
        inventory: [
          { name: "Juvenile Tibia", description: "Slender lower leg bone indicating high agility in young.", category: "skeleton" },
          { name: "Theropod Coprolite", description: "Fossilized dung showing hadrosaur bone fragments.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "8.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,200 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "15-25 EST.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Edmonton Formation, Alberta",
        coordinates: { lat: 53.5, lng: -113.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Cool Coastal", age: "69 Ma" },
        inventory: [
          { name: "Ischium Core", description: "Pelvic element showing heavy muscle attachment.", category: "skeleton" },
          { name: "Maxilla v.9", description: "Upper jaw showing deep sockets for ziphodont teeth.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,400 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "10+ EST.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Saint Mary River Formation, Alberta",
        coordinates: { lat: 49.5, lng: -113.2 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical Forest", age: "72 Ma" },
        inventory: [
          { name: "Theropod Trackway", description: "Group of footprints suggesting social movement.", category: "footprint" },
          { name: "Shed Teeth Array", description: "Collection of teeth found in association with ceratopsid kills.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "8.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,100 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "5-10 EST.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Prince Creek Formation, Alaska",
        coordinates: { lat: 70.1, lng: -151.3 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arctic (Warm)", age: "69.5 Ma" },
        inventory: [
          { name: "Arctic Albertosaurine", description: "Teeth and bone fragments showing adaptation to seasonal light.", category: "skeleton" },
          { name: "Large Orbit Fragment", description: "Skull part suggesting larger eyes for lower light levels.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "7.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,800 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "Unknown", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Wapiti Formation, Alberta",
        coordinates: { lat: 54.8, lng: -118.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Boreal Marsh", age: "73 Ma" },
        inventory: [
          { name: "Fibula Alpha", description: "Lower leg bone from a mature adult.", category: "skeleton" },
          { name: "Scapula v.4", description: "Shoulder blade element showing evidence of large arm muscles.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,600 KG", subtext: "", iconType: "status" },
          { label: "GROUP SIZE", value: "8+ EST.", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Edmontosaurus",
    summary: "A massive hadrosaur without a crest. It had a duck-like beak and was capable of chewing tough vegetation. Some specimens are so well preserved they include mummified skin.",
    metadata: {
      threatLevel: "HERBIVORE - LOW",
      threatScore: 1,
      diet: "Herbivore",
      packBehavior: "Massive Herd",
      integument: "Scaly Skin / Soft Frill",
      flight: "None",
      osteologicalCompleteness: 90
    },
    sites: [
      {
        name: "Horseshoe Canyon Formation, Alberta",
        coordinates: { lat: 51.6, lng: -112.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Coastal Wetland", age: "70 Ma" },
        inventory: [
          { name: "Edmontosaurus regalis Skull", description: "Large flat-topped cranium showing evidence of a soft fleshy crest.", category: "skull" },
          { name: "Mummified Forelimb", description: "Preserved skin showing fine non-overlapping scales.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "12.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,000 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "1000+ EST.", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Hell Creek Formation, Montana",
        coordinates: { lat: 47.7, lng: -106.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Subtropical Floodplain", age: "66.5 Ma" },
        inventory: [
          { name: "Dakota Mummy", description: "Extremely well-preserved specimen with fossilized skin and muscle.", category: "environment" },
          { name: "Bite-Marked Vertebrae", description: "Hadrosaur bones with healed T-Rex bite marks.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "13.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,500 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "Hundreds", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lance Formation, Wyoming",
        coordinates: { lat: 43.5, lng: -104.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Savanna Estuary", age: "67 Ma" },
        inventory: [
          { name: "Anatotitan Skeleton", description: "Huge hadrosaur specimen now classified as E. annectens.", category: "skeleton" },
          { name: "Broad Beak", description: "Keratinous sheath fragments from the duck-like snout.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "12.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,200 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "Large Groups", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Frenchman Formation, Saskatchewan",
        coordinates: { lat: 49.4, lng: -108.4 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Temperate Marsh", age: "66.2 Ma" },
        inventory: [
          { name: "Dental Battery v.12", description: "Interlocking tooth columns for efficient grinding.", category: "skull" },
          { name: "Pubis Girdle", description: "Pelvic bones showing expansive internal digestive capacity.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "11.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,800 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "Regional", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Prince Creek Formation, Alaska",
        coordinates: { lat: 70.2, lng: -151.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Arctic Forest", age: "69 Ma" },
        inventory: [
          { name: "Ugrunaaluk Remains", description: "High-latitude hadrosaur closely related to Edmontosaurus.", category: "skeleton" },
          { name: "Arctic Tracks", description: "Widespread trackways indicating overwintering populations.", category: "footprint" }
        ],
        stats: [
          { label: "LENGTH", value: "9.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,000 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "Seasonal", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Scollard Formation, Alberta",
        coordinates: { lat: 51.9, lng: -112.5 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Cool Wetland", age: "66.8 Ma" },
        inventory: [
          { name: "Tail Tendons", description: "Ossified bony lattice supporting the heavy tail.", category: "skeleton" },
          { name: "Pes Elements", description: "Foot bones showing wide, fleshy pads for swampy ground.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "12.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "4,100 KG", subtext: "", iconType: "status" },
          { label: "HERD SIZE", value: "Massive", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Dilophosaurus",
    summary: "Known for the twin crests on its head, Dilophosaurus was one of the earliest large predatory dinosaurs. Unlike its movie depiction, there is no evidence of a neck frill or venom-spitting capabilities.",
    metadata: {
      threatLevel: "EARLY PREDATOR - MODERATE",
      threatScore: 3,
      diet: "Carnivore",
      packBehavior: "Solitary",
      integument: "Inconclusive / Scaly",
      flight: "None",
      osteologicalCompleteness: 60
    },
    sites: [
      {
        name: "Kayenta Formation, Arizona",
        coordinates: { lat: 36.7, lng: -110.2 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Braided Stream System", age: "193 Ma" },
        inventory: [
          { name: "Holotype Crests", description: "Paired bony crests atop the skull.", category: "skull" },
          { name: "Premaxillary Gap", description: "Notched jaw typical of early theropods.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "7.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "400 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "25 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Moenave Formation, Arizona",
        coordinates: { lat: 36.2, lng: -111.4 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Ephemeral Rivers", age: "198 Ma" },
        inventory: [
          { name: "Theropod Tracks", description: "Dilophosaurus-sized tridactyl prints in sandstone.", category: "footprint" },
          { name: "Caudal Vertebra", description: "Tail bone fragment from a sub-adult.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "350 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "20 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Dharmaram Formation, India",
        coordinates: { lat: 19.3, lng: 79.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Tropical Floodplain", age: "195 Ma" },
        inventory: [
          { name: "Dilophosaurid Tooth", description: "Large recurved tooth from an early theropod.", category: "skull" },
          { name: "Humerus Frag", description: "Upper arm bone element.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "300 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "Unknown", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lower Lufeng Formation, China",
        coordinates: { lat: 25.1, lng: 102.1 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Seasonal Arid", age: "190 Ma" },
        inventory: [
          { name: "Sinosaurus Skull", description: "Early crested theropod once classified as Dilophosaurus.", category: "skull" },
          { name: "Metatarsal v.3", description: "Solid foot bones for fast movement.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.8 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "380 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "22 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Navajo Sandstone, Arizona",
        coordinates: { lat: 36.5, lng: -110.8 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Large Dune Field", age: "185 Ma" },
        inventory: [
          { name: "Trackway Delta", description: "Inland dune tracks of large predators.", category: "footprint" },
          { name: "Claw Fragment", description: "Shed manual ungual from a predatory dino.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "7.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "420 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "26 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Wingate Sandstone, Arizona",
        coordinates: { lat: 36.1, lng: -111.2 },
        geologicalContext: { era: "Mesozoic", period: "Early Jurassic", climate: "Coastal Dune", age: "201 Ma" },
        inventory: [
          { name: "Skull Fragments", description: "Crushed cranial elements found in red sandstone.", category: "skull" },
          { name: "Vertebral Centra", description: "Mid-dorsal vertebrae series.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "6.4 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "340 KG", subtext: "", iconType: "status" },
          { label: "CREST HT.", value: "18 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Deinonychus",
    summary: "The 'Terrible Claw'. This agile predator revolutionized our understanding of dinosaurs as active, warm-blooded animals. It used its massive toe claw to strike at prey much larger than itself.",
    metadata: {
      threatLevel: "PACK PREDATOR - EXTREME",
      threatScore: 5,
      diet: "Carnivore",
      packBehavior: "Pack Hunter",
      integument: "Feathered",
      flight: "None",
      osteologicalCompleteness: 80
    },
    sites: [
      {
        name: "Cloverly Formation, Montana",
        coordinates: { lat: 45.1, lng: -108.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Seasonal Savannah", age: "115 Ma" },
        inventory: [
          { name: "Ostrom's Holotype", description: "Primary skeleton that led to the Dinosaur Renaissance.", category: "skeleton" },
          { name: "Killing Claw Alpha", description: "12-centimeter retractable sickle claw.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.4 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "70 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "12 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Cloverly Formation, Wyoming",
        coordinates: { lat: 44.5, lng: -108.2 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Riverine Plains", age: "112 Ma" },
        inventory: [
          { name: "Tenontosaurus Association", description: "Deinonychus fossils found with much larger herbivore remains.", category: "environment" },
          { name: "Tail Rods", description: "Ossified tendons that kept the tail perfectly straight for balance.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "65 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "11 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Antlers Formation, Oklahoma",
        coordinates: { lat: 34.2, lng: -95.6 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Humid Coastal", age: "110 Ma" },
        inventory: [
          { name: "Isolted Teeth Array", description: "Collection of serrated teeth from a large pack.", category: "skull" },
          { name: "Manual Ungual", description: "Large grasping hand claw.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "75 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "13 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Cedar Mountain Formation, Utah",
        coordinates: { lat: 39.2, lng: -110.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Arid Floodplain", age: "124 Ma" },
        inventory: [
          { name: "D. antirrhopus Remains", description: "Specimens confirming the widespread range of the species.", category: "skeleton" },
          { name: "Fibula Frag", description: "Lower leg bone showing attachment for powerful calf muscles.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.3 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "68 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "12 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Arundel Formation, Maryland",
        coordinates: { lat: 39.1, lng: -76.8 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Atlantic Swamp", age: "112 Ma" },
        inventory: [
          { name: "Deinonychus-like Tooth", description: "Teeth from the East Coast matching the dromaeosaurid profile.", category: "skull" },
          { name: "Small Phalanx", description: "Toe bone element found in clay deposits.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "60 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "10 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Paluxy River, Texas",
        coordinates: { lat: 32.2, lng: -97.8 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Tropical Shoreline", age: "113 Ma" },
        inventory: [
          { name: "Dromaeosaur Tracks", description: "Two-toed footprints indicating the raised sickle claw.", category: "footprint" },
          { name: "Metatarsal v.8", description: "Mid-foot fragment found in lagoonal sediments.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "3.6 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "80 KG", subtext: "", iconType: "status" },
          { label: "CLAW CURVE", value: "14 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  },
  {
    name: "Amargasaurus",
    summary: "A unique sauropod from South America, famous for the dual row of long, thin spines along its neck and back. It was significantly smaller than most sauropods but was highly visually distinct.",
    metadata: {
      threatLevel: "SAUROPOD - LOW",
      threatScore: 2,
      diet: "Herbivore",
      packBehavior: "Small Group",
      integument: "Scaly",
      flight: "None",
      osteologicalCompleteness: 70
    },
    sites: [
      {
        name: "La Amarga Formation, Argentina",
        coordinates: { lat: -39.2, lng: -68.9 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Seasonal Savanna", age: "130 Ma" },
        inventory: [
          { name: "Holotype Skeleton", description: "Excellently preserved skeleton including the spectacular neck spines.", category: "skeleton" },
          { name: "Skull Fragments", description: "Blunt snout showing high-level browsing capacity.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "10.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,500 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "60 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Neuquén Group, Argentina",
        coordinates: { lat: -38.6, lng: -68.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Fluvial Basin", age: "128 Ma" },
        inventory: [
          { name: "Cervical Spines v.2", description: "Bifurcated neural spines from the mid-neck region.", category: "skeleton" },
          { name: "Fibula Alpha", description: "Lower leg bone from an adult individual.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "9.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,200 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "55 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Lohan Cura Formation, Argentina",
        coordinates: { lat: -39.5, lng: -69.1 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Subtropical Wetland", age: "125 Ma" },
        inventory: [
          { name: "Dicraeosaurid Teeth", description: "Peg-like teeth optimized for soft vegetation.", category: "skull" },
          { name: "Metatarsal G", description: "Compact foot bones for efficient movement in soft ground.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "10.5 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,800 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "65 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Rayoso Formation, Argentina",
        coordinates: { lat: -38.2, lng: -69.5 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Semi-Arid Basin", age: "115 Ma" },
        inventory: [
          { name: "Dorsal Vertebra v.9", description: "Neural arch showing reduced spine length towards the hips.", category: "skeleton" },
          { name: "Gastroliths", description: "Stomach stones found with juvenile remains.", category: "environment" }
        ],
        stats: [
          { label: "LENGTH", value: "8.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "1,800 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "40 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Bajada Colorada Formation, Argentina",
        coordinates: { lat: -40.1, lng: -69.8 },
        geologicalContext: { era: "Mesozoic", period: "Early Cretaceous", climate: "Tropical Floodplain", age: "135 Ma" },
        inventory: [
          { name: "Bajadasaurus Spines", description: "Long forward-pointing spines from a close relative.", category: "skeleton" },
          { name: "Scapulocoracoid", description: "Shoulder girdle showing evidence of large neck muscles.", category: "skeleton" }
        ],
        stats: [
          { label: "LENGTH", value: "11.0 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "3,000 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "70 CM", subtext: "", iconType: "status" }
        ]
      },
      {
        name: "Candeleros Formation, Argentina",
        coordinates: { lat: -39.0, lng: -68.8 },
        geologicalContext: { era: "Mesozoic", period: "Late Cretaceous", climate: "Hot Savannah", age: "96 Ma" },
        inventory: [
          { name: "Dicraeosaurid Tail", description: "Short tail fragments typical of the family.", category: "skeleton" },
          { name: "Isolated Teeth", description: "Collection of teeth found in river deposits.", category: "skull" }
        ],
        stats: [
          { label: "LENGTH", value: "9.2 Meters", subtext: "", iconType: "status" },
          { label: "WEIGHT CLASS", value: "2,100 KG", subtext: "", iconType: "status" },
          { label: "SPINE HT.", value: "50 CM", subtext: "", iconType: "status" }
        ]
      }
    ]
  }
];
