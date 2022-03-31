import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsGraphUp, BsLock } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';


const Devices = () => {

    const [user, setUser] = useState({})
    const [devices, setDevices] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUser = async() => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Accept", "*/*");

            var requestOptions = {
                method: 'GET',
                credentials: 'include',
                headers: myHeaders,
                redirect: 'follow'
            };
            try {
                const url = 'https://www.protrack.ad105.net/api/session'
                const response = await fetch(url, requestOptions);
                const results = await response.json();
                setUser(results);
            } catch (error) {
                toast.error('Hubo un problema, intentelo más tarde.')
            }
        }
        obtenerUser();
    },[])
    useEffect(() => {
        const obtenerDevices = async() => {
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
                const url = 'https://www.protrack.ad105.net/api/devices'
                const response = await fetch(url, requestOptions);
                const results = await response.json();
                setDevices(results);
            } catch (error) {
                toast.error('Hubo un problema, intentelo más tarde.')
            }
        }
        obtenerDevices()
    }, [])
    const salir = async() => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };

        fetch("https://www.protrack.ad105.net/api/session", requestOptions)
        .then((response) => {
            console.log('Estado'+response.status)
            if(response.status === 204){
                navigate('/')
            }else{
                toast.error('Ocurrió un error')
            }
        }).catch(error => console.log('error: ', error))
    }
    const handleSalir = (e) => {
        e.preventDefault();
        salir();
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
        <nav className='w-full p-2 text-center text-white capitalize navColor'>
            <h1>{user.name}</h1>
        </nav>
        <h2
            className='border-2 border-b-gray-300 mb-2 pt-1 bg-white'
        >
            <span className='pl-2'>Mis Metas</span>
        </h2>
        {
            devices.map(device => (
                <Link 
                    key={device.id} 
                    to={`/device/${device.id}`} 
                    className="block mt-2 mb-2 border-2 border-b-gray-300 pb-2"
                >
                <div className="flex justify-between items-center">
                    <div className="flex flex-col pl-2">
                        <span>{device.name}</span>
                        <p className='text-sm text-gray-500'>Imei:<span className='text-gray-600'>{''}{(device.uniqueId).replace((device.uniqueId).substr(2,11), '***********')}</span></p>
                        <p className='text-sm text-gray-500'>Estado:<span className={`${device.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>{' '}{device.status}</span></p>
                    </div>
                    <MdKeyboardArrowRight className='text-2xl text-gray-500 mr-4'/>
                </div>
                </Link>
            ))
        }
        <div className="flex flex-col mt-2 bg-white justify-center">
            <Link to={'/reportes'} className="flex items-center border-b-2 border-b-gray-300 pb-3 pt-3 bg-white">
                <BsGraphUp className='ml-2' /><span className='p-2'> Reportes</span>
            </Link>
            <Link to={'/message'} className="flex items-center  border-b-2 border-b-gray-300 pb-3 pt-3 bg-white">
                <BsLock className='ml-2' /><span className="p-2"> Modificar Contraseña</span>
            </Link>
            <Link to={'/message'} className="flex items-center border-b-2 border-b-gray-300 pb-3 pt-3 bg-white">
                <AiOutlineUser className='ml-2' /><span className="p-2"> Gestionar Cuenta</span>
            </Link>
        </div>
        <button 
            type='button' 
            onClick={handleSalir}
            className=" w-full m-4 border-gray-400 border-2 p-2 colorButton self-center"
        >
            Salir
        </button>
    </div>
  )
}

export default Devices