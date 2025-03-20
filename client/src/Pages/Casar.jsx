import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import '../Css/Casar.css'
import axios from "axios";
import { FaFemale, FaMale  } from "react-icons/fa";

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
        try {
            if (busqueda.CURP1 !== '' || busqueda.CURP2 !== '') {
                const response = await axios.get('http://localhost:9000/buscarPareja/' + busqueda.CURP1 + '/' + busqueda.CURP2);
                
                setBusqueda1({...busqueda, CURP1:'',CURP2:''})
                console.log(response.data);

                if (response.data.length !== 2) {
                    setPareja(response.data)
                    alert("Error detectado... Vefirique que los datos sean correctos...");
                } else {
                    setPareja(response.data);
                    alert("Busqueda realizada...");
                }

            } else {
                alert('Ambos campos son oblogatorios...');
            }
        } catch (error) {
            alert('Error... Busqueda')
        }
    }

    const casamiento = async () => {
        try {
            if (pareja.length === 2) {
                if (pareja[0].sexo === "Masculino") {
                    await axios.post('http://localhost:9000/casar/' + pareja[0].id + '/' + pareja[1].id)
                        .then(({ data }) => {
                            if (data.message === 'Peticion realizada...') {
                                alert('Se realizo el registro')
                            } else {
                                alert('Hubo un error...');
                            }
                        })
                } else {
                    await axios.post('http://localhost:9000/casar/' + pareja[1].id + '/' + pareja[0].id)
                        .then(({ data }) => {
                            if (data.message === 'Peticion realizada...') {
                                alert('Se realizo el registro')
                            } else {
                                alert('Hubo un error...');
                            }
                        })
                }
            }
        } catch (error) {
            alert('Error...')
        }
    }

    return (
        <>
            <div className="body-casar">
                <Navbar user={user} setUser={setUser} />
                <div className="col-lg-12 col-md-50 form-box-casar text-center">
                    <form onSubmit={buscar}>
                        <div className="heading mb-3">
                            <h1>Buscar pareja</h1>
                        </div>
                        <div className="form-input-casar">
                            <span><FaFemale /></span>
                            <input
                                type="text"
                                id="CURP"
                                placeholder="CURP esposa"
                                name="CURP1"
                                value={busqueda.CURP1}
                                onChange={inputBsq}
                            />
                            <span><FaMale /></span>
                            <input
                                type="text"
                                id="CURP"
                                placeholder="CURP esposo"
                                name="CURP2"
                                value={busqueda.CURP2}
                                onChange={inputBsq}
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn-buscar" type="submit">Buscar</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-12 col-md-12 result-content text-center">
                    {pareja.length > 0 ? (
                        <>
                            {/* Contenedor padre para esposa y esposo */}
                            <div className="pareja-container">
                                {/* Div para la persona femenina */}
                                {pareja.filter(p => p.sexo === "Femenino").map((p) => (
                                    <div key={p.id} className="container-esposa">
                                        <h2>Esposa</h2>
                                        <h4><strong>CURP:</strong> {p.CURP}</h4>
                                        <h4><strong>Nombre:</strong> {p.nombre} {p.apellidoP} {p.apellidoM}</h4>
                                    </div>
                                ))}

                                {/* Div para la otra persona */}
                                {pareja.filter(p => p.sexo !== "Femenino").map((p) => (
                                    <div key={p.id} className="container-esposo">
                                        <h2>Esposo</h2>
                                        <h4><strong>CURP:</strong> {p.CURP}</h4>
                                        <h4><strong>Nombre:</strong> {p.nombre} {p.apellidoP} {p.apellidoM}</h4>
                                    </div>
                                ))}
                            </div>

                            {/* Div si hay una persona casada */}
                            {pareja.some(p => p.estadoCivil === "Casado") ? (
                                <div className="casado">
                                    <h2>Persona Casada</h2>
                                    {pareja.filter(p => p.estadoCivil === "Casado").map((p) => (
                                        <p key={p.id}><strong>{p.nombre} {p.apellidoP} {p.apellidoM}</strong> está casado(a).</p>
                                    ))}
                                </div>
                            ) : (
                                // Solo se muestra el botón si nadie está casado
                                pareja.length === 2 && <button className="btn-casar" onClick={casamiento}>Casar</button>
                            )}
                        </>
                    ) : (
                        <h1>No se ha realizado una búsqueda</h1>
                    )}
                </div>
            </div>
        </>
    )
}

export default Casar;