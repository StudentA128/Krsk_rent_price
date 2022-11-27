import React, {useState} from 'react'
import {
    Link
  } from "react-router-dom";
import MapComponent from './MapComponent/MapComponent';
import './Address.css'
import { flatAPI } from '../../api/api'

const Address = (props) => {

    const [addressInput, setAddressInput] = useState('');
    const [coordinates, setCoordinates] = useState([56.0468181, 92.915555]);
    const [errorValue, setErrorValue] = useState(false)

    const onKeyPressHandler = (e) => {
        if (e.key == 'Enter') {
            setAddressInput(e.target.value)
            findAddress(e.target.value)
            console.log(coordinates)
        }
    }

    const findAddress = (address) => {
        flatAPI.checkAddress(address)
          .then(response => {
            if (response.data.length != 0){
               setCoordinates(response.data)
               setErrorValue(false)
            }
            else {
                console.log(errorValue)
                setErrorValue(true)
            }
          });
    }

    return (
        <div className='address_wrapper'>
            <div className='address'>
                {errorValue ? <div className='error_text'>Такой адрес не найден, попробуйте снова</div> : <></>}
                Введите адрес:
                <input type="text" name='address' onKeyUp={(e) => onKeyPressHandler(e)}></input>
            </div>
            <MapComponent inputedAddress={coordinates}/>
            <Link className='submitButton' style={errorValue || addressInput == '' ? {pointerEvents: "none"} : null} to={`/parameters?address=${addressInput}`}><button className='nextStepButton' style={errorValue || addressInput == '' ? {backgroundColor: 'gray'} : null} onClick={(e) => onKeyPressHandler(e)}>Следующий шаг</button></Link>
            
        </div>
    );
}

export default Address;