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
        if (sesion.user !== '' && sesion.password !== '') {

            await axios.post('http://localhost:9000/inicio', sesion)
            .then(({ data }) => {
                if (data.user === "") {
                    alert("No hay registro con este usuario")
                } else {
                    setUser(data);
                    //alert();
                    navigate('/dashboard');
                }
            })
        } else {
            alert('Error... Los campos estan vacios');
        }
    }

    return (
        <div className="body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-mb-6 form-container">
                        <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                            <div className="logo mt-5 mb-3">
                                <img src="https://cdn-icons-png.flaticon.com/512/13367/13367664.png" width={'250px'} alt="Iglesia" />
                            </div>
                            <div className="heading mb-3">
                                <h4>Inicio de sesión</h4>
                            </div>
                            <form onSubmit={inicio}>
                                <div className="form-input">
                                    <span><FaRegUser /></span>
                                    <input
                                        type="text"
                                        id="user"
                                        placeholder="Nombre de Usuario"
                                        name="user"
                                        value={sesion.user}
                                        onChange={inputSesionChange}
                                    />
                                </div>
                                <div className="form-input">
                                    <span><FaLock /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="contraseña"
                                        name="password"
                                        placeholder="Contraseña"
                                        value={sesion.password}
                                        onChange={inputSesionChange}
                                    />
                                    <span className="password-toggle" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                        </span>
                                </div>
                                <div className="text-left">
                                    <button className="btn" type="submit">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 d-none d-md-block image-container"></div>
                </div>
            </div>
        </div>
    );
}

export default Login;