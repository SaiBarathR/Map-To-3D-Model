import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ReactComponent as PrintIcon } from "../../icons/print.svg";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpYmFyYXRociIsImEiOiJjbGt2OW92b2kwM2Y0M2pueGYwazVjazM3In0.lR7Be6FsuuWiomVLWaNP0Q';

export default function CustomMapBoxRenderer({ renderImage }) {
    //to get the reference of map container
    const mapContainer = useRef(null);
    const map = useRef(null);
    //initializing map with longitude, latitude and zoom level
    const [lng, setLng] = useState(82.7553);
    const [lat, setLat] = useState(21.4542);
    const [zoom, setZoom] = useState(4.22);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        //creating map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        //saving location of map when user moves by adding longitude, latitude and zoom level
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
                color: 'blue'
            },
            mapboxgl: mapboxgl
        });
        //to add geocoder to search places
        map.current.addControl(geocoder);
        //to add navigation controls like zoom in and zoom out 
        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Top right toolbar
    function CustomMapBoxToolbar() {

        const handleClickPrint = () => {            
            const coordinates = [lng, lat]
            try {
                //mapbox api to get static image of map with selected coordinates and zoom level
                const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${coordinates},${zoom},0/400x400?access_token=${mapboxgl.accessToken}`;
                //returning image url to parent component to create a model
                renderImage(imageUrl)
            } catch (error) {
                console.log(error)
                renderImage('');
            }
        }

        return (
            <div className="mapbox-toolbar">
                <button className="mapbox-toolbar-button" onClick={handleClickPrint}> <PrintIcon /></button>
            </div>
        )
    }

    return (

        <div ref={mapContainer} className="map-container">
            <CustomMapBoxToolbar />
        </div>
    )
}