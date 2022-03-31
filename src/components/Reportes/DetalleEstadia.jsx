import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft, MdCalendarToday, MdDirectionsCar} from 'react-icons/md';
import axios from 'axios';

import ShowData from './ShowData';
import NoData from './NoData';

const DetalleEstadia = () => {

  const [device, setDevice] = useState([])
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const ubicacion = [];
  
  const Fecha = (date) => {
    let fecha = new Date(date);
    return fecha.toISOString();
  }
  const TimeFormat = (duration) => {
    let seconds = (duration / 1000).toFixed(1);
    let minutes = (duration / (1000 * 60)).toFixed(1);
    let hours = (duration / (1000 * 60 * 60)).toFixed(1);
    let days = (duration / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Seg";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Días"
  }
  useEffect(() => {
    const obtenerDevice = async() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "*/*");

      var requestOptions = {
          method: 'GET',
          credentials: 'include',
          headers: myHeaders,
          redirect: 'follow'
      };
      
      try{
          const resulDev = await fetch("https://www.protrack.ad105.net/api/devices", requestOptions)
          const resDev = await resulDev.json()
          setDevice(resDev);
      }
      catch(err){
          toast.error('Hubo un problema, intentelo más tarde');
      }
    }
    obtenerDevice();
  }, [])

  const obtenerDatos = async(e) => {
    e.preventDefault();
    let deviceId = e.target.deviceId.value;
    let dateStart = Fecha(e.target.dateStart.value);
    let dateEnd = Fecha(e.target.dateEnd.value);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");

    var requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
      //generar url
      let url = "https://www.protrack.ad105.net/api/reports/stops?";
      let groupId;
      for(let i = 0; i < device.length; i++){
          groupId= device[i].groupId;
      }
      url = url+"deviceId="+deviceId+"&";
      url = url+"groupId="+groupId+"&type=allEvents&from="+dateStart+"&to="+dateEnd;
      console.log(url)
      const resultado2 = await fetch(`${url}`, requestOptions)
      const deviceData2 = await resultado2.json();
      

      console.log(deviceData2)
      for(let i = 0; i < deviceData2.length; i++){
          //obtener direccion
          const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${deviceData2[i].longitude},${deviceData2[i].latitude}`
          const resultado = await axios.get(url);
          //return ubicacion.ShortLabel;
          console.log(resultado.data.address.LongLabel)
          ubicacion.push({id: i, lon: deviceData2[i].longitude, lat: deviceData2[i].latitude, address: resultado.data.address.LongLabel, name: deviceData2[i].deviceName, startTime: deviceData2[i].startTime, endTime: deviceData2[i].endTime, duration: deviceData2[i].duration, type: "estadia"});
       }
     
      console.log(ubicacion)
      setData(ubicacion);
      setActive(true);
    } catch (error) {
      console.log(error)
      toast.error('Hubo un problema, intentelo más tarde');
    }

  }
  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
                
        />
        <nav className='w-full p-2 text-center text-white capitalize navColor flex items-center justify-between'>
            <Link to={`/reportes`} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>Detalles de Estadia</h1>
            <span className=''></span>
        </nav>
        {
          !active ? (
            <form onSubmit={obtenerDatos} className="m-2 border flex flex-col ">
                <div className="flex justify-between items-center p-2 border border-gray-300 bg-white">
                  <label htmlFor='deviceId' className="text-gray-500 flex gap-1 items-center "><MdDirectionsCar /> Objetivo:</label>
                  <select name="deviceId" id="deviceId" className='text-gray-500 placeholder:text-gray-500'>
                      {device.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-between items-center p-2 border border-gray-300 bg-white">
                  <label htmlFor='dateStart' className="text-gray-500 flex gap-1 items-center "><MdCalendarToday /> Tiempo de Inicio:</label>
                  <input type="date" name="dateStart" id="dateStart" className='text-gray-500 placeholder:text-gray-500'/>
                </div>
                <div className="flex justify-between items-center p-2 border border-gray-300 bg-white">
                  <label htmlFor='dateEnd' className="text-gray-500 flex gap-1 items-center "><MdCalendarToday /> Tiempo Final:</label>
                  <input type="date" name="dateEnd" id="dateEnd" className='text-gray-500 placeholder:text-gray-500'/>
                </div>
                <button 
                  type="submit"
                  className='p-2 m-3 rounded border-none text-white bgButton'
                >
                  Búsqueda
                </button>
            </form>
          )
          : Object.keys(data).length > 0 ? (
              data.map(item => (
                <ShowData key={item.id} data={item} />
                )
              ) 
            ): <NoData/>
        }
    </div>
  )
}

export default DetalleEstadia