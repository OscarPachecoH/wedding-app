import axios from "axios";
import React, { useEffect, useState } from "react";
import Load from "../Components/Load.jsx";
import Navbar from "../Components/Navbar.jsx";
import "../Css/Dashboard.css";

const Dashboard = ({ user, setUser }) => {

    const [loading, setLoading] = useState(true);

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        getPersonas()
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const getPersonas = async () => {
        try {
            const response = await axios.get('http://localhost:9000/personas');
            setPersonas(response.data);
        } catch (error) {
            alert("Sucedio algo inesperado");
        }
    }

    return (
        <>
            {
                loading ? <Load /> :
                    <div className="body">
                        <Navbar user={user} setUser={setUser} />
                        <h1>Bienvenido {user.nombre + " " + user.apellidos}</h1>
                        <div className="tabla">
                            <table className="table table-bordered border-info">
                                <thead className="table-info">
                                    <tr>
                                        <th className="titulo-tabla" colspan="6"><h4>Registros</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>CURP</th>
                                        <th>Nombre</th>
                                        <th>Apellido Paterno</th>
                                        <th>Apellido Materno</th>
                                        <th>Estado Civil</th>
                                    </tr>
                                    {personas.length > 0 ? (
                                        personas.map((mat) => (
                                            <tr key={mat.id}>
                                                <td>{mat.id}</td>
                                                <td>{mat.CURP}</td>
                                                <td>{mat.nombre}</td>
                                                <td>{mat.apellidoP}</td>
                                                <td>{mat.apellidoM}</td>
                                                <td>{mat.estadoCivil}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Todavía no hay personas registradas</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default Dashboard;