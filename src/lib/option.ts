export const mapPoint = { lng: 110.1752408, lat: -7.3161926 };

export const baseMapConfig = {
  center: [mapPoint.lng, mapPoint.lat],
  hash: true,
  scaleControl: true,
  fullscreenControl: "top-right",
  geolocateControl: true,
  navigationControl: true,
  // terrainControl: true,
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

export const legend = {
  alang_alang: {
    id: "alang-alang",
    color: "#A8D08D",
    opacity: 0.7,
  },
  bangunan: {
    id: "bangunan",
    color: "#FF6347",
    opacity: 0.9,
  },
  hutan_kering: {
    id: "hutan-kering",
    color: "#228B22",
    opacity: 0.6,
  },
  jalan_garis: {
    id: "jalan-garis",
    color: "#000000",
    opacity: 1,
  },
  kabel_listrik: {
    id: "kabel-listrik",
    color: "#FFD700",
    opacity: 0.8,
  },
  kebun: {
    id: "kebun",
    color: "#32CD32",
    opacity: 0.7,
  },
  ladang: {
    id: "ladang",
    color: "#8B4513",
    opacity: 0.7,
  },
  pemukiman: {
    id: "pemukiman",
    color: "#D3D3D3",
    opacity: 0.8,
  },
  sawah: {
    id: "sawah",
    color: "#98FB98",
    opacity: 0.6,
  },
  semak_belukar: {
    id: "semak-belukar",
    color: "#556B2F",
    opacity: 0.6,
  },
  sungai: {
    id: "sungai",
    color: "#1E90FF",
    opacity: 0.5,
  },
  tanaman_campur: {
    id: "tanaman-campur",
    color: "#6B8E23",
    opacity: 0.6,
  },
};
