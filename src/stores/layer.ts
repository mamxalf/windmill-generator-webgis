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
    // jalan_garis: {
    //   id: "jalan-garis",
    //   name: "Jalan (Garis)",
    //   color: "#000000",
    //   opacity: 1,
    //   visibility: true,
    // },
    // kabel_listrik: {
    //   id: "kabel-listrik",
    //   name: "Kabel Listrik",
    //   color: "#FFD700",
    //   opacity: 0.8,
    //   visibility: true,
    // },
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
