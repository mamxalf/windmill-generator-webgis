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
    const hoveredStateIdRef = useRef(null);
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
                await addGeojsonLayer(map.current, mergeLayer, key);
            }
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.current.on('mousemove', 'station-1', (e) => {
            if (e.features.length > 0) {
                if (hoveredStateIdRef.current !== null) {
                    map.current.setFeatureState(
                        { source: 'station-1', id: hoveredStateIdRef.current },
                        { hover: false }
                    );
                }
                hoveredStateIdRef.current = e.features[0].id;
                map.current.setFeatureState(
                    { source: 'station-1', id: hoveredStateIdRef.current },
                    { hover: true }
                );
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.current.on('mouseleave', 'station-1', () => {
            if (hoveredStateIdRef.current !== null) {
                map.current.setFeatureState(
                    { source: 'station-1', id: hoveredStateIdRef.current },
                    { hover: false }
                );
            }
            hoveredStateIdRef.current = null;
        });

        // Calculate point and lat/lng
        map.current.on('mousemove', (e) => {
            document.getElementById('x-point').textContent = e.point.x;
            document.getElementById('y-point').textContent = e.point.y;
            document.getElementById('lat-point').textContent = e.lngLat.lat;
            document.getElementById('lng-point').textContent = e.lngLat.lng;
        });
    }, [zoom, mergeLayer]);

    useEffect(() => {
        // Update layers based on the visibility state
        if (map.current && map.current.isStyleLoaded()) {
            for (const key in mergeLayer) {
                addGeojsonLayer(map.current, mergeLayer, key);
            }
        }
    }, [mergeLayer]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
