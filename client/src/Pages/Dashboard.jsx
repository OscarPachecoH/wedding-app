import axios from "axios";
import { useEffect, useState } from "react";
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
                    <div className="dashboard-page">
                        <Navbar user={user} setUser={setUser} />
                        
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <h1>Bienvenido, {user.name} {user.lastName}</h1>
                                <p>Panel principal del sistema de registro civil</p>
                            </div>
                        </div>

                        <div className="starts-grid">
                            <div className="stat-card">
                                <h3>{personas.length}</h3>
                                <p>Personas registradas</p>
                            </div>
                            <div className="stat-card">
                                <h3>{personas.filter(p => p.estadoCivil === 'SOLTERO').length}</h3>
                                <p>Solteros</p>
                            </div>
                            <div className="stat-card">
                                <h3>{personas.filter(p => p.estadoCivil === 'CASADO').length}</h3>
                                <p>Casados</p>
                            </div>
                        </div>
                        
                        <div className="table-card">
                            <h2 className="text-center">Registro de Personas</h2>
                            {personas.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover aling-middle">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>CURP</th>
                                                <th>Nombre</th>
                                                <th>Apellido Paterno</th>
                                                <th>Apellido Materno</th>
                                                <th>Sexo</th>
                                                <th>Estado Civil</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {personas.map((p) => (
                                                <tr key={p.id}>
                                                    <td>{p.id}</td>
                                                    <td>{p.CURP}</td>
                                                    <td>{p.nombre}</td>
                                                    <td>{p.apellidoPaterno}</td>
                                                    <td>{p.apellidoMaterno}</td>
                                                    <td>{p.sexo}</td>
                                                    <td>{p.estadoCivil}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No existen registros aún.</p>
                            )}
                        </div>
                    </div>
            }
        </>
    )
}

export default Dashboard;