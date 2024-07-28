import useInfoStore from "@/stores/info";
import { useEffect, useState } from "react";

interface FeatureProperties {
    id: number;
    name: string;
    luas: number;
    [key: string]: any; // To allow additional properties
}

interface Feature {
    type: string;
    id: number;
    properties: FeatureProperties;
    geometry: {
        type: string;
        coordinates: any[];
    };
}

interface GeoJSONData {
    type: string;
    name: string;
    crs: {
        type: string;
        properties: {
            name: string;
        };
    };
    features: Feature[];
}

export default function StationInfo() {
    const [_stationGeojson, setStationGeojson] = useState<GeoJSONData | null>(null);
    const [totalLuas, setTotalLuas] = useState<number>(0);
    const [totalLuasByRemark, setTotalLuasByRemark] = useState<any>({});
    const generalInfo = useInfoStore((state) => state.data);

    useEffect(() => {
        const fetchStationGeojson = async () => {
            try {
                const response = await fetch(`/station_1.geojson`);
                const data: GeoJSONData = await response.json();
                setStationGeojson(data);

                const totalLuas = data.features.reduce((sum, feature) => {
                    return sum + (feature.properties.luas || 0);
                }, 0);
                setTotalLuas(totalLuas);

                const totalLuasByRemark = data.features.reduce((acc, feature) => {
                    const remark = feature.properties.REMARK;
                    const luas = feature.properties.luas || 0;

                    // @ts-expect-error
                    if (!acc[remark]) {
                        // @ts-expect-error
                        acc[remark] = 0;
                    }
                    // @ts-expect-error
                    acc[remark] += luas;

                    return acc;
                }, {});
                console.log('totalLuasByRemark', JSON.stringify(totalLuasByRemark));

                setTotalLuasByRemark(totalLuasByRemark)
            } catch (error) {
                console.error("Error fetching the station geojson:", error);
            }
        };

        fetchStationGeojson();
    }, []);

    return (
        <>
            <div>
                <h1>Station #1 Info</h1>
                <h1>Total Luas : {totalLuas} ha</h1>
                <h2>Total Luas per Remark</h2>
                <ul>
                    {Object.keys(totalLuasByRemark).map((key) => (
                        <li key={key}>
                            <h2>{key} : {totalLuasByRemark[key].toFixed(2)} ha</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
