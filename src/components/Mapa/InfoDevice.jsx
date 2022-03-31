import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft } from 'react-icons/md';


const InfoDevice = () => {

  const {id} = useParams();
  const [device, setDevice] = useState({})
  const [deviceAtrib, setDeviceAtrib] = useState({})

  useEffect(() => {
    const obtenerDevice = async() => {
      const url = `https://www.protrack.ad105.net/api/devices/${id}`
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
        const response = await fetch(url, requestOptions);
        const results = await response.json();
        setDevice(results);
        setDeviceAtrib(results.attributes)
      } catch (error) {
        toast.error('Hubo un problema, intentelo más tarde.')
      }
    }
    obtenerDevice();
  }, [])

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
            <Link to={`/device/${id}`} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>{device.name}</h1>
            <span className=''></span>
        </nav>
        <div className="m-2 border-2 border-gray-400 flex flex-col bg-white">
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Objetivo:</span>
              <span className="text-gray-700">{device.name}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">IMEI:</span>
              <span className="text-gray-700">{device.uniqueId}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Número de Placas:</span>
              <span className="text-gray-700">{device.placas}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Exceso de Velocidad:</span>
              <span className="text-gray-700">{device.speed}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Tipo:</span>
              <span className="text-gray-700">{device.model}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Sim Card:</span>
              <span className="text-gray-700">{device.simcard}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b-2 border-b-gray-400">
              <span className="text-gray-500 ">Icono:</span>
              <span className="text-gray-700">{device.icono}</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500 ">Observación:</span>
              <span className="text-gray-700">{deviceAtrib.observation}</span>
            </div>
        </div>

    </div>
  )
}

export default InfoDevice