import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { useMapEvent } from 'react-leaflet/hooks'
import {useState} from 'react'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
require('react-leaflet-markercluster/dist/styles.min.css');

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = (props) => {
    const [position, setPosition] = useState(props.inputedAddress);

    let mark = <Marker position={position}></Marker>

    const ChangeCenter = () => {
        const map = useMapEvent('click', () => {})
        setPosition(props.inputedAddress)
        map.flyTo(props.inputedAddress, 18)
        return null
    }
    
    return (
        <div className='map_container'>
            <MapContainer center={position} zoom={30} scrollWheelZoom={true} style={{width: '900px', height: '400px', zIndex: 0}}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeCenter/>
                {mark}
            </MapContainer>
        </div>
      )
}



export default MapComponent;