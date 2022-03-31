import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactPWAInstallProvider from "react-pwa-install";

import Login from './components/Login/Login';
import Devices from './components/Mapa/Devices';
import Device from './components/Mapa/Device';
import InfoDevice from './components/Mapa/InfoDevice';
import TrackDevice from './components/Mapa/TrackDevice';
import Reportes from './components/Reportes/Reportes';
import InfoGral from './components/Reportes/InfoGral';
import InfoKilo from './components/Reportes/InfoKilo';
import DetalleVel from './components/Reportes/DetalleVel';
import DetalleEstadia from './components/Reportes/DetalleEstadia';
import DetalleAlarma from './components/Reportes/DetalleAlarma';
import Aviso from './components/Aviso';

function App() {


  return (
      <ReactPWAInstallProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Mapa' element={<Devices />} />
            <Route path='/device/:id' element={<Device />} />
            <Route path='/info/:id' element={<InfoDevice />} />
            <Route path='/track/:id' element={<TrackDevice />} />
            <Route path='/reportes' element={<Reportes />} />
            <Route path='/general' element={<InfoGral />} />
            <Route path='/kilometraje' element={<InfoKilo />} />
            <Route path='/velocidad' element={<DetalleVel />} />
            <Route path='/estadia' element={<DetalleEstadia />} />
            <Route path='/alarma' element={<DetalleAlarma />} />
            <Route path='/message' element={<Aviso />} />
          </Routes>
        </BrowserRouter>
      </ReactPWAInstallProvider>
  )
}

export default App