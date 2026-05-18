import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import '../Css/Casar.css'
import axios from "axios";
import { FaExclamationTriangle, FaFemale, FaMale } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const Casar = ({ user, setUser }) => {

    const [busqueda, setBusqueda1] = useState({
        CURP1: '',
        CURP2: '',
    })

    const [pareja, setPareja] = useState([]);

    const inputBsq = ({ target }) => {
        const { name, value } = target
        setBusqueda1({
            ...busqueda,
            [name]: value
        });
    }

    const buscar = async (e) => {
        e.preventDefault();
        if (!busqueda.CURP1 || !busqueda.CURP2) {
            alert('Ambos campos son obligatorios');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`http://localhost:9000/buscarPareja/${busqueda.CURP1}/${busqueda.CURP2}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPareja(data);

            setBusqueda1({
                CURP1: '',
                CURP2: ''
            });

        } catch (error) {
            alert(
                error.response?.data?.message || 'Error en busqueda'
            );
        }

    }

    const casamiento = async () => {
        if (pareja.length !== 2) return;

        try {
            const token = localStorage.getItem('token');

            const { data } = await axios.post(`http://localhost:9000/casar/${pareja[0].id}/${pareja[1].id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(data.message);

            setPareja([]);

        } catch (error) {
            alert(error.response?.data?.message || 'Error al resgistrarmatrimonio');
        }
    }

    return (
        <div className="body-casar">
            <Navbar user={user} setUser={setUser} />

            <div className="casar-container">
                {/* Formulario de búsqueda */}
                <div className="glass-card form-box-casar">
                    <form onSubmit={buscar}>
                        <div className="heading mb-4 text-center">
                            <h1 className="title">Buscar pareja</h1>
                        </div>

                        <div className="form-input-casar">
                            <span className="input-icon">
                                <FaFemale />
                            </span>
                            <input
                                type="text"
                                placeholder="CURP esposa"
                                name="CURP1"
                                value={busqueda.CURP1}
                                onChange={inputBsq}
                            />
                        </div>

                        <div className="form-input-casar">
                            <span className="input-icon">
                                <FaMale />
                            </span>
                            <input
                                type="text"
                                placeholder="CURP esposo"
                                name="CURP2"
                                value={busqueda.CURP2}
                                onChange={inputBsq}
                            />
                        </div>

                        <div className="text-center mt-3">
                            <button className="btn-buscar" type="submit">
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Resultados */}
                <div className="result-content">
                    {pareja.length > 0 ? (
                        <>
                            <div className="pareja-container">
                                {/* Tarjeta de la esposa */}
                                {pareja
                                    .filter((p) => p.sexo === "MUJER")
                                    .map((p) => (
                                        <div key={p.id} className="person-card esposa-card">
                                            <div className="person-icon">
                                                <FaFemale />
                                            </div>

                                            <h2>Esposa</h2>

                                            <div className="person-info">
                                                <p>
                                                    <strong>CURP:</strong> {p.CURP}
                                                </p>
                                                <p>
                                                    <strong>Nombre:</strong> {p.nombre}{" "}
                                                    {p.apellidoPaterno} {p.apellidoMaterno}
                                                </p>
                                                <p>
                                                    <strong>Edad:</strong> {p.edad} años
                                                </p>
                                                <p>
                                                    <strong>Estado Civil:</strong> {p.estadoCivil}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                {/* Tarjeta del esposo */}
                                {pareja
                                    .filter((p) => p.sexo === "HOMBRE")
                                    .map((p) => (
                                        <div key={p.id} className="person-card esposo-card">
                                            <div className="person-icon">
                                                <FaMale />
                                            </div>

                                            <h2>Esposo</h2>

                                            <div className="person-info">
                                                <p>
                                                    <strong>CURP:</strong> {p.CURP}
                                                </p>
                                                <p>
                                                    <strong>Nombre:</strong> {p.nombre}{" "}
                                                    {p.apellidoPaterno} {p.apellidoMaterno}
                                                </p>
                                                <p>
                                                    <strong>Edad:</strong> {p.edad} años
                                                </p>
                                                <p>
                                                    <strong>Estado Civil:</strong> {p.estadoCivil}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Alerta si alguien ya está casado */}
                            {pareja.some((p) => p.estadoCivil === "Casado") ? (
                                <div className="casado-alert">
                                    <FaExclamationTriangle className="alert-icon" />
                                    <div>
                                        <h3>Una de las personas ya está casada</h3>
                                        {pareja
                                            .filter((p) => p.estadoCivil === "Casado")
                                            .map((p) => (
                                                <p key={p.id}>
                                                    <strong>
                                                        {p.nombre} {p.apellidoPaterno}{" "}
                                                        {p.apellidoMaterno}
                                                    </strong>{" "}
                                                    ya cuenta con un matrimonio registrado.
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                pareja.length === 2 && (
                                    <div className="text-center mt-4">
                                        <button className="btn-casar" onClick={casamiento}>
                                            <FaHeart className="me-2" />
                                            Registrar matrimonio
                                        </button>
                                    </div>
                                )
                            )}
                        </>
                    ) : (
                        <div className="empty-state">
                            <FaHeart className="empty-icon" />
                            <h3>No se ha realizado una búsqueda</h3>
                            <p>
                                Ingresa la CURP de ambas personas para verificar si pueden
                                contraer matrimonio.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Casar;