import React from "react";
import { Link } from "react-router-dom";
import { FaRightFromBracket, FaHouse } from "react-icons/fa6";
import '../Css/Navbar.css';

const Navbar = ({ user, setUser }) => {

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/dashboard"}><h5><span><FaHouse /> Wedding App</span></h5></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/registrar'}>Registro Civil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/casar'}>Casar</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle user-name" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name} {user.lastName}
                                </a>
                                <ul className="dropdown-menu">
                                    {user.role === 'ADMIN' && (
                                        <>
                                            <li><Link className="dropdown-item" to={'/registrar_usuario'}>Registrar personal</Link></li>
                                        </>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={logout}><span><FaRightFromBracket /> Cerrar sesión</span></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div >
            </nav >
        </div>
    );
}

export default Navbar;