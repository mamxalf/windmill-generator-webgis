import { calculateTotalWide, calculateTotalWideByRemark, GeoJSONData } from "@/lib/calculateWide";
import { useEffect, useState } from "react";

export default function StationInfo() {
    const [totalWide, setTotalWide] = useState<number>(0);
    const [totalWideByRemark, setTotalWideByRemark] = useState<any>({});
    const [totalSafeZone, setTotalSafeZone] = useState<number>(0);
    const [totalRoadSafeZone, setTotalRoadSafeZone] = useState<number>(0);

    useEffect(() => {
        const fetchStationGeojson = async () => {
            try {
                const station1 = await fetch(`/station_1.geojson`);
                const dataStation1: GeoJSONData = await station1.json();

                const totalWideStation1 = await calculateTotalWide(dataStation1)
                setTotalWide(totalWideStation1);

                const totalWideByRemark = await calculateTotalWideByRemark(dataStation1)
                setTotalWideByRemark(totalWideByRemark)

                const safetyZone = await fetch(`/safety_zone.geojson`);
                const dataSafetyZone: GeoJSONData = await safetyZone.json();

                const totalWideSafetyZone = await calculateTotalWide(dataSafetyZone)
                setTotalSafeZone(totalWideSafetyZone);

                const roadSafetyZone = await fetch(`/road_safety_zone.geojson`);
                const dataRoadSafetyZone: GeoJSONData = await roadSafetyZone.json();

                // TODO: makesure again totalWideRoadSafetyZone data on qgis
                const totalWideRoadSafetyZone = await calculateTotalWide(dataRoadSafetyZone)
                setTotalRoadSafeZone(totalWideRoadSafetyZone);
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
                <h1>Total Wide : {totalWide} ha</h1>
                <h1>Total Wide (Safety Zone) : {totalSafeZone} ha</h1>
                <h1>Total Wide (Road Safety Zone) : {totalRoadSafeZone} ha</h1>
                <h2>Total Wide per Remark</h2>
                <ul>
                    {Object.keys(totalWideByRemark).map((key) => (
                        <li key={key}>
                            <h2>{key} : {totalWideByRemark[key].toFixed(2)} ha</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
