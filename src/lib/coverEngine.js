// lib/coverEngine.js
export const addGeojsonLayer = async (map, legend, key) => {
    // Check if the source already exists
    if (map.getSource(legend[key].id)) {
        // Update visibility only
        if (legend[key].visibility) {
            map.setLayoutProperty(legend[key].id, 'visibility', 'visible');
        } else {
            map.setLayoutProperty(legend[key].id, 'visibility', 'none');
        }
    } else {

        // Add source and layer
        map.addSource(legend[key].id, {
            type: 'geojson',
            data: `/${key}.geojson`
        });
        if (legend[key].id === 'station-1') {
            map.addLayer({
                'id': legend[key].id,
                'type': 'fill',
                'source': legend[key].id,
                'layout': {},
                'paint': {
                    'fill-color': legend[key].color,
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }
            });
        } else {
            map.addLayer({
                'id': legend[key].id,
                'type': 'fill',
                'source': legend[key].id,
                'layout': {},
                'paint': {
                    'fill-color': legend[key].color,
                    'fill-opacity': legend[key].opacity
                }
            });
        }

        // Set the visibility based on the legend item
        map.setLayoutProperty(
            legend[key].id,
            'visibility',
            legend[key].visibility ? 'visible' : 'none'
        );
    }
};

export const addHoverEffect = (map, sourceId, layerId, hoveredStateIdRef) => {
    map.on('mousemove', layerId, (e) => {
        if (e.features.length > 0) {
            if (hoveredStateIdRef.current !== null) {
                map.setFeatureState(
                    { source: sourceId, id: hoveredStateIdRef.current },
                    { hover: false }
                );
            }
            hoveredStateIdRef.current = e.features[0].id;
            map.setFeatureState(
                { source: sourceId, id: hoveredStateIdRef.current },
                { hover: true }
            );
        }
    });

    map.on('mouseleave', layerId, () => {
        if (hoveredStateIdRef.current !== null) {
            map.setFeatureState(
                { source: sourceId, id: hoveredStateIdRef.current },
                { hover: false }
            );
        }
        hoveredStateIdRef.current = null;
    });
}

export const popUpInfo = (mapSdk, map, layerId) => {
    map.on('click', layerId, (e) => {
        const properties = e.features[0].properties
        new mapSdk.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`name: ${properties.name} | remark: ${properties.REMARK} | luas: ${properties.luas} ha`)
            .addTo(map);
    });
}

export const calculatePointAndCoordinates = (map) => {
    // Calculate point and lat/lng
    map.on('mousemove', (e) => {
        document.getElementById('x-point').textContent = e.point.x;
        document.getElementById('y-point').textContent = e.point.y;
        document.getElementById('lat-point').textContent = e.lngLat.lat;
        document.getElementById('lng-point').textContent = e.lngLat.lng;
    });
}