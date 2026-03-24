import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
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

    const inputRegisterChange = ({ target }) => {
        const { name, value } = target
        setRegistro({
            ...registro,
            [name]: value
        });
    }

    const registrar = async (e) => {
        e.preventDefault();
        if (registro.CURP !== '' || registro.nombre !== '' || registro.apellidoP !== '' || registro.apellidoM !== '' || registro.edad !== '' || registro.fechaN !== '' || registro.estadoCivil !== '') {
            await axios.post('http://localhost:9000/personas/registrar', registro)
                .then(({ data }) => {
                    if (data.message === 'No se realizo el registro...') {
                        alert('No se realizo el registro')
                    } else {
                        alert('Persona registrada...');
                    }
                })
        } else {
            alert('Error... Todos los campos son obligatorios...')
        }
    }

    return (
        <>
            <div className="body-registrar">
                <Navbar user={user} setUser={setUser} />
                <div class="container">
                    <h1 class="title text-center">Registro de personas</h1>
                    <form class="form" onSubmit={registrar}>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="text"
                                id="CURP"
                                placeholder="CURP"
                                name="CURP"
                                value={registro.CURP}
                                onChange={inputRegisterChange}
                            />
                        </div>
                        <div class="input-group">
                            <span class="icon"><HiOutlineIdentification /></span>
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
                            <select name="sexo" id="sexo" value={registro.sexo} onChange={inputRegisterChange}>
                                <option value="">---Sexo---</option>
                                <option name="estadoCivil" value="Femenino">Femenino</option>
                                <option name="estadoCivil" value="Marculino">Marculino</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="icon"><FaBirthdayCake /></span>
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
                            <select name="estadoCivil" id="estadoCV" value={registro.estadoCV} onChange={inputRegisterChange}>
                                <option value="">---Estado Civil---</option>
                                <option name="estadoCivil" value="Soltero">Soltero</option>
                                <option name="estadoCivil" value="Casado">Casado</option>
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