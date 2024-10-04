import { ChartData } from "chart.js";

const pi: number = Math.PI;
// Konstanta gas udara kering dalam J/(kg·K)
const R: number = 287.05;

/**
 * Menghitung daya listrik yang dihasilkan oleh turbin angin.
 * @param radius Jari-jari baling-baling turbin dalam meter.
 * @param windSpeed Kecepatan angin dalam meter per detik.
 * @param powerCoefficient Koefisien daya turbin (Cp).
 * @returns Daya listrik yang dihasilkan dalam Watt (W).
 */
export const calculateWindTurbinePower = (
  airDensity: number,
  radius: number,
  windSpeed: number,
  powerCoefficient: number
): number => {
  const sweptArea: number = pi * Math.pow(radius, 2);
  return (
    0.5 * airDensity * sweptArea * Math.pow(windSpeed, 3) * powerCoefficient
  );
};

/**
 * Mengkonversi tekanan udara dari hectoPascals (hPa) ke Pascals (Pa).
 * @param pressureHpa Tekanan udara dalam hectoPascals (hPa).
 * @returns Tekanan udara dalam Pascals (Pa).
 */
function convertPressureToPa(pressureHpa: number): number {
  return pressureHpa * 100;
}

/**
 * Mengkonversi temperatur dari derajat Celsius ke Kelvin.
 * @param temperatureCelsius Temperatur dalam derajat Celsius.
 * @returns Temperatur dalam Kelvin.
 */
function convertTemperatureToKelvin(temperatureCelsius: number): number {
  return temperatureCelsius + 273.15;
}

/**
 * Menghitung densitas udara.
 * @param pressureHpa Tekanan udara dalam hectoPascals (hPa).
 * @param temperatureCelsius Temperatur dalam derajat Celsius.
 * @returns Densitas udara dalam kg/m³.
 */
export const calculateAirDensity = (
  pressureHpa: number,
  temperatureCelsius: number
): number => {
  const pressurePa = convertPressureToPa(pressureHpa);
  const temperatureKelvin = convertTemperatureToKelvin(temperatureCelsius);
  return pressurePa / (R * temperatureKelvin);
};

/**
 * Mengkonversi kecepatan dari kilometer per jam (km/h) ke meter per detik (m/s).
 * @param speedKmh Kecepatan dalam km/h.
 * @returns Kecepatan dalam m/s.
 */
export const convertKmhToMs = (speedKmh: number): number => {
  return speedKmh * 0.27778;
};

/**
 * Menghitung rata-rata dari array angka.
 * @param numbers Array angka yang akan dihitung rata-ratanya.
 * @returns Rata-rata dari angka-angka dalam array.
 */
const calculateAverage = (numbers: number[]): number => {
  const total = numbers.reduce((sum, value) => sum + value, 0);
  return numbers.length > 0 ? total / numbers.length : 0;
};

/**
 * rubah data untuk chart
 */
export const transformData = (raw: WeatherData[]): ChartData<"line"> => {
  const data = groupDataByMonth(raw);
  const totalWattPerDay: number[] = Array(31).fill(0);
  const countPerDay: number[] = Array(31).fill(0);

  const datasets = data.map((item, index) => {
    const watt = item.data.map((entry, i) => {
      const airDensity = calculateAirDensity(entry.pres || 1010, entry.tavg);
      const windSpeed = convertKmhToMs(entry.wspd);
      const power =
        516 * calculateWindTurbinePower(airDensity, 10, windSpeed, 0.45);

      totalWattPerDay[i] += power;
      countPerDay[i] += 1;

      return power;
    });
    const color = colors[index % colors.length];

    return {
      label: getMonthName(item.month),
      data: watt,
      fill: false,
      backgroundColor: color.backgroundColor,
      borderColor: color.borderColor,
    };
  });

  // Calculate average watt per day
  const averageWattPerDay = totalWattPerDay.map((totalWatt, index) => {
    return countPerDay[index] > 0 ? totalWatt / countPerDay[index] : 0;
  });

  const avg = calculateAverage(averageWattPerDay);
  console.log("AVG", avg.toFixed(2));

  // You can now use `averageWattPerDay` for further analysis or display it in a chart.

  return {
    labels: Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`),
    datasets,
  };
};

interface WeatherData {
  date: string;
  tavg: number;
  tmin: number;
  tmax: number;
  prcp: number;
  snow: string;
  wdir: number;
  wspd: number;
  wpgt: string;
  pres: number;
  tsun: string;
}

export interface GroupedData {
  month: number;
  data: WeatherData[];
}

const groupDataByMonth = (data: WeatherData[]): GroupedData[] => {
  const groupedData = data.reduce(
    (acc: Record<number, WeatherData[]>, curr: WeatherData) => {
      const month = new Date(curr.date).getMonth() + 1; // getMonth() is zero-based

      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(curr);
      return acc;
    },
    {}
  );

  return Object.keys(groupedData).map((month) => ({
    month: parseInt(month),
    data: groupedData[parseInt(month)],
  }));
};

export const convertDateToMMDDYYYY = (data: WeatherData[]): WeatherData[] => {
  return data.map((item) => {
    const [day, month, year] = item.date.split("-");
    return {
      ...item,
      date: `${month}/${day}/${year}`,
    };
  });
};

const colors = [
  {
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgba(255, 99, 132, 0.2)",
  },
  {
    backgroundColor: "rgb(54, 162, 235)",
    borderColor: "rgba(54, 162, 235, 0.2)",
  },
  {
    backgroundColor: "rgb(255, 206, 86)",
    borderColor: "rgba(255, 206, 86, 0.2)",
  },
  {
    backgroundColor: "rgb(75, 192, 192)",
    borderColor: "rgba(75, 192, 192, 0.2)",
  },
  {
    backgroundColor: "rgb(153, 102, 255)",
    borderColor: "rgba(153, 102, 255, 0.2)",
  },
  {
    backgroundColor: "rgb(255, 159, 64)",
    borderColor: "rgba(255, 159, 64, 0.2)",
  },
  {
    backgroundColor: "rgb(199, 199, 199)",
    borderColor: "rgba(199, 199, 199, 0.2)",
  },
  {
    backgroundColor: "rgb(83, 102, 255)",
    borderColor: "rgba(83, 102, 255, 0.2)",
  },
  {
    backgroundColor: "rgb(255, 99, 99)",
    borderColor: "rgba(255, 99, 99, 0.2)",
  },
  {
    backgroundColor: "rgb(102, 255, 102)",
    borderColor: "rgba(102, 255, 102, 0.2)",
  },
];

const getMonthName = (monthNumber: number): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1];
};
