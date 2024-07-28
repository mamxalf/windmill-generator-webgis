'use client';

import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptilerweather from '@maptiler/weather';
import { baseMapConfig, temperaturConfigLayer, windConfigLayer } from '@/lib/option';
import { addGeojsonLayer } from '@/lib/coverEngine';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/map.css';
import useLayerStore from '../stores/layer';

export default function Map({ maptilerKey }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(13);
    maptilersdk.config.apiKey = maptilerKey;

    const legend = useLayerStore((state) => state.legend);
    const station = useLayerStore((state) => state.station);
    const mergeLayer = Object.assign({}, legend, station);

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
            for (const key in mergeLayer) {
                await addGeojsonLayer(map, mergeLayer, key);
            }
        });
    }, [zoom, mergeLayer]);

    useEffect(() => {
        // Update layers based on the visibility state
        if (map.current && map.current.isStyleLoaded()) {
            for (const key in mergeLayer) {
                addGeojsonLayer(map, mergeLayer, key);
            }
        }
    }, [mergeLayer]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
