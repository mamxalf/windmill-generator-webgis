// components/ChartComponent.js
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = ({ data, options }: { data: ChartData<'line'>, options: ChartOptions<'line'> }) => {
    return <Line data={data} options={options} />;
};

export default ChartComponent;
