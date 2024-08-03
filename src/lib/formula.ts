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
