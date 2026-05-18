import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Login.css'
import { FaRegUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";

const Login = ({ setUser }) => {

    const navigate = useNavigate();

    const [sesion, setSesion] = useState({
        user: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const inputSesionChange = ({ target }) => {
        const { name, value } = target
        setSesion({
            ...sesion,
            [name]: value
        });
    }

    const inicio = async (e) => {
        e.preventDefault();

        if(!sesion.user || !sesion.password){
            alert('Error... Los campos están vacios');
            return
        }

        try {
            const { data } = await axios.post('http://localhost:9000/inicio', sesion);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);

            navigate('/dashboard')
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Error al iniciar sesión...'
            )
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/13367/13367664.png" alt="logi" />
                    <h1>Wedding App</h1>
                </div>

                <form className="login-form" onSubmit={inicio}>
                    <div>
                        <label htmlFor="">Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            name="user"
                            value={sesion.user}
                            onChange={inputSesionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            name="password"
                            value={sesion.password}
                            onChange={inputSesionChange}
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="login-footer">
                    Contacta al administrador si no tienes acceso
                </div>
            </div>
        </div>
    );
}

export default Login;