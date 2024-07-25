// lib/coverEngine.js
export const addGeojsonLayer = async (map, legend, key) => {
    // Check if the source already exists
    if (map.current.getSource(legend[key].id)) {
        // Update visibility only
        if (legend[key].visibility) {
            map.current.setLayoutProperty(
                legend[key].id,
                "visibility",
                "visible"
            );
        } else {
            map.current.setLayoutProperty(legend[key].id, "visibility", "none");
        }
    } else {
        // Fetch the geojson data
        const response = await fetch(`/${key}.geojson`);
        const data = await response.json();

        // Add source and layer
        map.current.addSource(legend[key].id, {
            type: "geojson",
            data: data,
        });
        map.current.addLayer({
            id: legend[key].id,
            type: "fill",
            source: legend[key].id,
            layout: {},
            paint: {
                "fill-color": legend[key].color,
                "fill-opacity": legend[key].opacity,
            },
        });

        // Set the visibility based on the legend item
        map.current.setLayoutProperty(
            legend[key].id,
            "visibility",
            legend[key].visibility ? "visible" : "none"
        );
    }
};
