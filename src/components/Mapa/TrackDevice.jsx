import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import {MapContainer, Marker, Popup, TileLayer, ZoomControl, LayersControl, useMap, useMapEvents, Circle, FeatureGroup, Tooltip} from 'react-leaflet';
import  L from 'leaflet';
import "leaflet-rotatedmarker";
import { toast, ToastContainer } from 'react-toastify'
import { MdKeyboardArrowLeft } from 'react-icons/md';

import * as icmap from './Marcadores/MapIcon';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './PopUp.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const TrackDevice = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [device, setDevice] = useState({})
    const [position, setPosition] = useState([])
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0)

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

    useEffect(() => {
      const obtenerPosicion = async() =>{
        const url = `https://www.protrack.ad105.net/api/positions?deviceId=${id}`
        var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Accept", "application/json");
  
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
          const response = await fetch(url, requestOptions);
          const results = await response.json();
          setPosition(results);
          //Guardar latitud y longitud
        } catch (error) {
          toast.error('Hubo un problema, intentelo más tarde.')
        }
      }
      obtenerPosicion();
      const interval= setTimeout(() => {
        obtenerPosicion();
      }, 10000);
      return () => clearInterval(interval);
    }, [])



    const Fecha = (fecha) => {
      const fecha1 = new Date();
      const date = new Date(fecha);
      if (fecha1.getDate() === date.getDate()) {
          return date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
      }
      return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
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
            <Link to={`/device/${id}`} ><MdKeyboardArrowLeft className='text-2xl' /></Link>
            <h1 className='self-center'>{device.name}</h1>
            <span className=''></span>
        </nav>
        <MapContainer center={[19.432680, -99.134209]} zoom={5} zoomControl={false} minZoom={0} maxZoom={21} scrollWheelZoom={true} className="h-screen">
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer checked name="Google">
              <TileLayer
              url="http://www.google.cn/maps/vt?lyrs=m@189,traffic&gl=cn&x={x}&y={y}&z={z}"
              attribution="Datos del mapa &copy; 2020 INEGI México"/>
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked={window.valorCapaGh} name="Híbrido">
              <TileLayer
              url="http://www.google.com/maps/vt?lyrs=s@189,traffic&gl=cn&x={x}&y={y}&z={z}"
              attribution="Datos del mapa &copy; 2020 INEGI México"/>
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked={window.valorCapaGt} name="Terreno">
              <TileLayer
              url="http://www.google.cn/maps/vt?lyrs=p@189,traffic&gl=cn&x={x}&y={y}&z={z}"
              attribution="Datos del mapa &copy; 2020 INEGI México"/>
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked={window.valorCapaOsm} name="Open Street Maps">
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribuidores'/>
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked={window.valorCapaOsmBn} name="Open Street Maps Blanco y Negro">
              <TileLayer
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribuidores'/>
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked={window.valorCapaBing}  name="Bing">
              <TileLayer
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribuidores'/>
              </LayersControl.BaseLayer>
          </LayersControl>
          {
            position.map(item => (
              <Marker key={item.id} position={[item.latitude, item.longitude]} icon={ device.status === 'online' ? icmap.gray_24 : icmap.white_21 } rotationAngle={item.course}>
                <Popup style={{ color: "#e4e4e4" }}>
                  <div className="flex flex-col pt-2 pb-2">
                      <span className="text-gray-600 font-bold uppercase text-xs">{device.name}</span>
                      <span className="text-gray-700 text-xs">Estado: <span className="text-gray-500 text-xs">{device.status === "online" ? 'Estatico ' : 'Fuera de Linea '}</span></span>
                      <span className="text-gray-700 text-xs">Velocidad <span className="text-gray-500 text-xs">{((item.speed)*1.852).toFixed(2)+' Km/h'}</span></span>
                      <span className="text-gray-700 text-xs">Motor: <span className="text-gray-500 text-xs">{item.attributes.ignition === true ? 'Encendido ' : 'Apagado '}({Fecha(item.fixTime)})</span></span>
                      <span className="text-gray-700 text-xs">Coordinar: <span className='text-gray-500 text-xs'>{item.latitude},{item.longitude}</span></span>
                  </div>
                </Popup>
                <Tooltip permanent direction="right">{device.name}</Tooltip>
              </Marker>
            ))
          }
        </MapContainer>
    </div>
  )
}

export default TrackDevice