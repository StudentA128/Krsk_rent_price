import React, {useState, useEffect} from 'react'
import {flatAPI} from '../../api/api'
import {
    Link
  } from "react-router-dom";
import './History.css'

const History = (props) => {

    const [flatInfo, setFlatInfo] = useState([]);

    let history = flatInfo.map( p => <tr><td>{p.address}</td><td>{p.area}</td><td>{p.floor}</td><td>{p.floorNum}</td><td>{p.houseType}</td><td>{p.countOfRooms}</td><td>{p.price}</td></tr> )
    
    useEffect(()=>{
        getFlatInfo()
    }, [])

    let getFlatInfo = () => {
        flatAPI.getFlatInfo()
        .then(response => {
          setFlatInfo(response.data);
        });
    } 

    return (
        <div>
            <b><center>История вычислений</center></b>
            <table border="1">
                <tr>
                    <th>Улица</th>
                    <th>Площадь</th>
                    <th>Этаж</th>
                    <th>Этажей в доме</th>
                    <th>Тип дома</th>
                    <th>Количество комнат</th>
                    <th>Прогнозируемая стоимость</th>
                </tr>
                {history}
            </table>
            <Link to={`/`}><button className='homeButton'>На главную</button></Link>
        </div>
    );
}

export default History;