"use client";

import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import { baseMapConfig, temperaturConfigLayer, windConfigLayer } from '@/lib/option';
import { addGeojsonLayer, addHoverEffect, calculatePointAndCoordinates, popUpInfo, primaryLayer, timeSlider, windDirectionAndSpeed } from '@/lib/coverEngine';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";
import useLayerStore from "../stores/layer";

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
            ...baseMapConfig,
        });

        map.current.on("load", async () => {
            // primary layer
            primaryLayer(map.current)

            // primary cover
            for (const key in mergeLayer) {
                await addGeojsonLayer(map.current, mergeLayer, key);
            }

            // Add hover effect
            addHoverEffect(map.current, 'station-1', 'station-1', hoveredStateIdRef);

            // popUp
            popUpInfo(maptilersdk, map.current, 'station-1')

            // calculate point and coordinates
            calculatePointAndCoordinates(map.current)

            // wind direction and speed
            windDirectionAndSpeed(map.current)
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
