import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpYmFyYXRociIsImEiOiJjbGt2OW92b2kwM2Y0M2pueGYwazVjazM3In0.lR7Be6FsuuWiomVLWaNP0Q';

export default function CustomMapBoxRenderer({ renderImage }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(82.7553);
    const [lat, setLat] = useState(21.4542);
    const [zoom, setZoom] = useState(4.22);
    const [bounds, setBounds] = useState(null);

    const handleClickPrint = () => {
        if (bounds) {
            const coordinates = [lng, lat]
            const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${coordinates},${zoom},0/400x400?access_token=${mapboxgl.accessToken}`;
            return imageUrl;
        }
    }

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
            setBounds(map.current.getBounds());
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
                color: 'orange'
            },
            mapboxgl: mapboxgl
        });
        map.current.addControl(geocoder);
        map.current.addControl(new mapboxgl.NavigationControl());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div ref={mapContainer} className="map-container" />
    )
}