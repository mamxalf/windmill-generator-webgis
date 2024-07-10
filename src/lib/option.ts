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
  density: 200,
  color: [0, 0, 0, 30],
  fastColor: [0, 0, 0, 100],
};

export const legend = {
  alang_alang: {
    id: "alang-alang",
    name: "Alang Alang",
    color: "#A8D08D",
    opacity: 0.7,
    visibility: true,
  },
  bangunan: {
    id: "bangunan",
    name: "Bangunan",
    color: "#FF6347",
    opacity: 0.9,
    visibility: true,
  },
  hutan_kering: {
    id: "hutan-kering",
    name: "Hutan Kering",
    color: "#228B22",
    opacity: 0.6,
    visibility: true,
  },
  jalan_garis: {
    id: "jalan-garis",
    name: "Jalan (Garis)",
    color: "#000000",
    opacity: 1,
    visibility: true,
  },
  kabel_listrik: {
    id: "kabel-listrik",
    name: "Kabel Listrik",
    color: "#FFD700",
    opacity: 0.8,
    visibility: true,
  },
  kebun: {
    id: "kebun",
    name: "Kebun",
    color: "#32CD32",
    opacity: 0.7,
    visibility: true,
  },
  ladang: {
    id: "ladang",
    name: "Ladang",
    color: "#8B4513",
    opacity: 0.7,
    visibility: true,
  },
  pemukiman: {
    id: "pemukiman",
    name: "Pemukiman",
    color: "#D3D3D3",
    opacity: 0.8,
    visibility: true,
  },
  sawah: {
    id: "sawah",
    name: "Sawah",
    color: "#98FB98",
    opacity: 0.6,
    visibility: true,
  },
  semak_belukar: {
    id: "semak-belukar",
    name: "Semak Belukar",
    color: "#556B2F",
    opacity: 0.6,
    visibility: true,
  },
  sungai: {
    id: "sungai",
    name: "Sungai",
    color: "#1E90FF",
    opacity: 0.5,
    visibility: true,
  },
  tanaman_campur: {
    id: "tanaman-campur",
    name: "Tanaman Campur",
    color: "#6B8E23",
    opacity: 0.6,
    visibility: true,
  },
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
