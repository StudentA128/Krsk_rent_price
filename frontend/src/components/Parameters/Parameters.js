import React, {useState} from 'react'
import {flatAPI} from '../../api/api'
import {
    Link,
    useSearchParams
  } from "react-router-dom";
import './Parameters.css'


const Parameters = (props) => {

    const [addressParm, setSearchAddressParam] = useSearchParams();
    const [inputArea, setInputArea] = useState('');
    const [inputFloor, setInputFloor] = useState(null);
    const [inputNumFloor, setInputNumFloor] = useState('');
    const [inputHouseType, setInputHouseType] = useState(0);
    const [inputCountOfRooms, setCountOfRooms] = useState(0);
    const [inputRepair, setRepair] = useState(0);
    const [inputDistrict, setDistrict] = useState(0);
    const [position, setPosition] = useState([56.0468181, 92.915555]);


    const [errorText, setErrorText] = useState('');

    const [areaError, setAreaError] = useState(false);
    const [floorError, setFloorError] = useState(false);
    const [floorNumError, setFloorNumError] = useState(false);
    const [floorsError, setFloorsError] = useState(false);

    let setParameters = (address, area, floor, floorNum, houseType, countOfRooms, latitude, longitude, repair, district) => {
        flatAPI.addParameters(address, area, floor, floorNum, houseType, countOfRooms, latitude, longitude, repair, district)
          .then(response => {
            if (response.data.resultCode === 0) {
              console.log(address, area, floor, floorNum, houseType, countOfRooms, latitude, longitude, repair, district);
            }
          });
      }

    const findAddress = (address) => {
        flatAPI.checkAddress(address)
          .then(response => {
            if (response.data != []){
                setPosition(response.data)
            }
          });
    }

    const areaCheck = (e) => {
        setInputArea(e.target.value)
        if ((e.target.value > 150) || (e.target.value < 5)) {
            setAreaError(false)
            setErrorText('Площадь должна быть от 5 до 150 кв. м.')
        }
        else {
            setAreaError(true)
        }
    }

    const floorCheck = (e) => {
        setInputFloor(e.target.value)
        if ((Number(e.target.value) < 1) || (Number(e.target.value) > 30)) {
            setErrorText('Номер этажа должен быть от 1 до 30')
            setFloorError(false)
        }
        else if (Number(e.target.value) > Number(inputNumFloor)){
            setErrorText('Номер этажа не должен быть больше общего количества этажей')
            setFloorError(true)
            setFloorsError(false)
        }
        else {
            setFloorError(true)
            setFloorsError(true)
        }
    }

    const floorNumCheck = (e) => {
        setInputNumFloor(e.target.value)
        if ((Number(e.target.value) < 1) || (Number(e.target.value) > 30)) {
            setErrorText('Количество этажей в доме должно быть от 1 до 30')
            setFloorNumError(false)
        }
        else if (Number(inputFloor) > Number(e.target.value)){
            setErrorText('Номер этажа не должен быть больше общего количества этажей')
            setFloorNumError(true)
            setFloorsError(false)
        }
        else {
            setFloorsError(true)
            setFloorNumError(true)
        }
    }

    const floorsCheck = () => {
        
    }

    const checkErrors = () => {
        let errors = !(areaError && floorError && floorNumError && floorsError)
        return errors
    }

    return (
        <div>
        <center>Введите все необходимые для рачета параметры</center>
        <div className='wrapper'>
           
            <div className='area'>
                <p>Площадь:</p>
                <input type="number" placeholder='Площадь квартиры' onChange={(e) => areaCheck(e)}></input>
            </div>
            
            <div className='floor'>
                <p>Этаж:</p>
                <input type="number" placeholder='Этаж' onChange={(e) => {floorCheck(e); floorsCheck()}}></input>
            </div>
            <div className='numFloor'>
                <p>Этажей в доме:</p>
                <input type="number" placeholder='Этажей в доме' onChange={(e) => {floorNumCheck(e); floorsCheck()}}></input>
            </div>
            <div className='houseType'>
                <p>Тип дома:</p>
                    <select onChange={(e) => setInputHouseType(e.target.selectedIndex)}>
                        <option>Кирпичный</option>
                        <option>Монолитно-кирпичный</option>
                        <option>Монолитный</option>
                        <option>Панельный</option>
                    </select>
            </div>
            
            <div className='countOfRooms'>
            <p>Количество комнат:</p>
                <select onChange={(e) => {console.log(e.target.value); setCountOfRooms(e.target.selectedIndex)}}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>Студия</option>
                </select>
            </div>
            <div className='repair'>
            <p>Ремонт:</p>
                <select onChange={(e) => {console.log(e.target.value); setRepair(e.target.selectedIndex)}}>
                    <option>Дизайнерский</option>
                    <option>Евроремонт</option>
                    <option>Косметический</option>
                </select>
            </div>
            <div className='district'>
            <p>Район:</p>
                <select onChange={(e) => {console.log(e.target.value); setDistrict(e.target.selectedIndex)}}>
                    <option>Железнодорожный</option>
                    <option>Кировский</option>
                    <option>Ленинский</option>
                    <option>Октябрьский</option>
                    <option>Свердловский</option>
                    <option>Советский</option>
                    <option>Центральный</option>
                </select>
            </div>
            <div className='submitButton'>
                {areaError || floorError || floorNumError || floorsError ? <div className='error_text'>{errorText}</div> : <></>}
                <Link style={checkErrors() ? {pointerEvents: "none"} : null} to={`/price`}><p><button style={checkErrors() ? {backgroundColor: 'gray'} : null}  onClick={() => {setParameters(addressParm.get('address'), 
                                                                                                 inputArea, 
                                                                                                 inputFloor, 
                                                                                                 inputNumFloor, 
                                                                                                 inputHouseType, 
                                                                                                 inputCountOfRooms,
                                                                                                 position[0],
                                                                                                 position[1],
                                                                                                 inputRepair,
                                                                                                 inputDistrict, 
                                                                                                 )}} >Расчет стоимости</button></p></Link>
            </div>
        </div>
        </div>
    );
}


export default Parameters;