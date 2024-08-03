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
export const windDirectionAndSpeed = (_map, layer) => {
    const pointerDataDiv = document.getElementById("wind-speed");
    const timeInfoContainer = document.getElementById("time-info");
    const timeTextDiv = document.getElementById("time-text");
    const timeSlider = document.getElementById("time-slider");

    const loc = {
        lng: 110.1125480670895,
        lat: -7.188414301412195
    }

    function refreshTime() {
        const d = layer.getAnimationTimeDate();
        timeTextDiv.innerText = d.toString();
        timeSlider.value = +d;

        const value = layer.pickAt(loc.lng, loc.lat);
        if (!value) {
            pointerDataDiv.innerText = "";
        } else {
            pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
        ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;
        }

    }

    timeSlider.addEventListener("input", (evt) => {
        layer.setAnimationTime(parseInt(timeSlider.value / 1000))
    })

    setTimeout(() => {
        const startDate = layer.getAnimationStartDate();
        const endDate = layer.getAnimationEndDate();
        const currentDate = layer.getAnimationTimeDate();

        timeSlider.min = +startDate;
        timeSlider.max = +endDate;
        timeSlider.value = +currentDate;

        const value = layer.pickAt(loc.lng, loc.lat);
        if (!value) {
            pointerDataDiv.innerText = "";
        }
        pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
        ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;

        const d = layer.getAnimationTimeDate();
        timeTextDiv.innerText = d.toString();

        layer.on("tick", event => {
            refreshTime();
        })

        // Called when the time is manually set
        layer.on("animationTimeSet", event => {
            refreshTime()
        })
    }, 1000);
}

// export const windDirectionAndSpeed = (_map, layer) => {
//     const startDate = new Date('2024-07-01T00:00:00Z');
//     const endDate = new Date('2024-08-01T00:00:00Z');
//     const currentDate = new Date();

//     const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
//     const currentDays = Math.round((currentDate - startDate) / (1000 * 60 * 60 * 24));

//     const pointerDataDiv = document.getElementById("wind-speed");
//     // const timeInfoContainer = document.getElementById("time-info");
//     const timeTextDiv = document.getElementById("time-text");
//     const timeSlider = document.getElementById("time-slider");

//     const loc = {
//         lng: 110.1125480670895,
//         lat: -7.188414301412195
//     }

//     function refreshTime() {
//         const d = layer.getAnimationTimeDate();
//         timeTextDiv.innerText = d.toString();
//         timeSlider.value = +d;

//         const value = layer.pickAt(loc.lng, loc.lat);
//         if (!value) {
//             pointerDataDiv.innerText = "";
//         } else {
//             pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
//         ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;
//         }

//     }

//     function updateSelectedDateAndAnimation(sliderValue) {
//         const selectedDate = new Date(startDate.getTime() + sliderValue * 24 * 60 * 60 * 1000);
//         // Set the layer animation time
//         layer.setAnimationTime(Math.floor(selectedDate.getTime() / 1000));
//     }

//     timeSlider.addEventListener("input", (event) => {
//         const sliderValue = parseInt(event.target.value, 10);
//         updateSelectedDateAndAnimation(sliderValue);
//     });

//     setTimeout(() => {
//         timeSlider.min = 0;
//         timeSlider.max = totalDays;
//         timeSlider.value = currentDays;

//         // Initialize the displayed date and animation time
//         updateSelectedDateAndAnimation(timeSlider.value);

//         const value = layer.pickAt(loc.lng, loc.lat);
//         if (!value) {
//             pointerDataDiv.innerText = "";
//         }
//         pointerDataDiv.innerHTML = `<div id="arrow" style="transform: rotate(${value.directionAngle}deg);">↑</div>
//         ${value.compassDirection} ${value.speedKilometersPerHour.toFixed(1)} km/h`;

//         const d = layer.getAnimationTimeDate();
//         timeTextDiv.innerText = d.toString();

//         layer.on("tick", event => {
//             refreshTime();
//         })

//         // Called when the time is manually set
//         layer.on("animationTimeSet", event => {
//             refreshTime()
//         })
//     }, 1000);
// }
