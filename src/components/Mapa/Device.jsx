import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { BiNote, BiMap } from 'react-icons/bi';

const Device = () => {

  const {id} = useParams();
  const [device, setDevice] = useState({})

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
      } catch (error) {
        toast.error('Hubo un problema, intentelo más tarde.')
      }
    }
    obtenerDevice();
  },[])

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
            <Link to={'/Mapa'} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>{device.name}</h1>
            <span className=''></span>
        </nav>
        <div className="flex flex-col mt-2 bg-white justify-center">
            <Link to={`/info/${id}`} className="flex items-center border-b-2 border-b-gray-300 pb-3 pt-3 bg-white">
                <BiNote className='ml-2' /><span className='p-2'>Información del dispositivo </span>
            </Link>
            <Link to={`/track/${id}`} className="flex items-center  border-b-2 border-b-gray-300 pb-3 pt-3 bg-white">
                <BiMap className='ml-2' /><span className="p-2"> Rastreo</span>
            </Link>
        </div>
    </div>
  )
}

export default Device