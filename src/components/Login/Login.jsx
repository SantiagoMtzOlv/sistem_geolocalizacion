import React, {useState, useEffect, useRef} from 'react'
import {
    useNavigate,
} from "react-router-dom";
/* TOAST ALERTS */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useReactPWAInstall } from "react-pwa-install";

import myLogo from './logo192.png';

const Login = () => {

    const navigate = useNavigate();
    const pwaRef = useRef();

    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });


    const handleCambio = (e) => {
        const { id, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [id]: value
        }))
    }

    const handleEnviar = (e) => {
        e.preventDefault();
        if (usuario.password == "") {
            /* iniciarSesion(); */
            alert('Por favor, introduzca la contraseña');
        }
        else if(usuario.email == "") {
            alert('Por favor ingrese la cuenta.');
        }
        else{
            handleLogin();
            //iniciarSesion();
        }
    }
    function createCookie(cookieName, cookieValue, daysToExpire){
        var date = new Date();
        date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
        document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString() + "path=/";
    }

    const redireccionar = () => {
        createCookie("passCk", usuario.password, 5);
        navigate('/Mapa')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://www.protrack.ad105.net/api/session', {credentials: 'include',method: 'POST', body: new URLSearchParams(`email=${usuario.email}&password=${usuario.password}`)});
    
        if(response.ok) {
            const user = await response.json();
            console.log(user);
            redireccionar();
        }else{
            toast.error('Usuario o Contraseña Incorrecta.');
        }
    }
    const installPWA = async(e) => {
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', async (e) => {
            deferredPrompt = e;
            if (deferredPrompt !== null) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            }
        })
    }
    const handleClick = () => {
        pwaInstall({
          title: "Install Web App",
          logo: myLogo,
          features: (
            <ul>
              <li>Rastreo Gps</li>
              <li>Adminstración de Dispositivos</li>
            </ul>
          ),
          description: "Sistema de Geolocalización. ",
        })
          .then(() => alert("App instalada correctamente."))
          .catch(() => alert("Hubo un Inconveniente. Intentelo más tarde."));
      };
  return (
    <div className="h-screen bg-gray-200 flex flex-col" ref={pwaRef}>
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
            <h1>iniciar sesión.</h1>
        </nav>
        <form
            className='flex flex-col m-5'
            onSubmit={handleLogin}
        >
            <input 
                type="text" 
                name="email" 
                id="email"
                value={usuario.email} onChange={handleCambio} tabIndex={1}
                placeholder='Cuenta'
                className='w-full bg-white border-gray-500 ring-gray-500 p-2'
            />
            <input 
                type="password" 
                id="password" 
                value={usuario.password} 
                onChange={handleCambio} tabIndex={2}
                placeholder='Contraseña'
                className='w-full mt-2 bg-white border-gray-500 ring-gray-500 p-2'
            />
            <div className="flex justify-between mt-2">
                <div className="">
                    <input 
                        type="checkbox" 
                        name="" 
                        id="remember" 
                    />
                    <label htmlFor="remember" className='pl-2'>Recordar la contraseña</label>
                </div>
                <button type='button'>Demo{">>"} </button>
            </div>
            <button 
                type="submit"
                className='w-full mt-2 navColor text-white p-2'
            >
                Iniciar Sesión
            </button>
        </form>

        {/* <div>
            {supported() && !isInstalled() && (
                <button type="button" onClick={handleClick} className="m-5 block p-4 bg-gray-400 text-gray-900 self-center bottom-0 fixed">
                Instalar en el Dispositivo
                </button>
            )}
        </div> */}
    </div>
    )
}

export default Login