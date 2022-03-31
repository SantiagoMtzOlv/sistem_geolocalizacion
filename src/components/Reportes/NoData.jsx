import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NoData = () => {
  return (
    <div className="mx-auto my-auto p-4">
        <span className="text-gray-600" ><span className="text-xl text-red-400 block">Aviso:</span> No se encontró información relacionada a las fechas establecidas</span>
    </div>
  )
}

export default NoData