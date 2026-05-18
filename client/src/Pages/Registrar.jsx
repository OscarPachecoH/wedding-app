import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import generarCURP from "../Helpers/GenerarCURP.jsx";
import "../Css/Registrar.css";
import axios from "axios";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaBirthdayCake } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { TbGenderBigender } from "react-icons/tb";

const Registrar = ({ user, setUser }) => {

    const [registro, setRegistro] = useState({
        CURP: '',
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        edad: '',
        sexo: '',
        fechaN: '',
        estadoCivil: ''
    })

    useEffect(() => {
        const curpGenerada = generarCURP(
            registro.nombre,
            registro.apellidoP,
            registro.apellidoM,
            registro.fechaN
        );

        setRegistro(prev => ({
            ...prev,
            CURP: curpGenerada
        }))

    },
        [registro.nombre, registro.apellidoP, registro.apellidoM, registro.fechaN]
    );

    const inputRegisterChange = ({ target }) => {
        const { name, value } = target
        setRegistro({
            ...registro,
            [name]: value
        });
    }

    const registrar = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (registro.CURP === '' && registro.nombre === '' && registro.apellidoP === '' && registro.apellidoM === '' && registro.edad === '' && registro.fechaN === '' && registro.estadoCivil === '') {
            alert('Asegurate de llenar todos los campos');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:9000/personas/registrar', registro,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(data.message);

            setRegistro({
                CURP: '',
                nombre: '',
                apellidoP: '',
                apellidoM: '',
                edad: '',
                sexo: '',
                fechaN: '',
                estadoCivil: ''
            })

        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || 'Error interno del servidor');
        }

    }

    return (
        <>
            <div className="body-register">
                <Navbar user={user} setUser={setUser} />
                <div class="container">
                    <h1 class="title text-center">Registro de personas</h1>
                    <form class="form" onSubmit={registrar}>
                        <div class="input-group">
                            <label htmlFor="">CURP *Generada de forma ficticia</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="text"
                                id="CURP"
                                placeholder="CURP"
                                name="CURP"
                                value={registro.CURP}
                                readOnly
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
                            <label htmlFor="">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Nombre"
                                name="nombre"
                                value={registro.nombre}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
                            <label htmlFor="">Apellido Paterno</label>
                            <input
                                type="text"
                                id="apellidoP"
                                placeholder="Apellido Paterno"
                                name="apellidoP"
                                value={registro.apellidoP}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
                            <label htmlFor="">Apellido Materno</label>
                            <input
                                type="text"
                                id="apellidoM"
                                placeholder="Apellido Materno"
                                name="apellidoM"
                                value={registro.apellidoM}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
                            <label htmlFor="">Edad</label>
                            <input
                                type="number"
                                id="edad"
                                placeholder="Edad"
                                name="edad"
                                min={18}
                                max={99}
                                value={registro.edad}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><TbGenderBigender /></span>
                            <label htmlFor="">Sexo</label>
                            <select name="sexo" id="sexo" value={registro.sexo} onChange={inputRegisterChange}>
                                <option value="">---Sexo---</option>
                                <option name="estadoCivil" value="MUJER">MUJER</option>
                                <option name="estadoCivil" value="HOMBRE">HOMBRE</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="icon"><FaBirthdayCake /></span>
                            <label htmlFor="">Fecha de nacimiento</label>
                            <input
                                type="date"
                                id="fechaN"
                                placeholder="Fecha de nacimiento"
                                name="fechaN"
                                value={registro.fechaN}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><GiBigDiamondRing /></span>
                            <label htmlFor="">Estado Civil</label>
                            <select name="estadoCivil" id="estadoCV" value={registro.estadoCivil} onChange={inputRegisterChange}>
                                <option value="">---Estado Civil---</option>
                                <option name="estadoCivil" value="SOLTERO">SOLTERO</option>
                                <option name="estadoCivil" value="CASADO">CASADO</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-registrar">Registrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registrar;