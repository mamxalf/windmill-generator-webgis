"use client";

import { useEffect, useState } from "react";
import { ChartData, ChartOptions } from "chart.js";
import { transformData } from "@/lib/formula";
import TableComponent from "@/components/Charts/Table";

interface GraphData {
    year: number;
    chartData: ChartData<"line">;
}

export default function ReportsTable() {
    const [data, setData] = useState<GraphData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (year: number): Promise<GraphData> => {
            try {
                const response = await fetch(`/data/meteostat-${year}.json`);
                const data = await response.json();
                return { year, chartData: transformData(data) };
            } catch (error) {
                console.error(`Failed to fetch data for ${year}`, error);
                return { year, chartData: { labels: [], datasets: [] } };
            }
        };

        const loadAllData = async () => {
            setLoading(true);
            const years = [2022, 2023, 2024];
            const results = await Promise.all(years.map(fetchData));
            setData(results);
            setLoading(false);
        };

        loadAllData();
    }, []);

    const options = (year: number): ChartOptions<"line"> => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: `Lighting Generated (watt) ${year}`,
                },
            },
        };
    };

    return (
        <div className="px-6">
            {loading ? (
                <p>Loading...</p>
            ) : (
                data.map(({ year, chartData }) => (
                    <div key={year}>
                        <div className="mt-10 mb-10 text-center">
                            <h2 className="mb-2 text-sm font-semibold">Table generated electricity for {year}</h2>
                            <TableComponent data={chartData} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
