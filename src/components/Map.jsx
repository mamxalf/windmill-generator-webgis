import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptilerweather from '@maptiler/weather';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const temanggung = { lng: 110.1752408, lat: -7.3161926 };
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = 'KOuuIHYHIa1Le2qGf39o';

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ,
            center: [temanggung.lng, temanggung.lat],
            zoom: zoom
        });

        const temperatureLayer = new maptilerweather.TemperatureLayer({
            opacity: 0.8,
        });

        const windLayer = new maptilerweather.WindLayer({
            id: "Wind Particles",
            colorramp: maptilerweather.ColorRamp.builtin.NULL,
            speed: 0.010,
            fadeFactor: 0.03,
            maxAmount: 256,
            density: 200,
            color: [0, 0, 0, 30],
            fastColor: [0, 0, 0, 100],
        });

        map.current.on('load', () => {
            map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.6)");
            map.current.addLayer(windLayer);
            map.current.addLayer(temperatureLayer, "Water");
        });

        new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([temanggung.lng, temanggung.lat])
            .addTo(map.current);
    }, [temanggung.lng, temanggung.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}