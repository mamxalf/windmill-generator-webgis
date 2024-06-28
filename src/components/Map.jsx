'use client'

import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptilerweather from '@maptiler/weather';
import * as MaplibreLegendControl from "@watergis/maplibre-gl-legend";
import { baseMapConfig, mapLibreConfig, mapPoint, temperaturConfigLayer, windConfigLayer } from '@/lib/option';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '@watergis/maplibre-gl-legend/dist/maplibre-gl-legend.css';
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
            style: maptilersdk.MapStyle.OPENSTREETMAP,
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

            // EXAMPLE GEOJSON Implementation
            const mockGeojson = await fetch('/api/dummy');
            const buildJsonMockGeojson = await mockGeojson.json()
            // if (!mockGeojson.ok) {
            //     throw new Error('Network response was not ok');
            // }
            map.current.addSource('mock_polygon', {
                type: 'geojson',
                data: buildJsonMockGeojson.data.geojson
            });
            map.current.addLayer({
                'id': 'mock_polygon',
                'type': 'fill',
                'source': 'mock_polygon',
                'layout': {},
                'paint': {
                    'fill-color': '#98b',
                    'fill-opacity': 0.8
                }
            });

            map.current.addControl(new MaplibreLegendControl.MaplibreLegendControl(mapLibreConfig.targets, mapLibreConfig.options), "bottom-right");
        });

        new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([mapPoint.lng, mapPoint.lat])
            .addTo(map.current);
    }, [zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}