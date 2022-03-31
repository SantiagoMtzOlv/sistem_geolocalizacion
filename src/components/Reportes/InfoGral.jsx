import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft, MdCalendarToday} from 'react-icons/md';
import DataTable from 'react-data-table-component';

import NoData from './NoData';

const InfoGral = () => {

  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  
  const Fecha = (date) => {
    let fecha = new Date(date);
    return fecha.toISOString();
  }

  const obtenerDatos = async(e) => {
    e.preventDefault();
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
    try{
      console.log("antes de consulta "+ dateStart)
      console.log("antes de consulta "+ dateEnd)
      const resultado = await fetch("https://www.protrack.ad105.net/api/devices", requestOptions)
      const deviceData = await resultado.json();
      //generar url
      let url = "https://www.protrack.ad105.net/api/reports/trips?";
      let groupId;
      for(let i = 0; i < deviceData.length; i++){
          url = url+"deviceId="+deviceData[i].id+"&";
          groupId= deviceData[i].groupId;
      }
      url = url+"groupId="+groupId+"&type=allEvents&from="+dateStart+"&to="+dateEnd;
      console.log(url)
      
      const resultado2 = await fetch(`${url}`, requestOptions)
      /* .then(response => response.json())
      .catch(error => console.log('error', error)); */
      const deviceData2 = await resultado2.json();
      setData(deviceData2)
      setActive(true);
    }
    catch(err){
      toast.error('Hubo un problema, intentelo más tarde');
  }
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
  //DataTable columns
  const columns = [
    {
        name: 'Objetivo',
        selector: 'deviceName',
        sortable: true,
    },
    {
        name: 'Kilometraje (Km)',
        sortable: true,
        cell: row => <span>{((row.averageSpeed)*1.852).toFixed()+' Km/h'}</span>
    },
    {
        name: 'Exceso de Velocidad(Tiempos)',
        sortable: true,
        cell: row => <span>{((row.maxSpeed)*1.852).toFixed()+' Km/h'}</span>
    },
    {
        name: 'Estadia(Tiempos)',
        sortable: true,
        cell: row => <span>{TimeFormat(row.duration)}</span>
    },
  ];
  //config pagination
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
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
            <h1 className='self-center'>Información General de Movimiento</h1>
            <span className=''></span>
        </nav>
        {
          !active ? (
            <form onSubmit={obtenerDatos} className="m-2 border flex flex-col ">
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
            <DataTable
                columns={columns}
                data={data}
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
          ): <NoData />
        }
    </div>
  );
}

export default InfoGral