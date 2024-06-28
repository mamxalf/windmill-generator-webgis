export const mapPoint = { lng: 110.1752408, lat: -7.3161926 };

export const baseMapConfig = {
  center: [mapPoint.lng, mapPoint.lat],
  hash: true,
  scaleControl: true,
  fullscreenControl: "top-left",
  geolocateControl: true,
  navigationControl: true,
  terrainControl: true,
  pitch: 70,
  bearing: -100.86,
  maxPitch: 85,
};

export const temperaturConfigLayer = {
  opacity: 0.2,
};

export const windConfigLayer = {
  id: "wind-particles",
  speed: 0.01,
  fadeFactor: 0.03,
  maxAmount: 256,
  density: 200,
  color: [0, 0, 0, 30],
  fastColor: [0, 0, 0, 100],
};

export const mapLibreConfig = {
  targets: {
    Residential: "Residential",
    Water: "Water",
    Building: "Building",
    Airport: "Airport",
    "Other POI": "Pois",
  },
  options: {
    showDefault: true,
    showCheckbox: true,
    onlyRendered: false,
    reverseOrder: true,
  },
};
