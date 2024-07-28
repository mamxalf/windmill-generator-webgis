// stores/info.ts
import { create } from "zustand";

interface Info {
    id: string;
    name: string;
    luas: string;
}

interface InfoState {
    data: Record<string, Info>;
}

const useStationStore = create<InfoState>((_set) => ({
    data: {
        alang_alang: {
            id: "alang-alang",
            name: "Alang Alang",
            luas: "#A8D08D",
        },
        bangunan: {
            id: "bangunan",
            name: "Bangunan",
            luas: "#FF6347",
        },
        hutan_kering: {
            id: "hutan-kering",
            name: "Hutan Kering",
            luas: "#228B22",
        },
        jalan_garis: {
            id: "jalan-garis",
            name: "Jalan (Garis)",
            luas: "#000000",
        },
        kabel_listrik: {
            id: "kabel-listrik",
            name: "Kabel Listrik",
            luas: "#FFD700",
        },
        kebun: {
            id: "kebun",
            name: "Kebun",
            luas: "#32CD32",
        },
        ladang: {
            id: "ladang",
            name: "Ladang",
            luas: "#8B4513",
        },
        pemukiman: {
            id: "pemukiman",
            name: "Pemukiman",
            luas: "#D3D3D3",
        },
        sawah: {
            id: "sawah",
            name: "Sawah",
            luas: "#98FB98",
        },
        semak_belukar: {
            id: "semak-belukar",
            name: "Semak Belukar",
            luas: "#556B2F",
        },
        sungai: {
            id: "sungai",
            name: "Sungai",
            luas: "#1E90FF",
        },
        tanaman_campur: {
            id: "tanaman-campur",
            name: "Tanaman Campur",
            luas: "#6B8E23",
        },
    }
}));

export default useStationStore;
