import { useEffect } from "react";

import UseInfoStore from "@/stores/info";
import useLayerStore from "@/stores/layer";

export default function CoverInfo() {
    const coverInfo = UseInfoStore((state) => state.data);
    const legend = useLayerStore((state1) => state1.legend);
    const updateInfoStore = UseInfoStore((state) => state.updateInfoStore);

    useEffect(() => {
        const getGeoJsonLayer = async (key: string): Promise<void> => {
            if (!updateInfoStore) {
                console.error("updateInfoStore function is not available");
                return;
            }

            try {
                // Fetch the GeoJSON data
                const response = await fetch(`/${key}.geojson`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${key}.geojson`);
                }
                const data = await response.json();

                // Type checking for GeoJSON data
                interface GeoJsonFeature {
                    properties: {
                        luas: number;
                    };
                }

                interface GeoJsonName {
                    name: string;
                }

                interface GeoJsonData {
                    features: GeoJsonFeature[];
                    name: GeoJsonName;
                }

                const typedData: GeoJsonData = data;

                let tempVal = 0;
                // Loop through all features and log the key and index
                for (let i = 0; i < typedData.features.length; i++) {
                    tempVal += parseFloat(
                        typedData.features[i].properties.luas.toString()
                    );
                }

                // Update State Info
                updateInfoStore({ id: typedData.name, value: tempVal });
            } catch (error) {
                console.error(
                    "Error fetching or processing GeoJSON data:",
                    error
                );
            }
        };

        if (legend) {
            for (const key in legend) {
                getGeoJsonLayer(key);
            }
        }
    }, [legend, updateInfoStore]);

    return (
        <>
            <div>
                <h1 className="font-semibold tracking-wide">Cover info </h1>
                <section className="mt-4">
                    <div className="flex flex-col justify-center">
                        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Legend
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Value
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {Object.keys(coverInfo).map((key) => (
                                            <tr
                                                className="mt-4"
                                                key={coverInfo[key].id}
                                            >
                                                <td className="p-2">
                                                    <div
                                                        style={{
                                                            background:
                                                                coverInfo[key]
                                                                    .hex,
                                                        }}
                                                        className="center relative inline-block select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
                                                    >
                                                        <div className="mt-px">
                                                            {
                                                                coverInfo[key]
                                                                    .name
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <h2 className="font-medium">
                                                        {coverInfo[key].luas
                                                            ? parseFloat(
                                                                coverInfo[key]
                                                                    .luas
                                                            ).toFixed(2)
                                                            : ""} ha
                                                    </h2>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
