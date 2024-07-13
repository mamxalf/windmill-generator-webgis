export const mapPoint = { lng: 110.1752408, lat: -7.3161926 };

export const baseMapConfig = {
  center: [mapPoint.lng, mapPoint.lat],
  hash: true,
  scaleControl: true,
  fullscreenControl: "top-right",
  geolocateControl: true,
  navigationControl: true,
  // terrainControl: true,
  // pitch: 70,
  // bearing: -100.86,
  // maxPitch: 85,
};

export const temperaturConfigLayer = {
  opacity: 0.2,
};

export const windConfigLayer = {
  id: "wind-particles",
  speed: 0.01,
  fadeFactor: 0.03,
  maxAmount: 256,
  density: 100,
  color: [0, 0, 0, 30],
  fastColor: [0, 0, 0, 100],
  fastIsLarger: true,
  size: 3
};

export const station1 = {
  safety_zone: {
    id: "safety-zone",
    name: "Batas Zona Aman",
    color: "#6B8",
    opacity: 0.7,
    visibility: true,
  },
  road_safety_zone: {
    id: "road-safety-zone",
    name: "Batas Zona Aman (Jalan)",
    color: "#AF6341",
    opacity: 0.7,
    visibility: true,
  },
  station_1: {
    id: "station-1",
    name: "Stasiun (Lapangan Kincir Angin) #1",
    color: "#1E90AA",
    opacity: 0.7,
    visibility: true,
  },
};
