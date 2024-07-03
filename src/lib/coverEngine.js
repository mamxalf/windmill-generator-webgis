export const addGeojsonLayer = async (map, legend, key) => {
    const response = await fetch(`/${key}.geojson`);
    const data = await response.json();
    map.current.addSource(legend[key].id, {
        type: 'geojson',
        data: data
    });
    map.current.addLayer({
        'id': legend[key].id,
        'type': 'fill',
        'source': legend[key].id,
        'layout': {},
        'paint': {
            'fill-color': legend[key].color,
            'fill-opacity': legend[key].opacity
        }
    });
};