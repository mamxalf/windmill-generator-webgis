// components/Map.tsx
'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/Map.module.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            // Fix Leaflet's default icon issue with Webpack
            // delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: markerIcon2x.src,
                iconUrl: markerIcon.src,
                shadowUrl: markerShadow.src,
            });

            const map = L.map(mapRef.current).setView([-7.3162162, 110.1729491], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([-7.3162162, 110.1729491]).addTo(map)
                .bindPopup('Temanggung udane Deres!')
                .openPopup();

            return () => {
                map.remove();
            };
        }
    }, []);

    return <div ref={mapRef} className={styles.map}></div>;
};

export default Map;
