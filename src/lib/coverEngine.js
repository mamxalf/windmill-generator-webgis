// lib/coverEngine.js
import * as maptilerweather from '@maptiler/weather';
import { temperaturConfigLayer, windConfigLayer } from '@/lib/option';


const temperatureLayer = new maptilerweather.TemperatureLayer(
    temperaturConfigLayer
);
const windLayer = new maptilerweather.WindLayer({
    colorramp: maptilerweather.ColorRamp.builtin.NULL,
    ...windConfigLayer,
});

export const primaryLayer = (map) => {
    map.setPaintProperty(
        "Water",
        "fill-color",
        "rgba(0, 0, 0, 0.6)"
    );
    map.addLayer(windLayer);
    map.addLayer(temperatureLayer, "Water");
}

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
            "visibility",
            legend[key].visibility ? "visible" : "none"
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

// docs: https://docs.maptiler.com/sdk-js/examples/weather-wind-direction/
export const windDirectionAndSpeed = (_map) => {
    const pointerDataDiv = document.getElementById("wind-speed");
    const timeTextDiv = document.getElementById("time-text");
    const timeSlider = document.getElementById("time-slider");

    const loc = {
        lng: 110.1125480670895,
        lat: -7.188414301412195
    }

    function refreshTime() {
        const d = windLayer.getAnimationTimeDate();
        timeTextDiv.innerText = d.toString();
        timeSlider.value = +d;

        const value = windLayer.pickAt(loc.lng, loc.lat);
        if (!value) {
            pointerDataDiv.innerText = "";
        } else {
            pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
        ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;
        }

    }

    timeSlider.addEventListener("input", (evt) => {
        windLayer.setAnimationTime(parseInt(timeSlider.value / 1000))
    })

    setTimeout(() => {
        const startDate = windLayer.getAnimationStartDate();
        const endDate = windLayer.getAnimationEndDate();
        const currentDate = windLayer.getAnimationTimeDate();

        timeSlider.min = +startDate;
        timeSlider.max = +endDate;
        timeSlider.value = +currentDate;

        const value = windLayer.pickAt(loc.lng, loc.lat);
        if (!value) {
            pointerDataDiv.innerText = "";
        }
        pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
        ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;

        const d = windLayer.getAnimationTimeDate();
        timeTextDiv.innerText = d.toString();

        windLayer.on("tick", event => {
            refreshTime();
        })

        // Called when the time is manually set
        windLayer.on("animationTimeSet", event => {
            refreshTime()
        })
    }, 1000);
}
