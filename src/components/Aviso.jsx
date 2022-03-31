import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Aviso = () => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col">
        <nav className='w-full p-2 text-center text-white capitalize navColor flex items-center justify-between'>
            <Link to={`/Mapa`} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>Aviso</h1>
            <span className=''></span>
        </nav>
        <div className="mx-auto my-auto p-4">
            <span className="text-gray-600" ><span className="text-xl text-red-400 block">Aviso:</span> Para hacer cualquier tipo de modificación en la información de tu cuenta, por favor usar la plataforma web.</span>
        </div>
    </div>
  )
}

export default Aviso