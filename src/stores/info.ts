// stores/info.ts
import { create } from "zustand";

interface Info {
    id: string;
    name: string;
    luas: string;
    hex: string;
}
interface InfoState {
    data: Record<string, Info>;
    updateInfoStore: (data: any) => void;
}

const UseInfoStore = create<InfoState>((set) => ({
    data: {
        alang_alang: {
            id: "alang-alang",
            name: "Alang Alang",
            hex: "#A8D08D",
            luas: "",
        },
        bangunan: {
            id: "bangunan",
            name: "Bangunan",
            hex: "#FF6347",
            luas: "",
        },
        hutan_kering: {
            id: "hutan-kering",
            name: "Hutan Kering",
            hex: "#228B22",
            luas: "",
        },
        // jalan_garis: {
        //     id: "jalan-garis",
        //     name: "Jalan (Garis)",
        //     hex: "#000000",
        //     luas: "",
        // },
        // kabel_listrik: {
        //     id: "kabel-listrik",
        //     name: "Kabel Listrik",
        //     hex: "#FFD700",
        //     luas: "",
        // },
        kebun: {
            id: "kebun",
            name: "Kebun",
            hex: "#32CD32",
            luas: "",
        },
        ladang: {
            id: "ladang",
            name: "Ladang",
            hex: "#8B4513",
            luas: "",
        },
        pemukiman: {
            id: "pemukiman",
            name: "Pemukiman",
            hex: "#D3D3D3",
            luas: "",
        },
        sawah: {
            id: "sawah",
            name: "Sawah",
            hex: "#98FB98",
            luas: "",
        },
        semak_belukar: {
            id: "semak-belukar",
            name: "Semak Belukar",
            hex: "#556B2F",
            luas: "",
        },
        sungai: {
            id: "sungai",
            name: "Sungai",
            hex: "#1E90FF",
            luas: "",
        },
        tanaman_campur: {
            id: "tanaman-campur",
            name: "Tanaman Campur",
            hex: "#6B8E23",
            luas: "",
        },
    },
    updateInfoStore: (data) => {
        // Implement the function to update the store
        set((state) => ({
            ...state,
            data: {
                ...state.data,
                [data.id]: {
                    ...state.data[data.id],
                    luas: data.value,
                },
            },
        }));
    },
}));

export default UseInfoStore;
