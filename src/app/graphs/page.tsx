"use client";

import { useEffect, useState } from 'react';
import ChartComponent from '../../components/Charts/Example'
import { ChartData, ChartOptions } from 'chart.js';
import { transformData } from '@/lib/formula';

export default function Graph() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/meteostat-2024.json');
            const data = await response.json();
            setData(transformData(data));
        };

        fetchData();
    }, []);

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Lighting Generated (watt) 2024',
            },
        },
    };

    return (
        <>
            <div>
                {data ? <ChartComponent data={data} options={options} /> : 'Loading...'}
            </div>
        </>
    );
}
