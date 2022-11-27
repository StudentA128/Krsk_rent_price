import {flatAPI} from '../../api/api'
import React, {useState, useEffect} from 'react'
import './Price.css'
import {
    Link
  } from "react-router-dom";
const Price = () => {

    const [price, setPrice] = useState(0);

    useEffect(()=>{
        getPrice()
    }, [])

    let getPrice = () => {
      const timer = setTimeout(() => {
        flatAPI.getFlatInfo()
          .then(response => {
            console.log(response.data)
            setPrice(response.data[response.data.length-1].price);
          });
      }, 500);
    }

    return (
        <div className='price-wrapper'>
            <p>Прогнозируемая стоимость аренды квартиры</p>
            <p className='result-wrapper'>{price}</p>
            <p></p><Link className='submitButton' to={`/`}><p><button>На главную</button></p></Link>
        </div>
    );
}


export default Price;