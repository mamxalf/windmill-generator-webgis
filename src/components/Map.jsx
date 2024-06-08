import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
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
            style: maptilersdk.MapStyle.DATAVIZm,
            center: [temanggung.lng, temanggung.lat],
            zoom: zoom
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