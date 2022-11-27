import './App.scss';
import Address from './components/Address/Address'
import Map from './components/Map/Map'
import Parameters from './components/Parameters/Parameters'
import Price from './components/Price/Price'
import History from './components/History/History';
import Navbar from './components/Navbar/Navbar';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Advertisements from './components/Advertisements/Advertisements';


function App() {

  return (
    <BrowserRouter >
      <div>
      <Navbar/>
      </div>
      <div className='main-container'>
        <Routes>
          <Route path="/" element={<Address />} />
          <Route path="/parameters" element={<Parameters />} />
          <Route path="/price" element={<Price />} />
          <Route path="/history" element={<History />} />
          <Route path="/advertisements" element={<Advertisements />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
