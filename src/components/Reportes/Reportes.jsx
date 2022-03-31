import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft, MdAirplanemodeActive } from 'react-icons/md';
import { BsGrid, BsClock } from 'react-icons/bs';
import { BiTargetLock } from 'react-icons/bi';
import { FiAlertCircle } from 'react-icons/fi';

const Reportes = () => {
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
            <Link to={`/Mapa`} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>Reportes</h1>
            <span className=''></span>
        </nav>
        <Link to={'/general'} className="flex gap-1 items-center text-sm text-gray-600 mt-3 p-2 border-b border-t border-b-gray-300 border-t-gray-300 bg-white">
           <BsGrid className='text-xl' /> Información General de Movimiento.
        </Link>
        <Link to={'/kilometraje'} className="flex gap-1 items-center text-sm text-gray-600 p-2 border-b  border-b-gray-300 bg-white">
           <BiTargetLock className='text-xl' /> Informe sobre Kilometraje.
        </Link>
        <Link to={'/velocidad'} className="flex gap-1 items-center text-sm text-gray-600 p-2 border-b border-b-gray-300 bg-white">
           <MdAirplanemodeActive className='text-xl' /> Detalles de Exceso de Velocidad.
        </Link>
        <Link to={'/estadia'} className="flex gap-1 items-center text-sm text-gray-600 p-2 border-b border-b-gray-300 bg-white">
           <BsClock className='text-xl' /> Detalles de Estadia.
        </Link>
        <Link to={'/alarma'} className="flex gap-1 items-center text-sm text-gray-600 mt-4 p-2 border-b border-t border-b-gray-300 border-t-gray-300 bg-white">
           <FiAlertCircle className='text-xl' /> Detalles de Alarma.
        </Link>
    </div>
  )
}

export default Reportes