export const mapPoint = { lng: 110.11182, lat: -7.1882 };

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
  size: 2,
};
