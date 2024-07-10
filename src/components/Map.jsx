'use client'

import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptilerweather from '@maptiler/weather';
import { baseMapConfig, legend, temperaturConfigLayer, windConfigLayer } from '@/lib/option';
import { addGeojsonLayer } from '@/lib/coverEngine'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/map.css';

export default function Map({ maptilerKey }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = maptilerKey;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.SATELLITE,
            zoom: zoom,
            ...baseMapConfig
        });

        const temperatureLayer = new maptilerweather.TemperatureLayer(temperaturConfigLayer);

        const windLayer = new maptilerweather.WindLayer({
            colorramp: maptilerweather.ColorRamp.builtin.NULL,
            ...windConfigLayer
        });

        map.current.on('load', async () => {
            map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.6)");
            map.current.addLayer(windLayer);
            map.current.addLayer(temperatureLayer, "Water");

            // alang alang
            for (const key in legend) {
                await addGeojsonLayer(map, legend, key);
            }

        });
    }, [zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}