"use client";

import { useEffect, useState } from 'react';
import ChartComponent from '../../../components/Charts/Line';
import { ChartData, ChartOptions } from 'chart.js';
import { convertDateToMMDDYYYY, transformData } from '@/lib/formula';

interface GraphData {
    year: number;
    chartData: ChartData<"line">;
}

export default function ReportsChart() {
    const [dataMeteostat, setDataMeteostat] = useState<GraphData[]>([]);
    const [dataBMKG, setDataBMKG] = useState<GraphData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (year: number, source: "meteostat" | "bmkg"): Promise<GraphData> => {
        const url = `/data/${source}-${year}.json`;
        try {
            const response = await fetch(url);
            let data = await response.json();
            if (source === "bmkg") {
                data = convertDateToMMDDYYYY(data);
            }
            return { year, chartData: transformData(data) };
        } catch (error) {
            console.error(`Failed to fetch data for ${year} from ${source}`, error);
            return { year, chartData: { labels: [], datasets: [] } };
        }
    };

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            const years = [2022, 2023, 2024];
            const [resultsMeteostat, resultsBMKG] = await Promise.all([
                Promise.allSettled(years.map((year) => fetchData(year, "meteostat"))),
                Promise.allSettled(years.map((year) => fetchData(year, "bmkg"))),
            ]);

            setDataMeteostat(
                resultsMeteostat
                    .filter((result): result is PromiseFulfilledResult<GraphData> => result.status === "fulfilled")
                    .map((result) => result.value)
            );
            setDataBMKG(
                resultsBMKG
                    .filter((result): result is PromiseFulfilledResult<GraphData> => result.status === "fulfilled")
                    .map((result) => result.value)
            );
            setLoading(false);
        };

        loadAllData();
    }, []);

    const options = (year: number): ChartOptions<'line'> => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Lighting Generated (watt) ${year}`,
                },
            },
        }
    };

    const DataSection = ({ title, data }: { title: string; data: GraphData[] }) => (
        <div>
            <h1>{title}</h1>
            {data.map(({ year, chartData }) => (
                <div key={year}>
                    <div className="mt-10 mb-10 text-center">
                        <h2 className="mb-2 text-sm font-semibold">Table generated electricity for {year}</h2>
                        <ChartComponent data={chartData} options={options(year)} />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='px-6'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <DataSection title="Data Meteostat" data={dataMeteostat} />
                    <DataSection title="Data BMKG" data={dataBMKG} />
                </>
            )}
        </div>
    );
}
