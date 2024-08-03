import { ChartData } from "chart.js";

const TableComponent = ({ data }: { data: ChartData<"line"> }) => {
    // Generate day labels
    const dayLabels = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

    // Type guard to check if a value is a number
    const isNumber = (value: any): value is number => typeof value === "number";

    return (
        <section className="mt-4">
            <div className="flex flex-col justify-center">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">Day</th>
                                    {data.datasets.map((dataset, index) => (
                                        <th className="p-2 whitespace-nowrap" key={index}>
                                            <div className="font-semibold text-left">
                                                {dataset.label}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {dayLabels.map((day, dayIndex) => (
                                    <tr key={dayIndex}>
                                        <td className="p-2">
                                            <div className="font-semibold text-left">
                                                {day}
                                            </div>
                                        </td>
                                        {data.datasets.map((dataset, monthIndex) => (
                                            <td className="p-2" key={monthIndex}>
                                                <div className="text-left">
                                                    {isNumber(dataset.data[dayIndex])
                                                        ? `${dataset.data[dayIndex].toFixed(2)} watt`
                                                        : '-'}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TableComponent;
