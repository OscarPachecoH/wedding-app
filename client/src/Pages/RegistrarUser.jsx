import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FaBirthdayCake } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { TbGenderBigender } from "react-icons/tb";

const RegistrarUser = ({ user, setUser }) => {

    const [registroUser, setRegistroUser] = useState({
        name: '',
        lastName: '',
        username: '',
        password: '',
        role: ''
    })

    const inputChange = ({ target }) => {
        const { name, value } = target
        setRegistroUser({
            ...registroUser,
            [name]: value
        });
    }

    const registrarUser = async (e) => {
        e.preventDefault();
        if (!registroUser.name || !registroUser.lastName || !registroUser.username || !registroUser.password || !registroUser.role) {
            alert('Atención, procura llenar todos los campos...');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const { data } = await axios.post('http://localhost:9000/registrar', registroUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(data.message);

            setRegistroUser({
                name: '',
                lastName: '',
                username: '',
                password: '',
                role: ''
            });

        } catch (error) {
            alert(error.response?.data?.message || 'Error interno...')
        }

    }

    return (
        <>
            <div className="body-register">
                <Navbar user={user} setUser={setUser} />

                <div className="container">
                    <h1 className="title text-center">Registro de nuevo usuario</h1>
                    <form className="form" onSubmit={registrarUser}>
                        <div className="input-group">
                            <label htmlFor="">Nombre</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="text"
                                name="name"
                                value={registroUser.name}
                                onChange={inputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Apellido</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="text"
                                name="lastName"
                                value={registroUser.lastName}
                                onChange={inputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Nombre de usuario</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="text"
                                name="username"
                                value={registroUser.username}
                                onChange={inputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Contraseña</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <input
                                type="password"
                                name="password"
                                value={registroUser.password}
                                onChange={inputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Tipo de usuario</label>
                            <span class="icon"><HiOutlineIdentification /></span>
                            <select name="role" value={registroUser.role} onChange={inputChange}>
                                <option value=""><i>SELECCIONAR</i></option>
                                <option value="ADMIN">Administrador</option>
                                <option value="USER">Usuario (solo casar)</option>
                            </select>
                        </div>

                        
                        <button type="submit" className="btn-registrar">Registrar usuario</button>                       
                    </form>
                </div>

            </div>
        </>
    )
}

export default RegistrarUser;