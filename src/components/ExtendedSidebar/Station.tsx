import {
    calculateTotalWide,
    calculateTotalWideByRemark,
    GeoJSONData,
} from "@/lib/calculateWide";
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

                const totalWideStation1 = await calculateTotalWide(
                    dataStation1
                );
                setTotalWide(totalWideStation1);

                const totalWideByRemark = await calculateTotalWideByRemark(
                    dataStation1
                );
                setTotalWideByRemark(totalWideByRemark);

                const safetyZone = await fetch(`/safety_zone.geojson`);
                const dataSafetyZone: GeoJSONData = await safetyZone.json();

                const totalWideSafetyZone = await calculateTotalWide(
                    dataSafetyZone
                );
                setTotalSafeZone(totalWideSafetyZone);

                const roadSafetyZone = await fetch(`/road_safety_zone.geojson`);
                const dataRoadSafetyZone: GeoJSONData =
                    await roadSafetyZone.json();

                // TODO: makesure again totalWideRoadSafetyZone data on qgis
                const totalWideRoadSafetyZone = await calculateTotalWide(
                    dataRoadSafetyZone
                );
                setTotalRoadSafeZone(totalWideRoadSafetyZone);
            } catch (error) {
                console.error("Error fetching the station geojson:", error);
            }
        };

        fetchStationGeojson();
    }, []);

    return (
        <>
            <h1 className="font-semibold tracking-wide">Station info </h1>
            <div className="mt-4 w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold text-gray-400 bg-gray-50">
                            <tr>
                                <th
                                    colSpan={2}
                                    className="p-2 whitespace-nowrap"
                                >
                                    <div className="font-semibold text-center">
                                        
                                        <h2 className="font-semibold text-lg">Station #1</h2>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            <tr className="mt-4">
                                <td className="p-2">
                                    <h2 className="font-medium">Total wide</h2>
                                </td>
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        {totalWide} ha
                                    </h2>
                                </td>
                            </tr>
                            <tr className="mt-4">
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        Total wide (Safety Zone)
                                    </h2>
                                </td>
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        {totalSafeZone} ha
                                    </h2>
                                </td>
                            </tr>
                            <tr className="mt-4">
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        Total wide (Road Safety Zone)
                                    </h2>
                                </td>
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        {totalRoadSafeZone} ha
                                    </h2>
                                </td>
                            </tr>
                            <tr className="mt-4">
                                <td className="p-2">
                                    <h2 className="font-medium">
                                        Total Wide per Remark
                                    </h2>
                                </td>
                                <td className="p-2"></td>
                            </tr>

                            {Object.keys(totalWideByRemark).map((key) => (
                                <tr key={key}>
                                    <td className="p-2 indent-6">{key}</td>
                                    <td className="p-2">
                                        <h2 className="font-medium text-sm">
                                            {totalWideByRemark[key].toFixed(2)}{" "}
                                            ha
                                        </h2>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
