'use client';

import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptilerweather from '@maptiler/weather';
import { baseMapConfig, station1, temperaturConfigLayer, windConfigLayer } from '@/lib/option';
import { addGeojsonLayer } from '@/lib/coverEngine';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/map.css';
import useLayerStore from '../stores/layer';

export default function Map({ maptilerKey }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = 'KOuuIHYHIa1Le2qGf39o';

    const legend = useLayerStore((state) => state.legend);

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once

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

            // primary cover
            for (const key in legend) {
                await addGeojsonLayer(map, legend, key);
            }

            // station 1
            for (const key in station1) {
                await addGeojsonLayer(map, station1, key);
            }
        });
    }, [zoom, legend]);

    useEffect(() => {
        // Update layers based on the visibility state
        if (map.current && map.current.isStyleLoaded()) {
            for (const key in legend) {
                addGeojsonLayer(map, legend, key);
            }
        }
    }, [legend]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
