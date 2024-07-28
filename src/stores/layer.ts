// stores/layerStore.ts
import { create } from "zustand";

interface LegendItem {
  id: string;
  name: string;
  color: string;
  opacity: number;
  visibility: boolean;
}

interface LegendState {
  legend: Record<string, LegendItem>;
  toggleVisibility: (itemId: string) => void;
}

const useLayerStore = create<LegendState>((set) => ({
  legend: {
    alang_alang: {
      id: "alang-alang",
      name: "Alang Alang",
      color: "#A8D08D",
      opacity: 0.7,
      visibility: false,
    },
    bangunan: {
      id: "bangunan",
      name: "Bangunan",
      color: "#FF6347",
      opacity: 0.9,
      visibility: false,
    },
    hutan_kering: {
      id: "hutan-kering",
      name: "Hutan Kering",
      color: "#228B22",
      opacity: 0.6,
      visibility: false,
    },
    // jalan_garis: {
    //   id: "jalan-garis",
    //   name: "Jalan (Garis)",
    //   color: "#000000",
    //   opacity: 1,
    //   visibility: false,
    // },
    // kabel_listrik: {
    //   id: "kabel-listrik",
    //   name: "Kabel Listrik",
    //   color: "#FFD700",
    //   opacity: 0.8,
    //   visibility: false,
    // },
    kebun: {
      id: "kebun",
      name: "Kebun",
      color: "#32CD32",
      opacity: 0.7,
      visibility: false,
    },
    ladang: {
      id: "ladang",
      name: "Ladang",
      color: "#8B4513",
      opacity: 0.7,
      visibility: false,
    },
    pemukiman: {
      id: "pemukiman",
      name: "Pemukiman",
      color: "#D3D3D3",
      opacity: 0.8,
      visibility: false,
    },
    sawah: {
      id: "sawah",
      name: "Sawah",
      color: "#98FB98",
      opacity: 0.6,
      visibility: false,
    },
    semak_belukar: {
      id: "semak-belukar",
      name: "Semak Belukar",
      color: "#556B2F",
      opacity: 0.6,
      visibility: false,
    },
    sungai: {
      id: "sungai",
      name: "Sungai",
      color: "#1E90FF",
      opacity: 0.5,
      visibility: false,
    },
    tanaman_campur: {
      id: "tanaman-campur",
      name: "Tanaman Campur",
      color: "#6B8E23",
      opacity: 0.6,
      visibility: false,
    },
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
    }
  },
  toggleVisibility: (itemId) =>
    set((state) => {
      const item = state.legend[itemId];
      if (item) {
        return {
          legend: {
            ...state.legend,
            [itemId]: {
              ...state.legend[itemId],
              visibility: !state.legend[itemId].visibility,
            },
          },
        };
      } else {
        console.warn(`Item with id "${itemId}" not found.`);
        return state;
      }
    }),
}));

export default useLayerStore;
