import React, {useState, useEffect} from 'react'
import {advertisementAPI} from '../../api/api'
import {
    Link
  } from "react-router-dom";

const Advertisements = (props) => {

    const [advertisementInfo, setAdvertisementInfo] = useState([]);

    let history = advertisementInfo.map( p => <tr><td>{p.address}</td><td>{p.area}</td><td>{p.floor}</td><td>{p.floorNum}</td><td>{p.houseType}</td><td>{p.countOfRooms}</td><td>{p.price}</td><td>{p.link}</td></tr> )
    
    useEffect(()=>{
        getFlatInfo()
    }, [])

    let getFlatInfo = () => {
        advertisementAPI.getAdvertisementInfo()
        .then(response => {
            setAdvertisementInfo(response.data);
        });
    } 

    return (
        <div>
            <b><center>База квартир</center></b>
            <table border="1">
                <tr>
                    <th>Улица</th>
                    <th>Площадь</th>
                    <th>Этаж</th>
                    <th>Этажей в доме</th>
                    <th>Тип дома</th>
                    <th>Количество комнат</th>
                    <th>Цена</th>
                    <th>Ссылка на объявление</th>
                </tr>
                {history}
            </table>
            <Link to={`/`}><button className='homeButton'>На главную</button></Link>
        </div>
    );
}

export default Advertisements;