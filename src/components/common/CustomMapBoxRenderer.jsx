import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpYmFyYXRociIsImEiOiJjbGt2OW92b2kwM2Y0M2pueGYwazVjazM3In0.lR7Be6FsuuWiomVLWaNP0Q';

export default function CustomMapBoxRenderer(){
    const mapContainer = useRef(null);    
    const map = useRef(null);
    const [lng, setLng] = useState(82.7553);
    const [lat, setLat] = useState(21.4542);
    const [zoom, setZoom] = useState(4.22);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
                color: 'orange'
            },
            mapboxgl: mapboxgl
        });
        map.current.addControl(geocoder);

    }, []);

    return(
        <div ref={mapContainer} className="map-container" />
    )
}