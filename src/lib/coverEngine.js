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
