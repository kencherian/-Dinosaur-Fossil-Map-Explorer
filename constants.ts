
import { MapStyleConfig } from "./types";

export const DEFAULT_SITE = "Hell Creek Formation, Montana";

export const MAP_STYLES: MapStyleConfig[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 100 }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#000000" },
      { weight: 1 }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#000000" },
      { visibility: "on" },
      { weight: 1 }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#1a1a1a" },
      { visibility: "on" },
      { weight: 0.5 }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#000000" },
      { visibility: "on" },
      { weight: 1.5 }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
        { color: "#000000" }, 
        { weight: 1 }, 
        { visibility: "on" }
    ]
  }
];

export const INITIAL_SITES = [
  "Hell Creek Formation, MT",
  "Dinosaur Provincial Park, Alberta",
  "Flaming Cliffs, Gobi Desert",
  "Morrison Formation, Colorado",
  "Solnhofen Limestone, Germany",
  "Bahariya Formation, Egypt",
  "Ischigualasto Formation, Argentina",
  "Tendaguru Formation, Tanzania",
  "Liaoning Province, China",
  "Glen Rose Formation, Texas",
  "Isle of Wight, UK",
  "Dinosaur Ridge, CO",
  "Zhongyuan District, China",
  "Winton Formation, Australia",
  "Djadokhta Formation, Mongolia"
];
