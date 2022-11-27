import {useState, useEffect} from 'react'
import './Map.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import {advertisementAPI} from '../../api/api'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = (props) => {

    const [advertisements, setAdvertisements] = useState([]);
    const [position, setPosition] = useState([56.0468181, 92.915555]);

    let markers = advertisements.map( p =>  <Marker position={[p.latitude, p.longitude]}>
        <Popup>
            <b>Адрес: </b> {p.address} <br/> 
            <b>Площадь: </b> {p.area} м2 <br/> 
            <b>Этаж : </b> {p.floor} <br/> 
            <b>Количество этажей: </b> {p.floorNum} <br/> 
            <b>Тип дома: </b> {p.houseType} <br/>
            <b>Количество комнат: </b> {p.countOfRooms} <br/>
            <b>Цена: </b> {p.price} <br/>
            <b><a href={p.link}>Ссылка на объявление</a></b>
        </Popup>
    </Marker>)

    useEffect(()=>{
        getAdvertisements()
    }, [])

    let getAdvertisements = () => {
        advertisementAPI.getAdvertisementInfo()
            .then(response => {
                setAdvertisements(response.data);
            });
    }

    return (
        <div className='map_wrapper'>
            <MapContainer center={position} zoom={30} scrollWheelZoom={true} style={{margin: '10px', width: '1000px', height: '550px', zIndex: 0}}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
                
            </MapContainer>
        </div>
    );
}
//<MarkerClusterGroup>  </MarkerClusterGroup>
export default Map;