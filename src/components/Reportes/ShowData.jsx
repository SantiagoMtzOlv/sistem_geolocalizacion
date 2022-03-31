import React from 'react'

const ShowData = ({data}) => {

    const {address, time, speed, startTime, endTime, type, serverTime, tipo} = data;
    console.log(Object.keys(data).length)
    const TimeFormat = (fecha) => {
        const fecha1 = new Date();
        const date = new Date(fecha);
        return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' '+ date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
      }
    const TimeDuration = (fecha1, fecha2) => {
        let date1 = new Date(fecha1)
        let date2 = new Date(fecha2)
        let duration = date2.getTime() - date1.getTime();
        let seconds = (duration / 1000).toFixed(1);
        let minutes = (duration / (1000 * 60)).toFixed();
        let hours = (duration / (1000 * 60 * 60)).toFixed();
        let days = (duration / (1000 * 60 * 60 * 24)).toFixed();
        if (seconds < 60) return seconds + " Seg";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Días"
      }
      const typeAlarm = (type) => {
        let alarma = '';
        switch (type) {
            case 'deviceMoving':
                    alarma = 'Dispositivo en Movimiento';
                break;
            case 'jamming':
                    alarma = 'Dispositivo con Interferencia';
                break;
            case 'deviceStopped':
                    alarma = 'Dispositivo Detenido';
                break;
            case 'deviceOffline':
                    alarma = 'Dispositivo Fuera de Línea';
                break;
            case 'deviceOnline':
                    alarma = 'Dispositivo en línea';
                break;
            case 'geofenceExit':
                    alarma = 'Dispositivo saliendo de GeoCerca';
                break;
            case 'geofenceEnter':
                    alarma = 'Dispositivo entrando a GeoCerca';
                break;
            case 'powerCut':
                    alarma = 'Bateria desconectada';
                break;
            case 'sos':
                    alarma = 'Alarma SOS';
                break;
            case 'lowBattery':
                    alarma = 'Bateria Baja';
                break;
            case 'door':
                    alarma = 'Puerta';
                break;
            case 'fuelUp':
                    alarma = 'Cargando combustible';
                break;
            case 'fuelDown':
                    alarma = 'Vaciando combustible';
                break;
            case 'ignitionOff':
                    alarma = 'Motor Apagado';
                break;
            case 'ignitionOn':
                    alarma = 'Motor Encendido';
                break;
            case 'noGps':
                    alarma = 'No se encuentra Gps';
                break;
            case 'overSpeed':
                    alarma = 'Alarma Exceso de Velocidad';
                break;
            case 'oilLeak':
                    alarma = 'Fuga de combustible';
                break;
            case 'deviceUnknown':
                alarma = 'Dispositivo Desconocido';
                break;
            case 'alarm':
                alarma = 'Alarma';

                break;
            default:
                break;
        }
        return alarma;
    }
  return (
    <div className='flex flex-col p-2 border-b border-b-gray-300 bg-gray-200'>
        <div className="flex items-center justify-between">
            {type === "velocidad" ? (
                <>
                <span className="text-sm text-gray-600">Velocidad {((speed)*1.852).toFixed()+' Km/h'}</span>
                <span className="text-sm text-gray-600">{TimeFormat(time)}</span>
                </>
            ) : null}
            {type === "estadia" ? (
                <>
                <span className="text-sm text-gray-600">{TimeDuration(startTime, endTime)}</span>
                <span className="text-xs text-gray-600">{TimeFormat(startTime)} A {TimeFormat(endTime)}</span>
                </>
            ) : null}
            {type === "alarma" ? (
                <>
                <span className="text-sm text-gray-600">{typeAlarm(tipo)}</span>
                <span className="text-sm text-gray-600">{TimeFormat(serverTime)} ({((speed)*1.852).toFixed()+' Km/h'})</span>
                </>
            ) : null}
        </div>
        <span className="text-sm text-gray-600">{address}</span>
    </div>
  )
}

export default ShowData