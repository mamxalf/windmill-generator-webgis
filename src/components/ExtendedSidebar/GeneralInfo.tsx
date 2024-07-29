import useInfoStore from "@/stores/info";

export default function GeneralInfo() {
    const generalInfo = useInfoStore((state) => state.data);
    return (
        <>
            <div className="h-full max-h-screen overflow-y-auto">
                <h1 className="font-semibold tracking-wide">General info </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Kabupaten Temanggung adalah sebuah wilayah kabupaten yang
                    terletak di Provinsi Jawa Tengah, Indonesia. Ibu kota
                    kabupaten ini terletak di Kecamatan Temanggung Kota.
                    Kabupaten Temanggung berbatasan dengan Kabupaten Kendal di
                    utara, Kabupaten Semarang di timur, Kabupaten Magelang di
                    selatan, serta Kabupaten Wonosobo di barat. Jumlah penduduk
                    Kabupaten ini per tahun 2022 mencapai 799.764 jiwa. Sebagian
                    besar wilayah Kabupaten Temanggung merupakan dataran tinggi
                    dan pegunungan, yakni bagian dari rangkaian Dataran Tinggi
                    Dieng. Selain karena potensi geografis dan topografinya
                    Temanggung memiliki kebutuhan daya listrik yang cukup besar.
                    Menurut data publikasi dari BPS Temanggung tahun 2023, tren
                    kebutuhan listrik selalu meningkat setiap tahunnya. Pada
                    tahun 2019, jumlah pengguna listrik adalah 221.265, kemudian
                    meningkat menjadi 228.137 pada tahun 2020. Pada tahun 2021,
                    jumlah pengguna mencapai 234.737, dan hingga bulan Desember
                    2023, jumlahnya adalah 247.229 pengguna. Kebutuhan listrik
                    di Kabupaten Temanggung pada tahun 2023 mencapai 260.890.550
                    kilowatt-hour, dengan rata-rata penggunaan daya sebesar
                    1.075,78 volt ampere
                </p>
            </div>
        </>
    );
}
